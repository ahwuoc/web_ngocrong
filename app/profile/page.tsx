import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { queryOne } from '@/lib/db';
import { Account, Player } from '@/lib/types';
import { getPowerFromDatapoint, getTaskIdFromDataTask, getPlanetName } from '@/lib/utils';
import ProfileClient from './ProfileClient';

interface TaskTemplate {
  name: string;
}

interface HeadAvatar {
  avatar_id: string;
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session.userId) redirect('/login');

  const serverId = session.serverId ?? 1;

  const user = await queryOne<Account>('SELECT * FROM account WHERE id = ?', [session.userId], serverId);
  if (!user) redirect('/login');

  const player = await queryOne<Player>('SELECT * FROM player WHERE account_id = ? LIMIT 1', [user.id], serverId);

  let avatarPath = '/assets/frontend/home/v1/images/bannergame.png';
  if (player?.head) {
    const headAvatar = await queryOne<HeadAvatar>(
      'SELECT avatar_id FROM head_avatar WHERE head_id = ? LIMIT 1',
      [player.head],
      serverId
    );
    if (headAvatar?.avatar_id) {
      avatarPath = `/assets/frontend/home/v1/images/x1/${headAvatar.avatar_id}.png`;
    }
  }

  let taskName = 'Chưa có nhiệm vụ';
  if (player?.data_task) {
    const taskId = getTaskIdFromDataTask(player.data_task);
    if (taskId) {
      const task = await queryOne<TaskTemplate>(
        'SELECT name FROM task_main_template WHERE id = ? LIMIT 1',
        [taskId],
        serverId
      );
      taskName = task?.name ?? `Nhiệm vụ #${taskId}`;
    }
  }

  const power = player ? getPowerFromDatapoint(player.data_point) : 0;
  const planet = player ? getPlanetName(player.gender) : '';

  return (
    <ProfileClient
      user={{ id: user.id, username: user.username, email: user.email, danap: user.danap, active: user.active }}
      player={player ? { name: player.name } : null}
      avatarPath={avatarPath}
      power={power}
      taskName={taskName}
      planet={planet}
    />
  );
}
