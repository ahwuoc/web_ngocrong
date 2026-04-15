'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  siteName: string;
  user?: { username: string; is_admin: number } | null;
}

export default function Header({ siteName, user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/bangxephang', label: 'BXH' },
    { href: '/tin-tuc', label: 'Tin tức' },
    { href: '/su-kien', label: 'Sự kiện' },
    { href: '/huong-dan', label: 'Hướng dẫn' },
  ];

  const btnNormal = "/assets/frontend/home/v1/images/btn-yellow-small2.png";
  const btnActive = "/assets/frontend/home/v1/images/btn-yellow-small2__sl.png";

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        #premium-game-header {
          all: unset !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 99999 !important;
          display: flex !important;
          align-items: center !important;
          transition: all 0.3s ease !important;
          background-color: rgba(0, 0, 0, 0.9) !important;
          backdrop-filter: blur(10px) !important;
          border-bottom: 2px solid #ff8c00 !important;
          box-sizing: border-box !important;
          height: ${scrolled ? '70px' : '90px'} !important;
        }
        #premium-game-header * {
          box-sizing: border-box !important;
        }
        #premium-game-header .nav-link-game {
          all: unset !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 140px !important;
          height: 52px !important;
          background-image: url(${btnNormal}) !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          cursor: pointer !important;
          font-family: 'Bangers', cursive !important;
          font-size: 19px !important;
          color: #2d1b0d !important;
          text-transform: uppercase !important;
          text-align: center !important;
          padding-bottom: 5px !important;
          transition: all 0.2s ease !important;
        }
        #premium-game-header .nav-link-game:hover {
          transform: scale(1.05) !important;
          background-image: url(${btnActive}) !important;
        }
        #premium-game-header .nav-link-game.active {
          background-image: url(${btnActive}) !important;
          color: #5c3d14 !important;
          cursor: default !important;
        }
        #premium-game-header .logo-container {
          all: unset !important;
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding-left: 40px !important;
          flex-shrink: 0 !important;
        }
        #premium-game-header .logo-text {
          all: unset !important;
          color: white !important;
          font-family: 'Bangers', cursive !important;
          font-size: 28px !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
        }
        #premium-game-header .auth-container {
          all: unset !important;
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          padding-right: 40px !important;
          flex-shrink: 0 !important;
        }
        @media (max-width: 1280px) {
          #premium-game-header .desktop-only { display: none !important; }
        }
      `}} />

      <header id="premium-game-header">
        <div className="logo-container">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="/assets/frontend/home/v1/images/bannergame.png"
              style={{ width: '55px', height: 'auto', borderRadius: '4px' }}
              alt="Logo"
            />
            <span className="logo-text">{siteName}</span>
          </Link>
        </div>

        <nav className="desktop-only" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link-game ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="auth-container">
          <div className="desktop-only" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {user ? (
              <>
                <Link href="/profile" className="nav-link-game">
                  {user.username}
                </Link>
                <a href="/api/auth/logout" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontFamily: 'Bangers', fontSize: '16px', textTransform: 'uppercase', paddingLeft: '10px' }}>Thoát</a>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link-game">Đăng nhập</Link>
                <Link href="/register" className="nav-link-game" style={{ filter: 'brightness(1.15) contrast(1.1)' }}>Đăng ký</Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              all: 'unset',
              display: 'none',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px'
            }}
            className="mobile-hamburger-btn"
          >
            <style dangerouslySetInnerHTML={{
              __html: `
               @media (max-width: 1280px) {
                 .mobile-hamburger-btn { display: flex !important; }
               }
             `}} />
            <span style={{ display: 'block', width: '30px', height: '3px', backgroundColor: 'white', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translateY(12px)' : '' }}></span>
            <span style={{ display: 'block', width: '30px', height: '3px', backgroundColor: 'white', transition: '0.3s', opacity: isOpen ? 0 : 1 }}></span>
            <span style={{ display: 'block', width: '30px', height: '3px', backgroundColor: 'white', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translateY(-12px)' : '' }}></span>
          </button>
        </div>

        {/* Mobile Drawer (Simplest possible for stability) */}
        {isOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)', zIndex: 100000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '25px', right: '25px', color: '#ff8c00', fontSize: '50px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'serif' }}>×</button>
            
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
               <img src="/assets/frontend/home/v1/images/bannergame.png" style={{ width: '80px', borderRadius: '10px', border: '2px solid #ff8c00' }} alt="logo" />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="nav-link-game"
                style={{ width: '220px', height: '60px', fontSize: '22px' }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ width: '150px', height: '2px', background: 'rgba(255,140,0,0.3)', margin: '10px 0' }}></div>

            {user ? (
               <>
                 <Link href="/profile" onClick={() => setIsOpen(false)} className="nav-link-game" style={{ width: '220px', height: '60px', fontSize: '22px' }}>
                   {user.username}
                 </Link>
                 <a href="/api/auth/logout" style={{ color: '#ff4444', textDecoration: 'none', fontFamily: 'Bangers', fontSize: '20px', textTransform: 'uppercase', marginTop: '10px' }}>Thoát</a>
               </>
            ) : (
               <>
                 <Link href="/login" onClick={() => setIsOpen(false)} className="nav-link-game" style={{ width: '220px', height: '60px', fontSize: '22px' }}>
                   Đăng nhập
                 </Link>
                 <Link href="/register" onClick={() => setIsOpen(false)} className="nav-link-game" style={{ width: '220px', height: '60px', fontSize: '22px', filter: 'brightness(1.2)' }}>
                   Đăng ký
                 </Link>
               </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
