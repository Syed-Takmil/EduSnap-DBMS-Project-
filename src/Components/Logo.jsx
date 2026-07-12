import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      {/* Replace this div with an actual SVG if you have one, or keep the stylish text logo */}
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:bg-indigo-700 transition-colors">
        ES
      </div>
      <span className="font-extrabold text-xl tracking-tight text-slate-900 ">
        Edu<span className="text-indigo-600">Snap</span>
      </span>
    </Link>
  );
}