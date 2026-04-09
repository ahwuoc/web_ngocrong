import { query } from '@/lib/db';
import { getSetting } from '@/lib/settings';
import { getSession } from '@/lib/session';
import { getPowerFromDatapoint, getTaskIdFromDataTask } from '@/lib/utils';
import BangXepHangClient from './BangXepHangClient';
import Link from 'next/link';

interface TopNapEntry { player_name: string; danap: number }
interface TopPowerEntry { player_name: string; data_point: string | null }
interface TopTaskEntry { player_name: string; data_task: string | null }
interface TaskTemplate { id: number; name: string }

export default async function BangXepHangPage({
  searchParams,
}: {
  searchParams: Promise<{ server?: string }>;
}) {
  const params = await searchParams;
  const session = await getSession();
  const serverId = params.server ? Number(params.server) : (session.serverId ?? 1);

  const [topNapRaw, topPowerRaw, topTaskRaw] = await Promise.all([
    query<TopNapEntry>(
      `SELECT p.name as player_name, COALESCE(a.danap, 0) as danap
       FROM account a JOIN player p ON a.id = p.account_id
       WHERE a.active = 1 ORDER BY a.danap DESC, a.cash DESC LIMIT 10`,
      [], serverId
    ),
    query<TopPowerEntry>(
      `SELECT p.name as player_name, p.data_point
       FROM account a JOIN player p ON a.id = p.account_id
       WHERE a.active = 1 AND p.data_point IS NOT NULL AND p.data_point != ''
       ORDER BY CAST(JSON_EXTRACT(p.data_point, '$[1]') AS UNSIGNED) DESC LIMIT 10`,
      [], serverId
    ),
    query<TopTaskEntry>(
      `SELECT p.name as player_name, p.data_task
       FROM account a JOIN player p ON a.id = p.account_id
       WHERE a.active = 1 AND p.data_task IS NOT NULL AND p.data_task != ''
       ORDER BY CAST(JSON_EXTRACT(p.data_task, '$[0]') AS UNSIGNED) DESC LIMIT 10`,
      [], serverId
    ),
  ]);

  // Resolve task names
  const taskIds = topTaskRaw.map((p) => getTaskIdFromDataTask(p.data_task)).filter(Boolean);
  let taskMap: Record<number, string> = {};
  if (taskIds.length > 0) {
    const placeholders = taskIds.map(() => '?').join(',');
    const tasks = await query<TaskTemplate>(
      `SELECT id, name FROM task_main_template WHERE id IN (${placeholders})`,
      taskIds, serverId
    );
    taskMap = Object.fromEntries(tasks.map((t) => [t.id, t.name]));
  }

  const topNap = topNapRaw.map((e) => ({ player_name: e.player_name, value: Number(e.danap).toLocaleString('vi-VN') + ' VND' }));
  const topPower = topPowerRaw.map((e) => ({ player_name: e.player_name, value: getPowerFromDatapoint(e.data_point).toLocaleString('vi-VN') }));
  const topTask = topTaskRaw.map((e) => {
    const id = getTaskIdFromDataTask(e.data_task);
    return { player_name: e.player_name, value: taskMap[id] ?? `Nhiệm vụ #${id}` };
  });

  const siteName = await getSetting('site_name');

  return (
    <div className="auth-page-wrapper">
      <div className="container">
        <BangXepHangClient
          serverId={serverId}
          siteName={siteName}
          topNap={topNap}
          topPower={topPower}
          topTask={topTask}
        />
      </div>
    </div>
  );
}
