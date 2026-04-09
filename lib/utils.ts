export function formatDate(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

export function formatDatetime(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function getPowerFromDatapoint(datapoint: string | null): number {
  if (!datapoint) return 0;
  try {
    const data = JSON.parse(datapoint);
    if (Array.isArray(data) && data.length > 1) return Number(data[1]);
  } catch {}
  return 0;
}

export function getTaskIdFromDataTask(dataTask: string | null): number {
  if (!dataTask) return 0;
  try {
    const data = JSON.parse(dataTask);
    if (Array.isArray(data) && data.length > 0) return Number(data[0]);
  } catch {}
  return 0;
}

export function getPlanetName(gender: number): string {
  if (gender === 1) return 'Namec';
  if (gender === 2) return 'Xayda';
  return 'Trái Đất';
}

export function getPlayerAvatarPath(avatarId: string | null): string {
  if (!avatarId) return '/assets/frontend/home/v1/images/bannergame.png';
  return `/assets/frontend/home/v1/images/x1/${avatarId}.png`;
}
