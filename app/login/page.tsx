'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password'),
        server_id: form.get('server'),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push('/');
      router.refresh();
    }
  }

  const btnNormal = "/assets/frontend/home/v1/images/btn-yellow-small2.png";
  const btnActive = "/assets/frontend/home/v1/images/btn-yellow-small2__sl.png";

  return (
    <div id="login-page-premium" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-20 px-4">
      <style dangerouslySetInnerHTML={{ __html: `
        #login-page-premium {
          background: url('/_next/static/media/login_bg_dragon_ball_1776236498991.png') center/cover no-repeat fixed !important;
        }
        #login-page-premium::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: rgba(0, 0, 0, 0.5) !important;
          z-index: 1 !important;
        }
        .login-card {
          position: relative !important;
          z-index: 10 !important;
          width: 100% !important;
          max-width: 480px !important;
          background: rgba(0, 0, 0, 0.75) !important;
          backdrop-filter: blur(15px) !important;
          border: 1px solid rgba(255, 140, 0, 0.3) !important;
          border-radius: 12px !important;
          padding: 40px !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.8) !important;
        }
        .close-btn {
          position: absolute !important;
          top: 15px !important;
          right: 20px !important;
          color: rgba(255, 255, 255, 0.5) !important;
          font-size: 24px !important;
          text-decoration: none !important;
          transition: color 0.3s !important;
          font-weight: bold !important;
          z-index: 20 !important;
        }
        .close-btn:hover {
          color: #ff8c00 !important;
        }
        .login-title {
          font-family: 'Bangers', cursive !important;
          font-size: 42px !important;
          color: white !important;
          text-align: center !important;
          text-transform: uppercase !important;
          margin-bottom: 30px !important;
          letter-spacing: 2px !important;
          text-shadow: 0 0 10px rgba(255, 140, 0, 0.5) !important;
        }
        .input-group {
          margin-bottom: 25px !important;
        }
        .input-label {
          display: block !important;
          font-family: 'Bangers', cursive !important;
          font-size: 18px !important;
          color: #ff8c00 !important;
          text-transform: uppercase !important;
          margin-bottom: 8px !important;
          letter-spacing: 1px !important;
        }
        .premium-input {
          all: unset !important;
          width: 100% !important;
          box-sizing: border-box !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 140, 0, 0.2) !important;
          border-radius: 6px !important;
          padding: 14px 20px !important;
          color: white !important;
          font-size: 16px !important;
          transition: all 0.3s !important;
        }
        .premium-input:focus {
          border-color: #ff8c00 !important;
          background: rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 0 15px rgba(255, 140, 0, 0.15) !important;
        }
        .premium-select {
          all: unset !important;
          width: 100% !important;
          box-sizing: border-box !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 140, 0, 0.2) !important;
          border-radius: 6px !important;
          padding: 14px 20px !important;
          color: white !important;
          font-size: 16px !important;
          cursor: pointer !important;
        }
        .premium-select option {
          background: #1a1a1a !important;
          color: white !important;
        }
        .login-btn {
          all: unset !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          height: 64px !important;
          background-image: url('${btnNormal}') !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          cursor: pointer !important;
          font-family: 'Bangers', cursive !important;
          font-size: 24px !important;
          color: #2d1b0d !important;
          text-transform: uppercase !important;
          transition: transform 0.2s !important;
          margin-top: 20px !important;
        }
        .login-btn:hover {
          transform: scale(1.02) !important;
          background-image: url('${btnActive}') !important;
        }
        .login-btn:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }
        .error-alert {
          background: rgba(239, 68, 68, 0.2) !important;
          border: 1px solid rgba(239, 68, 68, 0.5) !important;
          color: #fca5a5 !important;
          padding: 12px !important;
          border-radius: 6px !important;
          margin-bottom: 20px !important;
          text-align: center !important;
          font-size: 14px !important;
        }
        .signup-link {
          text-align: center !important;
          margin-top: 25px !important;
          color: rgba(255, 255, 255, 0.6) !important;
          font-size: 15px !important;
        }
        .signup-link a {
          color: #ff8c00 !important;
          font-weight: bold !important;
          text-decoration: none !important;
        }
        .signup-link a:hover {
          text-decoration: underline !important;
        }
      `}} />

      <div className="login-card">
        <Link href="/" className="close-btn">✕</Link>
        <h1 className="login-title">Đăng Nhập</h1>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Tài khoản</label>
            <input 
              type="text" 
              name="username" 
              className="premium-input" 
              placeholder="Nhập tên tài khoản..." 
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Máy chủ</label>
            <select name="server" className="premium-select">
              {SITE_CONFIG.servers.map(sv => (
                <option key={sv.id} value={sv.id}>{sv.name}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Mật khẩu</label>
            <input 
              type="password" 
              name="password" 
              className="premium-input" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang Xử Lý...' : 'Vào Game Ngay'}
          </button>

          <div className="signup-link">
            Chưa có tài khoản? <Link href="/register">Đăng ký tại đây</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
