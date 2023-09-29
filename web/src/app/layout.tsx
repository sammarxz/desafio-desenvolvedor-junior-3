import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { UserProvider, ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

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
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
