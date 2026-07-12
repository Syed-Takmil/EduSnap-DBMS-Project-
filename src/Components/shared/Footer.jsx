 

import React from 'react';
import Link from 'next/link';
import FooterLogo from '../FooterLogo';
import { Xmark, LogoFacebook, Briefcase } from '@gravity-ui/icons'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Browse Courses', href: '/courses' },
      { name: 'Top Instructors', href: '/teachers' },
      { name: 'Pricing Plans', href: '/pricing' },
      { name: 'FAQ', href: '/faq' },
    ],
    onboarding: [
      { name: 'Apply as Teacher', href: '/apply' },
      { name: 'Student Register', href: '/signup' },
      { name: 'Admin Portal', href: '/admin/login' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Settings', href: '/cookies' },
    ]
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          
          {/* Brand Info Column (Takes up 2/5 columns on large screens) */}
          <div className="md:col-span-2 space-y-4">
            <FooterLogo />
            <p className="text-sm max-w-sm leading-relaxed text-slate-400">
              An all-in-one course management platform built to streamline teacher onboarding, class scheduling, and academic progression.
            </p>
            {/* Social Media Links using Gravity UI Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-indigo-400 transition-colors" aria-label="Twitter">
                <Xmark className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors" aria-label="Facebook">
                <LogoFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Join Us */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Join Us
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.onboarding.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="mt-12 pt-8 border-t border-slate-800" />

        {/* Bottom Sub-Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-slate-500">
          <p>
            &copy; {currentYear} EduSnap Inc. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <span>EdTech Management System v1.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}