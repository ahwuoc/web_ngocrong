import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { Account } from '@/lib/types';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, server_id = 1 } = body;

  if (!username || !password) {
    return NextResponse.json({ error: 'Vui lòng nhập đầy đủ thông tin.' }, { status: 400 });
  }

  const serverId = Number(server_id);
  const user = await queryOne<Account>(
    'SELECT * FROM account WHERE (username = ? OR email = ?) LIMIT 1',
    [username, username],
    serverId
  );

  if (!user || user.password !== password) {
    return NextResponse.json(
      { error: `Sai tài khoản hoặc mật khẩu tại Server ${serverId}` },
      { status: 401 }
    );
  }

  const session = await getSession();
  session.userId = user.id;
  session.serverId = serverId;
  await session.save();

  return NextResponse.json({ success: true });
}
