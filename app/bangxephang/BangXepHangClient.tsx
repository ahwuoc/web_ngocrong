'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RankEntry { player_name: string; value: string }

interface Props {
  serverId: number;
  siteName: string;
  topNap: RankEntry[];
  topPower: RankEntry[];
  topTask: RankEntry[];
}

const medals = ['🥇 #1', '🥈 #2', '🥉 #3'];

export default function BangXepHangClient({ serverId, topNap, topPower, topTask }: Props) {
  const [activeTab, setActiveTab] = useState<'nap' | 'power' | 'task'>('nap');

  const activeData = activeTab === 'nap' ? topNap : activeTab === 'power' ? topPower : topTask;
  const unitLabel = activeTab === 'nap' ? 'Số tiền' : activeTab === 'power' ? 'Sức mạnh' : 'Nhiệm vụ';

  return (
    <div className="rankings-outer">
      <h1 className="auth-title">🏆 BẢNG XẾP HẠNG</h1>

      <div style={{ textAlign: 'center' }}>
        <div className="server-selector-pill">
          <Link href="/bangxephang?server=1" className={`server-pill-link ${serverId === 1 ? 'active' : ''}`}>MÁY CHỦ 1</Link>
          <Link href="/bangxephang?server=2" className={`server-pill-link ${serverId === 2 ? 'active' : ''}`}>MÁY CHỦ 2</Link>
        </div>
      </div>

      <div className="rank-tabs">
        <button className={`rank-tab-btn ${activeTab === 'nap' ? 'active' : ''}`} onClick={() => setActiveTab('nap')}>Nạp tiền</button>
        <button className={`rank-tab-btn ${activeTab === 'power' ? 'active' : ''}`} onClick={() => setActiveTab('power')}>Sức mạnh</button>
        <button className={`rank-tab-btn ${activeTab === 'task' ? 'active' : ''}`} onClick={() => setActiveTab('task')}>Nhiệm vụ</button>
      </div>

      <div className="rank-table-wrapper">
        <table className="premium-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Hạng</th>
              <th style={{ width: '45%' }}>Nhân vật</th>
              <th style={{ width: '40%' }}>{unitLabel}</th>
            </tr>
          </thead>
          <tbody>
            {!activeData.length && (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                   Không tìm thấy dữ liệu xếp hạng máy chủ này.
                </td>
              </tr>
            )}
            {activeData.map((entry, i) => (
              <tr key={i} className={`rank-entry-${i + 1}`}>
                <td>
                  <span className="rank-badge">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                </td>
                <td>{entry.player_name}</td>
                <td className="rank-val">{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
