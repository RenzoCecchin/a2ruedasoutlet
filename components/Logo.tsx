import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 220"
      className={className}
      fill="currentColor"
      aria-label="A2RUEDASOUTLET Logo"
    >
      {/* Top Gear Half */}
      <path d="M150 10 C 185 10 215 25 235 50 L 245 42 L 255 60 L 240 70 C 243 78 245 86 245 95 L 265 95 L 265 110 L 35 110 L 35 95 L 55 95 C 55 86 57 78 60 70 L 45 60 L 55 42 L 65 50 C 85 25 115 10 150 10 Z M 150 40 A 15 15 0 1 0 150 70 A 15 15 0 1 0 150 40 Z M 100 75 A 10 10 0 1 0 100 95 A 10 10 0 1 0 100 75 Z M 200 75 A 10 10 0 1 0 200 95 A 10 10 0 1 0 200 75 Z" />
      
      {/* Middle Section: Lines & Text */}
      <rect x="20" y="115" width="260" height="6" />
      
      {/* Text using the Stencil Font - Manual adjustment for SVG placement */}
      <text 
        x="150" 
        y="160" 
        textAnchor="middle" 
        fontFamily='"Black Ops One", cursive' 
        fontSize="48" 
        letterSpacing="-1"
      >
        A2RUEDASOUTLET
      </text>
      
      <rect x="20" y="170" width="260" height="6" />

      {/* Bottom Gear Half */}
      <path d="M 35 180 L 265 180 L 265 195 L 245 195 C 245 204 243 212 240 220 L 255 230 L 245 248 L 235 240 C 215 265 185 280 150 280 C 115 280 85 265 65 240 L 55 248 L 45 230 L 60 220 C 57 212 55 204 55 195 L 35 195 Z M 150 220 A 15 15 0 1 0 150 250 A 15 15 0 1 0 150 220 Z" transform="translate(0, -5)" />
    </svg>
  );
};

export default Logo;