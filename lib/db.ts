import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  charset: process.env.DB_CHARSET || 'utf8',
};

const globalForDb = global as unknown as {
  pool1: mysql.Pool | undefined;
  pool2: mysql.Pool | undefined;
};

export function getPool(serverId: number = 1): mysql.Pool {
  if (serverId === 2) {
    if (!globalForDb.pool2) {
      globalForDb.pool2 = mysql.createPool({
        ...dbConfig,
        database: process.env.DB_NAME_SV2 || 'nro_v2',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }
    return globalForDb.pool2;
  }
  if (!globalForDb.pool1) {
    globalForDb.pool1 = mysql.createPool({
      ...dbConfig,
      database: process.env.DB_NAME_SV1 || 'nro_v1',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return globalForDb.pool1;
}

export async function query<T = unknown>(
  sql: string,
  params: any[] = [],
  serverId: number = 1
): Promise<T[]> {
  const pool = getPool(serverId);
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

export async function queryOne<T = unknown>(
  sql: string,
  params: any[] = [],
  serverId: number = 1
): Promise<T | null> {
  const rows = await query<T>(sql, params, serverId);
  return rows[0] ?? null;
}
