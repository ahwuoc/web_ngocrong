import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import { getSession } from '@/lib/session';
import { queryOne } from '@/lib/db';
import { Account } from '@/lib/types';

export const metadata: Metadata = {
  title: 'NGỌC RỒNG CHILL - TRẢI NGHIỆM ĐẰNG CẤP',
  description: 'Trải nghiệm thế giới Ngọc Rồng Chill với đồ họa đỉnh cao, hệ thống nhiệm vụ phong phú và cộng đồng đông đảo.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  let user: Account | null = null;

  if (session.userId) {
    user = await queryOne<Account>(
      'SELECT id, username, email, is_admin FROM account WHERE id = ?',
      [session.userId],
      session.serverId || 1
    );
  }

  return (
    <html lang="vi" className="__roots root__page">
      <head>
        <link rel="stylesheet" href="/assets/frontend/home/v1/css/slick-theme.css" />
        <link rel="stylesheet" href="/assets/frontend/home/v1/css/slick.css" />
        <link rel="stylesheet" href="/assets/frontend/home/v1/css/jquery.fancybox.min.css" />
        <link rel="stylesheet" href="/assets/frontend/home/v1/css/aos.css" />
        <link rel="stylesheet" href="/assets/frontend/home/v1/css/stylea6ca.css?v=919" />
        <link rel="stylesheet" href="/assets/css/auth.css" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded">
          Skip to content
        </a>
        <Header siteName="NGỌC RỒNG CHILL" user={user || undefined} />
        <main id="main-content">
          {children}
        </main>
        <Script src="/assets/frontend/home/v1/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/frontend/home/v1/js/ScrollMagic.min.js" strategy="afterInteractive" />
        <Script src="/assets/frontend/home/v1/js/aos.js" strategy="afterInteractive" />
        <Script src="/assets/frontend/home/v1/js/slick.min.js" strategy="afterInteractive" />
        <Script src="/assets/frontend/home/v1/js/jquery.fancybox.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
