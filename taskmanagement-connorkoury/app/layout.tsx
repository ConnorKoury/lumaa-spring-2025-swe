"use client";

import './globals.css';
import { SessionProvider } from 'next-auth/react';
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
        <SessionProvider>
          <NavBar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
