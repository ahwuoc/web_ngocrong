'use client';

import Link from 'next/link';

interface NavbarProps {
  siteName: string;
  user?: { username: string; is_admin: number } | null;
}

export default function Navbar({ siteName, user }: NavbarProps) {
  return (
    <section className="__section main_head __zero">
      <input id="toggle-menu__header-page" type="checkbox" style={{ display: 'none' }} />
      <div className="navbar">
        <div className="limit__game">
          <div className="left-header hidden__PC">
            <div className="icon-name-game dFlex">
              <div className="icon-game">
                <img src="/assets/frontend/home/v1/images/bannergame.png" alt="" />
              </div>
              <div className="txt-name-game c-white">
                <div className="name-game f-sVN-Avengeance">{siteName}</div>
              </div>
            </div>
          </div>

          <div className="navbar-content tCenter">
            <ul id="menu" className="f-Roboto-Regular" style={{ textAlign: 'center' }}>
              <li style={{ textAlign: 'center' }}>
                <Link href="/" style={{ display: 'block', textAlign: 'center' }}>Trang chủ</Link>
              </li>
              <li style={{ textAlign: 'center' }}>
                <Link href="/bangxephang" style={{ display: 'block', textAlign: 'center' }}>BXH</Link>
              </li>
              <li style={{ textAlign: 'center' }}>
                <Link href="/tin-tuc" style={{ display: 'block', textAlign: 'center' }}>Tin tức</Link>
              </li>
              <li style={{ textAlign: 'center' }}>
                <Link href="/su-kien" style={{ display: 'block', textAlign: 'center' }}>Sự kiện</Link>
              </li>
              <li style={{ textAlign: 'center' }}>
                <Link href="/huong-dan" style={{ display: 'block', textAlign: 'center' }}>Hướng dẫn</Link>
              </li>
              {user ? (
                <>
                  <li className="auth-btn">
                    <Link href="/profile" className="btn-login">{user.username}</Link>
                  </li>
                  <li className="auth-btn">
                    <a href="/api/auth/logout" className="btn-register">Đăng xuất</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="auth-btn">
                    <Link href="/login" className="btn-login">Đăng nhập</Link>
                  </li>
                  <li className="auth-btn">
                    <Link href="/register" className="btn-register">Đăng ký</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="icon-hamburger hidden__PC">
            <label htmlFor="toggle-menu__header-page" id="menu__header-page">
              <div className="inner-menu__header-page"></div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
