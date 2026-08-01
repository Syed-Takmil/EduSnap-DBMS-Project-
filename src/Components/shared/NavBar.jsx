"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bars, Xmark, Person, ArrowRightFromSquare } from '@gravity-ui/icons';
import Logo from '../Logo';
import NavLink from './NavLink';

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check login session on component mount and on storage events
  useEffect(() => {
    const syncUserSession = () => {
      const storedUser = localStorage.getItem('eduSnap_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user session", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    syncUserSession();

    // Listen for storage changes across tabs or custom logout triggers
    window.addEventListener('storage', syncUserSession);
    return () => window.removeEventListener('storage', syncUserSession);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('eduSnap_user');
    setUser(null);
    setIsOpen(false);
    router.push('/login');
  };

  // Determine dynamic dashboard route based on user role and ID
  const getDashboardHref = () => {
    if (!user) return '/login';
    if (user.role === 'teacher') return `/teacher-dashboard?teacherId=${user.id}`;
    if (user.role === 'admin') return `/admin-dashboard?adminId=${user.id}`;
    return `/dashboard?studentId=${user.id}`;
  };

  const navLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'Apply as Teacher', href: '/apply' },
    { name: 'About Us', href: '/about' },
    { name: 'Dashboard', href: getDashboardHref() },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 items-center">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 font-medium text-sm transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              /* Logged In User State */
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Person className="w-4 h-4 text-indigo-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                    <p className="text-[10px] font-semibold text-indigo-600 capitalize leading-tight">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-3 h-9 rounded-lg border border-slate-200 hover:border-rose-200 transition-all"
                  title="Sign Out"
                >
                  <ArrowRightFromSquare className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              /* Logged Out Guest State */
              <>
                <Link href="/login" className="text-slate-700 hover:text-indigo-600 font-medium text-sm transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 h-10 rounded-lg flex items-center transition-all shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <Xmark className="w-6 h-6" /> : <Bars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer/Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-200 my-2" />

            {user ? (
              <div className="p-2 space-y-2">
                <div className="flex items-center space-x-2 bg-slate-100 p-3 rounded-md">
                  <Person className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs font-medium text-indigo-600 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center h-10 rounded-md text-sm font-medium bg-rose-50 text-rose-600 border border-rose-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 p-2">
                <Link 
                  href="/login" 
                  className="w-full flex justify-center items-center h-10 rounded-md text-sm font-medium border border-slate-300 text-slate-700"
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
            )}
          </div>
        </div>
      )}
    </nav>
  );
}