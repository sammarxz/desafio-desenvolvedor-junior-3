import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { UserProvider, ThemeProvider } from "@/components/providers"
import { Navbar } from '@/components/ui/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Micro Blog',
  description: 'An simple micro blog application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} container max-w-lg px-4 mx-auto py-16`}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <Navbar />
            <main className="mt-12">
              {children}
            </main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}