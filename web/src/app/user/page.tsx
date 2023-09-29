import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Card } from '@/components/ui/card';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserForm } from './form';

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect('/');
  }

  return (
    <Card className="w-[350px]">
      <UserForm />
    </Card>
  );
}
