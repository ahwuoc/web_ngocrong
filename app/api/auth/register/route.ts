import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import { Account } from '@/lib/types';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, email, password, confirm, server_id = 1 } = body;

  if (!username || !email || !password || !confirm) {
    return NextResponse.json({ error: 'Vui lòng nhập đầy đủ thông tin.' }, { status: 400 });
  }
  if (password !== confirm) {
    return NextResponse.json({ error: 'Mật khẩu xác nhận không khớp.' }, { status: 400 });
  }

  const serverId = Number(server_id);
  const existing = await queryOne<Account>(
    'SELECT id FROM account WHERE username = ? OR email = ?',
    [username, email],
    serverId
  );

  if (existing) {
    return NextResponse.json(
      { error: `Tài khoản hoặc email đã tồn tại tại Server ${serverId}` },
      { status: 409 }
    );
  }

  await query(
    'INSERT INTO account (username, email, password, create_time, is_admin, ban, active) VALUES (?, ?, ?, NOW(), 0, 0, 1)',
    [username, email, password],
    serverId
  );

  return NextResponse.json({ success: true, message: `Đăng ký thành công tại Server ${serverId}!` });
}
