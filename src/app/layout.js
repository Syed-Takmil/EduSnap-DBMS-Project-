import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/shared/NavBar";
import Footer from "@/Components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduSnap",
  description: "Ed-Tech Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`light ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full   bg-slate-50 text-slate-900 antialiased   flex flex-col">
        <NavBar/>
       <main className="flex-1">
         {children}
       </main>
       <Footer/>
        </body>
    </html>
  );
}
