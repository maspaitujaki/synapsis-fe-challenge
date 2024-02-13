import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meidum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white text-slate-900 ${inter.className}`}>
        <header className="bg-zinc-800 text-white">
          <div className="max-w-6xl mx-auto p-8">
            <nav className="flex justify-between ml-auto text-sm font-medium">
              <Link href="/">
                <Image 
                  src="/meidum-logo.svg"
                  alt="Meidum Logo"
                  className=""
                  width={150}
                  height={150}
                />
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/">Home</Link>
                <Link href="/users">
                  Users
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <div className="max-w-6xl mx-auto py-4 px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
