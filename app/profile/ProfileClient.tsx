'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  user: { id: number; username: string; email: string; danap: number; active: number };
  player: { name: string } | null;
  avatarPath: string;
  power: number;
  taskName: string;
  planet: string;
}

export default function ProfileClient({ user, player, avatarPath, power, taskName, planet }: Props) {
  const router = useRouter();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage('Mật khẩu xác nhận không khớp.');
      return;
    }
    const res = await fetch('/api/profile/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_password: newPassword }),
    });
    const data = await res.json();
    setIsError(!res.ok);
    setMessage(data.message || data.error);
    if (res.ok) {
      setShowPasswordForm(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  async function handleActivate() {
    const res = await fetch('/api/profile/activate', { method: 'POST' });
    const data = await res.json();
    setIsError(!res.ok);
    setMessage(data.message || data.error);
    if (res.ok) router.refresh();
  }

  const btnStyle: React.CSSProperties = {
    padding: 15, fontFamily: "'Bangers',cursive", fontSize: '1.2em',
    background: '#fff', color: '#222', border: '3px solid #222',
    borderRadius: 10, cursor: 'pointer', textTransform: 'uppercase',
    boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Trang chủ</Link> &gt; <span>Thông tin cá nhân</span>
        </div>
        <div style={{ maxWidth: 600, margin: '30px auto' }}>
          {/* Title */}
          <div style={{ background: '#fff', border: '3px solid #222', borderRadius: 12, padding: 20, marginBottom: 20, textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <h1 style={{ fontFamily: "'Bangers',cursive", fontSize: '2.5em', color: '#222', letterSpacing: 2, margin: 0, textTransform: 'uppercase' }}>
              THÔNG TIN TÀI KHOẢN
            </h1>
          </div>

          {message && (
            <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>{message}</div>
          )}

          {/* Account Info */}
          <div style={{ background: '#d597fa', border: '3px solid #222', borderRadius: 12, padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <div style={{ flexShrink: 0 }}>
              <img src={avatarPath} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid #222', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Bangers',cursive", fontSize: '1.5em', color: '#222', marginBottom: 8 }}>👤 {user.username}</div>
              <div style={{ fontFamily: "'Bangers',cursive", fontSize: '1.2em', color: '#444', marginBottom: 8 }}>📧 {user.email || 'Chưa cập nhật email'}</div>
              <div style={{ fontFamily: "'Bangers',cursive", fontSize: '1.2em', color: '#444' }}>
                💰 Số dư:{' '}
                <span style={{ color: '#fff', fontWeight: 'bold', background: '#ff6b35', padding: '3px 8px', borderRadius: 5, border: '2px solid #222', marginLeft: 5 }}>
                  {Number(user.danap).toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
          </div>

          {/* Player Info */}
          <div style={{ background: '#90cdf4', border: '3px solid #222', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: "'Bangers',cursive", fontSize: '1.8em', color: '#1a202c', margin: '0 0 15px 0', textAlign: 'center' }}>🎮 THÔNG TIN NHÂN VẬT</h2>
            {player ? (
              <div style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
                {[
                  { label: '🏷️ Tên:', value: player.name },
                  { label: '💪 Sức mạnh:', value: power.toLocaleString('vi-VN'), highlight: true },
                  { label: '🎯 Nhiệm vụ:', value: taskName },
                  { label: '✅ Trạng thái:', value: user.active ? 'ĐÃ KÍCH HOẠT' : 'CHƯA KÍCH HOẠT', color: user.active ? '#16a34a' : '#dc2626' },
                  { label: '🌍 Hành tinh:', value: planet },
                ].map(({ label, value, highlight, color }) => (
                  <div key={label} style={{ fontFamily: "'Bangers',cursive", fontSize: '1.3em', color: '#1a202c', marginBottom: 8, display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: 140, display: 'inline-block' }}>{label}</span>
                    <span style={highlight ? { color: '#fff', background: '#ff6b35', padding: '3px 8px', borderRadius: 5, border: '2px solid #222' } : { color: color || '#1a202c', fontWeight: 'bold' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontFamily: "'Bangers',cursive", fontSize: '1.5em', color: '#1a202c', fontWeight: 'bold', textAlign: 'center' }}>
                ⚠️ TÀI KHOẢN NÀY CHƯA TẠO NHÂN VẬT
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ background: '#42e4f5', border: '3px solid #222', borderRadius: 12, padding: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: user.active === 0 ? '1fr 1fr' : '1fr 1fr 1fr', gap: 15 }}>
              <button style={btnStyle} onClick={() => setShowPasswordForm(!showPasswordForm)}>🔒 Đổi mật khẩu</button>
              {user.active === 0 && (
                <button style={{ ...btnStyle, background: '#ff6b6b', color: '#fff' }} onClick={handleActivate}>⚡ Kích hoạt</button>
              )}
              <button style={btnStyle} onClick={() => window.location.href = '/api/auth/logout'}>🚪 Đăng xuất</button>
              <button style={btnStyle} onClick={() => window.location.href = '/napthe'}>💰 Nạp tiền</button>
            </div>

            {showPasswordForm && (
              <div style={{ marginTop: 20, padding: 20, background: '#fff', border: '3px solid #222', borderRadius: 10 }}>
                <form onSubmit={handleChangePassword}>
                  <div style={{ marginBottom: 15 }}>
                    <label style={{ fontFamily: "'Bangers',cursive", fontSize: '1.2em', display: 'block', marginBottom: 8 }}>Mật khẩu mới:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                      style={{ width: '100%', borderRadius: 8, border: '3px solid #222', padding: 12, fontSize: '1em', boxSizing: 'border-box' }} required />
                  </div>
                  <div style={{ marginBottom: 15 }}>
                    <label style={{ fontFamily: "'Bangers',cursive", fontSize: '1.2em', display: 'block', marginBottom: 8 }}>Xác nhận mật khẩu:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      style={{ width: '100%', borderRadius: 8, border: '3px solid #222', padding: 12, fontSize: '1em', boxSizing: 'border-box' }} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button type="submit" style={{ ...btnStyle, background: '#28a745', color: '#fff' }}>✅ Cập nhật</button>
                    <button type="button" onClick={() => setShowPasswordForm(false)} style={{ ...btnStyle, background: '#dc3545', color: '#fff' }}>❌ Hủy</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
