import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
  }

  const body = await req.json();
  const { new_password } = body;

  if (!new_password) {
    return NextResponse.json({ error: 'Vui lòng nhập mật khẩu mới.' }, { status: 400 });
  }

  await query(
    'UPDATE account SET password = ? WHERE id = ?',
    [new_password, session.userId],
    session.serverId ?? 1
  );

  return NextResponse.json({ success: true, message: 'Đổi mật khẩu thành công!' });
}
