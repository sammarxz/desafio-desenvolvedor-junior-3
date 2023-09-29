import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Card } from '@/components/ui/card';

import { UserForm } from './form';

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    return redirect('/');
  }

  return (
    <Card className="w-[350px]">
      <UserForm />
    </Card>
  );
}
