import React from 'react';

export default function Cubes() {
  return (
    <svg viewBox="0 0 370 635" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f1b2b" /><stop offset=".75" stopColor="#14202f" /><stop offset="1" stopColor="#3a2a2a" /></linearGradient>
        <linearGradient id="topC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a3548" /><stop offset=".8" stopColor="#d9822b" /><stop offset="1" stopColor="#f5a742" /></linearGradient>
        <linearGradient id="leftC" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#a9582f" /><stop offset="1" stopColor="#2c2630" /></linearGradient>
        <linearGradient id="rightC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2d2c3a" /><stop offset="1" stopColor="#1b1b26" /></linearGradient>
        <linearGradient id="bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#25364d" /><stop offset="1" stopColor="#1a2638" /></linearGradient>
        <linearGradient id="or" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6a3a24" /><stop offset="1" stopColor="#2a1f26" /></linearGradient>
        <radialGradient id="floor" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#6b4030" stopOpacity=".5" /><stop offset="1" stopColor="#6b4030" stopOpacity="0" /></radialGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      <rect width="370" height="635" fill="url(#bg)" />
      <ellipse cx="190" cy="540" rx="230" ry="50" fill="url(#floor)" />
      {/* top-left tilted box */}
      <polygon points="30,115 85,95 100,150 40,210" fill="url(#bl)" />
      <polygon points="85,95 195,125 180,200 100,150" fill="url(#or)" />
      <polygon points="25,205 100,150 180,200 40,230" fill="#1c2a3d" opacity=".7" />
      {/* big center cube */}
      <polygon points="130,205 245,160 335,222 220,260" fill="url(#topC)" />
      <polygon points="130,205 220,260 215,390 140,340" fill="url(#leftC)" />
      <polygon points="220,260 335,222 330,330 215,390" fill="url(#rightC)" />
      {/* black cylinder-ish */}
      <ellipse cx="350" cy="225" rx="22" ry="12" fill="#0a0e14" />
      <rect x="328" y="225" width="44" height="60" fill="#0a0e14" />
      {/* bottom cube */}
      <polygon points="225,430 310,365 370,400 290,470" fill="#26283a" />
      <polygon points="225,430 290,470 270,550 215,510" fill="#1a1c2a" />
      <polygon points="290,470 370,400 370,520 270,550" fill="#202335" />
      {/* cylinder */}
      <ellipse cx="55" cy="430" rx="30" ry="14" fill="#3a2028" />
      <polygon points="25,430 85,430 105,500 45,520" fill="#2a1a24" />
      <ellipse cx="95" cy="505" rx="32" ry="12" fill="#1a1119" />
      <circle cx="300" cy="145" r="23" fill="#f8fa6e" />
      <circle cx="72" cy="343" r="23" fill="#f8fa6e" />
    </svg>
  );
}
