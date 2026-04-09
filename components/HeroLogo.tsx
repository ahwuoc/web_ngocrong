'use client';

import { useState } from 'react';

interface HeroLogoProps {
  src: string;
  siteName: string;
}

export default function HeroLogo({ src, siteName }: HeroLogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="logo-fallback" data-aos="zoom-in">
        {siteName || 'NGỌC RỒNG SIÊU CẤP'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={siteName}
      className="textgame__game"
      onError={() => setError(true)}
      data-aos="fade-down"
      data-aos-duration="700"
      data-aos-delay="100"
    />
  );
}
