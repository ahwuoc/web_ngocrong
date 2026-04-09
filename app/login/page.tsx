'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <div className="auth-page-wrapper">
      <div className="container">
        <div className="breadcrumb-auth">
          <Link href="/">Trang chủ</Link> <span>&gt;</span> <span>Đăng nhập</span>
        </div>
        <div className="auth-container box-border">
          <h1 className="auth-title">ĐĂNG NHẬP</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="username" className="auth-label">Tài khoản / Email</label>
              <input type="text" name="username" id="username" className="auth-input" placeholder="Tên đăng nhập hoặc email..." required />
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
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
            </button>
            <div className="auth-footer">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="auth-link">Đăng ký ngay</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
