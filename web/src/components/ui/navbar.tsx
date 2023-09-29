'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center">
      <Link href="/" className="font-mono font-bold text-lg">
        /wazzaapp!
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
