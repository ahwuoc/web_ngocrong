'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RankEntry {
  player_name: string;
  value: string;
  avatar: string;
}

interface Props {
  serverId: number;
  siteName: string;
  topNap: RankEntry[];
  topPower: RankEntry[];
  topTask: RankEntry[];
}

export default function BangXepHangClient({ serverId, topNap, topPower, topTask }: Props) {
  const [activeTab, setActiveTab] = useState<'nap' | 'power' | 'task'>('nap');

  const activeData = activeTab === 'nap' ? topNap : activeTab === 'power' ? topPower : topTask;
  const unitLabel = activeTab === 'nap' ? 'Số tiền' : activeTab === 'power' ? 'Sức mạnh' : 'Nhiệm vụ';

  const btnNormal = "/assets/frontend/home/v1/images/btn-yellow-small2.png";
  const btnActive = "/assets/frontend/home/v1/images/btn-yellow-small2__sl.png";

  return (
    <div className="rankings-dark-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        .rankings-dark-container {
          background: rgba(0, 0, 0, 0.85) !important;
          backdrop-filter: blur(20px) !important;
          border: 2px solid #ff8c00 !important;
          border-radius: 12px !important;
          padding: 30px !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.9) !important;
          max-width: 1100px !important;
          margin: 0 auto !important;
        }
        .rank-title-box {
          background: rgba(255, 140, 0, 0.1) !important;
          border: 1px solid #ff8c00 !important;
          border-radius: 8px !important;
          padding: 15px !important;
          margin-bottom: 25px !important;
          text-align: center !important;
        }
        .rank-title {
          font-family: 'Bangers', cursive !important;
          font-size: 42px !important;
          color: white !important;
          text-transform: uppercase !important;
          margin: 0 !important;
          letter-spacing: 3px !important;
          text-shadow: 0 0 10px rgba(255, 140, 0, 0.5) !important;
        }
        .server-pills {
          display: flex !important;
          justify-content: center !important;
          gap: 12px !important;
          margin-bottom: 30px !important;
        }
        .server-pill {
          all: unset !important;
          padding: 8px 20px !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 140, 0, 0.3) !important;
          border-radius: 20px !important;
          color: rgba(255, 255, 255, 0.7) !important;
          font-family: 'Bangers', cursive !important;
          font-size: 17px !important;
          cursor: pointer !important;
          transition: all 0.3s !important;
          text-decoration: none !important;
        }
        .server-pill.active, .server-pill:hover {
          background: #ff8c00 !important;
          color: white !important;
          border-color: #ff8c00 !important;
        }
        .tab-menu {
          display: flex !important;
          justify-content: center !important;
          gap: 5px !important;
          margin-bottom: 25px !important;
        }
        .premium-tab-btn {
          all: unset !important;
          width: 150px !important;
          height: 56px !important;
          background-image: url('${btnNormal}') !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          cursor: pointer !important;
          font-family: 'Bangers', cursive !important;
          font-size: 20px !important;
          color: #2d1b0d !important;
          text-transform: uppercase !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding-bottom: 5px !important;
          transition: all 0.2s !important;
        }
        .premium-tab-btn.active {
          background-image: url('${btnActive}') !important;
          transform: scale(1.05) !important;
          filter: brightness(1.1) !important;
        }
        .table-container {
          background: rgba(0, 0, 0, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 10px !important;
          overflow: hidden !important;
        }
        .bxh-table {
          width: 100% !important;
          border-collapse: collapse !important;
          color: white !important;
        }
        .bxh-table th {
          background: rgba(255, 140, 0, 0.15) !important;
          color: #ff8c00 !important;
          font-family: 'Bangers', cursive !important;
          font-size: 19px !important;
          text-transform: uppercase !important;
          padding: 16px !important;
          text-align: left !important;
          letter-spacing: 1px !important;
        }
        .bxh-table td {
          padding: 14px 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          font-size: 16px !important;
          color: white !important;
        }
        .bxh-table tr:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .rank-top-1 { background: rgba(255, 140, 0, 0.08) !important; }
        .val-text {
          color: #ff8c00 !important;
          font-family: 'Bangers', cursive !important;
          font-size: 1.2em !important;
          background: rgba(0, 0, 0, 0.5) !important;
          padding: 4px 12px !important;
          border-radius: 4px !important;
          border: 1px solid rgba(255, 140, 0, 0.4) !important;
        }
        .rank-gold { color: #ffd700 !important; font-weight: bold !important; font-size: 1.1em !important; }
        .rank-silver { color: #e0e0e0 !important; font-weight: bold !important; }
        .rank-bronze { color: #cd7f32 !important; font-weight: bold !important; }
        
        .player-cell {
          display: flex !important;
          align-items: center !important;
          gap: 60px !important; /* Increased GAP between avatar section and name */
        }
        
        .avatar-circle {
          width: 55px !important;
          height: 55px !important;
          border-radius: 50% !important;
          border: 2px solid #ff8c00 !important;
          object-fit: cover !important;
          background: #000 !important;
          display: block !important;
        }
        .avatar-wrapper {
          position: relative !important;
          width: 60px !important;
          height: 60px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
        }
        .hero-frame {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 10 !important;
          pointer-events: none !important;
          max-width: none !important;
        }
        .top1-f { width: 140px !important; height: 140px !important; }
        .top2-f { width: 115px !important; height: 115px !important; }
        .top3-f { width: 115px !important; height: 115px !important; }

        /* Avatar sizing for top rows */
        .rank-top-1 .avatar-circle { width: 65px !important; height: 65px !important; }
        .rank-top-2 .avatar-circle, .rank-top-3 .avatar-circle { width: 60px !important; height: 60px !important; }
        
        @media (max-width: 640px) {
          .rankings-dark-container { padding: 15px !important; }
          .rank-title { font-size: 28px !important; }
          .premium-tab-btn { width: 120px !important; height: 50px !important; font-size: 17px !important; }
          .player-cell { gap: 40px !important; }
          .avatar-circle { width: 40px !important; height: 40px !important; }
          .top1-f { width: 90px !important; height: 90px !important; }
          .top2-f, .top3-f { width: 80px !important; height: 80px !important; }
        }
      `}} />

      <div className="rank-title-box">
        <h1 className="rank-title">Xếp Hạng Danh Vọng</h1>
      </div>

      <div className="server-pills">
        <Link href="/bangxephang?server=1" className={`server-pill ${serverId === 1 ? 'active' : ''}`}>Vũ Trụ 1</Link>
        <Link href="/bangxephang?server=2" className={`server-pill ${serverId === 2 ? 'active' : ''}`}>Vũ Trụ 2</Link>
      </div>

      <div className="tab-menu">
        <button className={`premium-tab-btn ${activeTab === 'nap' ? 'active' : ''}`} onClick={() => setActiveTab('nap')}>Top Nạp</button>
        <button className={`premium-tab-btn ${activeTab === 'power' ? 'active' : ''}`} onClick={() => setActiveTab('power')}>Top Sức Mạnh</button>
        <button className={`premium-tab-btn ${activeTab === 'task' ? 'active' : ''}`} onClick={() => setActiveTab('task')}>Top Nhiệm Vụ</button>
      </div>

      <div className="table-container">
        <table className="bxh-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Hạng</th>
              <th style={{ width: '55%' }}>Chiến Binh</th>
              <th style={{ width: '30%' }}>{unitLabel}</th>
            </tr>
          </thead>
          <tbody>
            {activeData.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '50px', color: 'rgba(255,255,255,0.4)' }}>
                  Đang thu thập dữ liệu chiến binh...
                </td>
              </tr>
            ) : (
              activeData.map((entry, i) => (
                <tr key={i} className={i === 0 ? 'rank-top-1' : i === 1 ? 'rank-top-2' : i === 2 ? 'rank-top-3' : ''}>
                  <td>
                    <div className={i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : ''}>
                      {i === 0 ? '🥇 #1' : i === 1 ? '🥈 #2' : i === 2 ? '🥉 #3' : `#${i + 1}`}
                    </div>
                  </td>
                  <td>
                    <div className="player-cell">
                      <div className="avatar-wrapper">
                        {i === 0 && (
                          <img src="https://cmangax16.com/assets/img/fame/frame/s9_5.png" className="hero-frame top1-f" alt="f1" />
                        )}
                        {i === 1 && (
                          <img src="https://cmangax16.com/assets/img/fame/frame/discord_091.png" className="hero-frame top2-f" alt="f2" />
                        )}
                        {i === 2 && (
                          <img src="https://cmangax16.com/assets/img/fame/frame/discord_041.png" className="hero-frame top3-f" alt="f3" />
                        )}
                        <img
                          src={entry.avatar}
                          alt="avatar"
                          className="avatar-circle"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/frontend/home/v1/images/bannergame.png';
                          }}
                        />
                      </div>
                      <span style={{ color: 'white', fontWeight: i < 3 ? 'bold' : 'normal', whiteSpace: 'nowrap' }}>
                         {entry.player_name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="val-text">{entry.value}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
