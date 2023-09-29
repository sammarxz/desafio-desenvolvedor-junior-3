import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { UserProvider, ThemeProvider } from '@/components/providers';
import { Navbar } from '@/components/ui/navbar';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Micro Blog',
  description: 'An simple micro blog application',
};

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} container max-w-lg px-4 mx-auto`}>
        <ThemeProvider>
          <UserProvider>
            {props.children}
            {props.modal}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
