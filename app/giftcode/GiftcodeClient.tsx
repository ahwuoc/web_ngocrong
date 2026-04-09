'use client';

import { useState } from 'react';
import { GiftcodeItem } from '@/lib/types';

interface GiftcodeWithItems {
  code: string;
  count_left: number;
  expired: string;
  items: GiftcodeItem[];
}

interface Props {
  giftcodes: GiftcodeWithItems[];
  siteName: string;
}

export default function GiftcodeClient({ giftcodes }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (i: number) => setExpanded(expanded === i ? null : i);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('vi-VN');

  return (
    <div className="giftcode-container">
      <div className="main-title">🎁 DANH SÁCH GIFTCODE</div>
      {giftcodes.length === 0 ? (
        <div className="giftcode-list">
          <div className="no-giftcodes">😔 Hiện tại không có giftcode nào khả dụng<br /><small>Vui lòng quay lại sau!</small></div>
        </div>
      ) : (
        <div className="giftcode-list">
          {giftcodes.map((gc, i) => (
            <div key={i} className={`giftcode-item${expanded === i ? ' expanded' : ''}`}>
              <div className="giftcode-header" onClick={() => toggle(i)}>
                <div className="gift-icon"></div>
                <div className="giftcode-info">
                  <div className="giftcode-name">{gc.code}</div>
                  <div className="giftcode-stats">Còn {gc.count_left} lượt • Hết hạn {formatDate(gc.expired)}</div>
                </div>
                <div className="expand-icon"></div>
              </div>
              {expanded === i && (
                <div className="giftcode-details">
                  {gc.items.length > 0 ? (
                    <div className="items-grid">
                      {gc.items.map((item, j) => (
                        <div key={j} className="item-card">
                          <div className="item-icon" style={{ backgroundImage: item.icon_id ? `url('/assets/frontend/home/v1/images/x1/${item.icon_id}.png')` : undefined }}></div>
                          <div className="item-name">{item.name}</div>
                          <div className="item-quantity">x{item.quantity}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>Không có thông tin phần thưởng</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .giftcode-container { max-width:800px; margin:30px auto; padding:0 15px; }
        .main-title { font-family:'Bangers',cursive; font-size:2.5em; color:#222; text-align:center; margin:0 0 30px; text-transform:uppercase; letter-spacing:2px; background:#fff; border:3px solid #222; border-radius:12px; padding:20px; box-shadow:0 4px 8px rgba(0,0,0,0.2); }
        .giftcode-list { background:#d597fa; border:3px solid #222; border-radius:12px; padding:20px; box-shadow:0 4px 8px rgba(0,0,0,0.2); }
        .giftcode-item { background:#fff; border:3px solid #222; border-radius:10px; margin-bottom:15px; overflow:hidden; transition:all 0.3s; }
        .giftcode-item:hover { transform:translateY(-2px); box-shadow:0 6px 12px rgba(0,0,0,0.3); }
        .giftcode-header { display:flex; align-items:center; padding:15px 20px; cursor:pointer; background:linear-gradient(45deg,#ff6b35,#ff8c42); color:#fff; border-bottom:2px solid #222; }
        .gift-icon { width:50px; height:50px; background:url('/assets/frontend/home/v1/images/bannergame.png') center/contain no-repeat; margin-right:15px; border:2px solid #222; border-radius:8px; background-color:#fff; }
        .giftcode-info { flex:1; }
        .giftcode-name { font-family:'Bangers',cursive; font-size:1.4em; text-transform:uppercase; letter-spacing:1px; text-shadow:2px 2px 0 #222; margin-bottom:5px; }
        .giftcode-stats { font-family:'Bangers',cursive; font-size:1em; opacity:0.9; }
        .expand-icon { width:24px; height:24px; background:url('/assets/frontend/home/v1/images/arrow-right.png') center/contain no-repeat; transition:transform 0.3s; }
        .giftcode-item.expanded .expand-icon { transform:rotate(90deg); }
        .giftcode-details { padding:20px; background:#f8f9fa; border-top:2px solid #222; }
        .items-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:15px; }
        .item-card { background:#fff; border:2px solid #222; border-radius:8px; padding:10px; text-align:center; transition:all 0.3s; }
        .item-card:hover { transform:scale(1.05); box-shadow:0 4px 8px rgba(0,0,0,0.2); }
        .item-icon { width:48px; height:48px; margin:0 auto 8px; border:2px solid #222; border-radius:6px; background:#f0f0f0; background-size:contain; background-repeat:no-repeat; background-position:center; }
        .item-name { font-family:'Bangers',cursive; font-size:0.9em; color:#333; margin-bottom:4px; word-wrap:break-word; line-height:1.2; }
        .item-quantity { font-family:'Bangers',cursive; font-size:0.8em; color:#666; background:#e9ecef; padding:2px 6px; border-radius:10px; border:1px solid #222; }
        .no-giftcodes { text-align:center; padding:40px; font-family:'Bangers',cursive; font-size:1.4em; color:#666; }
      `}</style>
    </div>
  );
}
