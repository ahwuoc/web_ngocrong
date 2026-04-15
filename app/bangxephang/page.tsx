import { query } from '@/lib/db';
import { getSetting } from '@/lib/settings';
import { getSession } from '@/lib/session';
import { getPowerFromDatapoint, getTaskIdFromDataTask } from '@/lib/utils';
import BangXepHangClient from './BangXepHangClient';

interface TopNapEntry {
  player_name: string;
  danap: number;
  avatar_id: string | null;
}
interface TopPowerEntry {
  player_name: string;
  data_point: string | null;
  avatar_id: string | null;
}
interface TopTaskEntry {
  player_name: string;
  data_task: string | null;
  avatar_id: string | null;
}
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
      `SELECT p.name as player_name, COALESCE(a.danap, 0) as danap, ha.avatar_id
       FROM account a 
       JOIN player p ON a.id = p.account_id
       LEFT JOIN head_avatar ha ON p.head = ha.head_id
       WHERE a.active = 1 ORDER BY a.danap DESC, a.cash DESC LIMIT 10`,
      [], serverId
    ),
    query<TopPowerEntry>(
      `SELECT p.name as player_name, p.data_point, ha.avatar_id
       FROM account a 
       JOIN player p ON a.id = p.account_id
       LEFT JOIN head_avatar ha ON p.head = ha.head_id
       WHERE a.active = 1 AND p.data_point IS NOT NULL AND p.data_point != ''
       ORDER BY CAST(JSON_EXTRACT(p.data_point, '$[1]') AS UNSIGNED) DESC LIMIT 10`,
      [], serverId
    ),
    query<TopTaskEntry>(
      `SELECT p.name as player_name, p.data_task, ha.avatar_id
       FROM account a 
       JOIN player p ON a.id = p.account_id
       LEFT JOIN head_avatar ha ON p.head = ha.head_id
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

  const getAvatarPath = (id: string | null) =>
    id ? `/assets/frontend/home/v1/images/x1/${id}.png` : '/assets/frontend/home/v1/images/bannergame.png';

  const topNap = topNapRaw.map((e) => ({
    player_name: e.player_name,
    value: Number(e.danap).toLocaleString('vi-VN') + ' VND',
    avatar: getAvatarPath(e.avatar_id)
  }));

  const topPower = topPowerRaw.map((e) => ({
    player_name: e.player_name,
    value: getPowerFromDatapoint(e.data_point).toLocaleString('vi-VN'),
    avatar: getAvatarPath(e.avatar_id)
  }));

  const topTask = topTaskRaw.map((e) => {
    const id = getTaskIdFromDataTask(e.data_task);
    return {
      player_name: e.player_name,
      value: taskMap[id] ?? `Nhiệm vụ #${id}`,
      avatar: getAvatarPath(e.avatar_id)
    };
  });

  const siteName = await getSetting('site_name');

  return (
    <div id="leaderboard-page-premium" className="min-h-screen flex flex-col items-center relative overflow-hidden bg-black pt-[140px] pb-20 px-4">
      <style dangerouslySetInnerHTML={{
        __html: `
        #leaderboard-page-premium {
          background: url('/_next/static/media/login_bg_dragon_ball_1776236498991.png') center/cover no-repeat fixed !important;
          padding-top: 180px !important;
        }
        #leaderboard-page-premium::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: rgba(0, 0, 0, 0.65) !important;
          z-index: 1 !important;
        }
      `}} />

      <div className="relative z-10 w-full max-w-5xl">
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
