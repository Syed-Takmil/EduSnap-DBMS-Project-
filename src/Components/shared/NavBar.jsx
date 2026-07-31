"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bars, Xmark } from '@gravity-ui/icons'; // Make sure to npm i @gravity-ui/icons
import Logo from '../Logo';
import NavLink from './NavLink';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'Apply as Teacher', href: '/apply' },
    { name: 'About Us', href: '/about' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="bg-white  border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 items-center">
            <Logo/>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                href={link.href} 
                className="text-slate-600    font-medium text-sm transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-slate-700  hover:text-indigo-600 font-medium text-sm transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 h-10 rounded-lg flex items-center transition-all shadow-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <Xmark className="w-6 h-6" /> : <Bars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer/Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-200 dark:border-slate-800 my-2" />
            <div className="grid grid-cols-2 gap-2 p-2">
              <Link 
                href="/login" 
                className="w-full flex justify-center items-center h-10 rounded-md text-sm font-medium border border-slate-300 text-slate-700 dark:text-slate-200 dark:border-slate-700"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="w-full flex justify-center items-center h-10 rounded-md text-sm font-medium bg-indigo-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}