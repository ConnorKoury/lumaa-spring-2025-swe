"use client";

import './globals.css';
import NavBar from '@/app/components/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
          <NavBar />
          <main>{children}</main>
      </body>
    </html>
  );
}
