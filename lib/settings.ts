import { queryOne } from './db';

interface Setting {
  value: string;
}

const settingsCache = new Map<string, string>();

export async function getSetting(key: string, defaultValue = ''): Promise<string> {
  if (settingsCache.has(key)) return settingsCache.get(key)!;
  const row = await queryOne<Setting>('SELECT value FROM settings WHERE key_name = ?', [key]);
  const value = row?.value ?? defaultValue;
  settingsCache.set(key, value);
  return value;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await queryOne<Record<string, string>>('SELECT * FROM settings LIMIT 1');
  return rows ?? {};
}
