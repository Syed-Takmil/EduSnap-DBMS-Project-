// app/dashboard/layout.js
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-[#FBBF24]">EduSnap</h2>
        <nav className="flex flex-col gap-4 font-medium">
          <Link href="/dashboard" className="hover:text-[#FBBF24] transition">Overview</Link>
          <Link href="/dashboard/courses" className="hover:text-[#FBBF24] transition">My Courses</Link>
          <Link href="/dashboard/exams" className="hover:text-[#FBBF24] transition">Exams & Grades</Link>
          <Link href="/dashboard/payments" className="hover:text-[#FBBF24] transition">Payment History</Link>
        </nav>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}