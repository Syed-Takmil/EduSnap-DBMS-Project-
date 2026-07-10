import React from 'react';
import Link from 'next/link';

export default function FooterLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2 opacity-90 hover:opacity-100 transition-opacity">
      <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-base">
        ES
      </div>
      <span className="font-bold text-lg tracking-tight text-white">
        Edu<span className="text-indigo-400">Snap</span>
      </span>
    </Link>
  );
}