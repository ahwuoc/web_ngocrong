import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
  }

  await query(
    'UPDATE account SET active = 1 WHERE id = ?',
    [session.userId],
    session.serverId ?? 1
  );

  return NextResponse.json({ success: true, message: 'Kích hoạt tài khoản thành công!' });
}
