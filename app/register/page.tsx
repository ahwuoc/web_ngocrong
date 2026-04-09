'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.get('username'),
        email: form.get('email'),
        password: form.get('password'),
        confirm: form.get('confirm'),
        server_id: form.get('server'),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      setSuccess(data.message);
      setTimeout(() => router.push('/login'), 1500);
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="container">
        <div className="auth-container box-border">
          <h1 className="auth-title">ĐĂNG KÝ</h1>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="username" className="auth-label">Tài khoản</label>
              <input type="text" name="username" id="username" className="auth-input" placeholder="Tên đăng nhập..." required />
            </div>
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">Email</label>
              <input type="email" name="email" id="email" className="auth-input" placeholder="Email của bạn..." required />
            </div>
            <div className="auth-form-group">
              <label htmlFor="server" className="auth-label">Máy chủ</label>
              <select name="server" id="server" className="auth-input">
                <option value="1">Server 1 (Rồng 1 Sao)</option>
                <option value="2">Server 2 (Rồng 2 Sao)</option>
              </select>
            </div>
            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">Mật khẩu</label>
              <input type="password" name="password" id="password" className="auth-input" placeholder="••••••••" required />
            </div>
            <div className="auth-form-group">
              <label htmlFor="confirm" className="auth-label">Nhập lại mật khẩu</label>
              <input type="password" name="confirm" id="confirm" className="auth-input" placeholder="••••••••" required />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'ĐĂNG KÝ NGAY'}
            </button>
            <div className="auth-footer">
              Đã có tài khoản?{' '}
              <Link href="/login" className="auth-link">Đăng nhập</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
