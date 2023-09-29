'use client';

import { formatDistance } from 'date-fns';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { PostData } from '@/lib/types';
import { PencilLine, Trash } from 'lucide-react';
import { deletePost } from '@/lib/api-requests';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Post({ post, authorId }: { post: PostData; authorId: string }) {
  const {
    content,
    createdAt,
    author: { id, email },
  } = post;
  const session = useSession();
  const router = useRouter();

  async function handleDeletePost(id: string) {
    await deletePost(session.data?.user.accessToken!, post.id);
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="pt-5">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-slate-400">
          {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}{' '}
          by
          <span> @{email.split('@')[0]}</span>
        </p>
        {authorId === id ? (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => handleDeletePost(post.id)}
            >
              <Trash size="14" className="text-red-400" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <PencilLine size="14" className="text-slate-400" />
            </Button>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
