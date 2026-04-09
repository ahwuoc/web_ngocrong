import { query, queryOne } from '@/lib/db';
import { getSetting } from '@/lib/settings';
import { getSession } from '@/lib/session';
import { Giftcode, GiftcodeItem } from '@/lib/types';
import GiftcodeClient from './GiftcodeClient';
import Link from 'next/link';

interface ItemTemplate { name: string; description: string; icon_id: string }

async function parseGiftcodeDetail(detail: string | null, serverId: number): Promise<GiftcodeItem[]> {
  if (!detail) return [];
  try {
    const data = JSON.parse(detail);
    if (!Array.isArray(data)) return [];
    return await Promise.all(
      data.filter((item) => item.temp_id && item.quantity).map(async (item) => {
        const info = await queryOne<ItemTemplate>(
          'SELECT name, description, icon_id FROM item_template WHERE id = ? LIMIT 1',
          [item.temp_id], serverId
        );
        return {
          temp_id: item.temp_id,
          name: info?.name ?? `Item #${item.temp_id}`,
          description: info?.description ?? '',
          icon_id: info?.icon_id ?? '',
          quantity: item.quantity,
        };
      })
    );
  } catch {
    return [];
  }
}

export default async function GiftcodePage() {
  const session = await getSession();
  const serverId = session.serverId ?? 1;

  const giftcodes = await query<Giftcode>(
    "SELECT code, count_left, detail, expired, datecreate FROM giftcode WHERE count_left > 0 AND expired > NOW() ORDER BY datecreate DESC",
    [], serverId
  );

  const giftcodesWithItems = await Promise.all(
    giftcodes.map(async (gc) => ({
      ...gc,
      items: await parseGiftcodeDetail(gc.detail, serverId),
    }))
  );

  const siteName = await getSetting('site_name');

  return (
    <div className="main-content">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Trang chủ</Link> &gt; <span>Giftcode</span>
        </div>
        <GiftcodeClient giftcodes={giftcodesWithItems} siteName={siteName} />
      </div>
    </div>
  );
}
