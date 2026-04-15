import mysql from 'mysql2/promise';

const globalForDb = global as unknown as {
  pool1: mysql.Pool | undefined;
  pool2: mysql.Pool | undefined;
};

export function getPool(serverId: number = 1): mysql.Pool {
  const dbName = serverId === 2 ? (process.env.DB_NAME_SV2 || 'nro_v2') : (process.env.DB_NAME_SV1 || 'nro_v1');

  const poolConfig: mysql.PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 300000,
    connectTimeout: 60000,
    idleTimeout: 60000,
    maxIdle: 2
  };

  if (serverId === 2) {
    if (!globalForDb.pool2) {
      globalForDb.pool2 = mysql.createPool(poolConfig);
    }
    return globalForDb.pool2;
  }
  if (!globalForDb.pool1) {
    globalForDb.pool1 = mysql.createPool(poolConfig);
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
