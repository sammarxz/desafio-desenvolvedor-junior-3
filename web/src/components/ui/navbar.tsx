'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Asterisk } from 'lucide-react';

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center">
      <Link
        href="/"
        className="font-mono font-bold text-lg flex gap-2 items-center"
      >
        <Asterisk className="text-green-400" />
        <span>wazzaapp!</span>
      </Link>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={() => signIn()}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
