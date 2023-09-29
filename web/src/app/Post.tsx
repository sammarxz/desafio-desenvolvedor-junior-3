'use client';

import React, { useState } from 'react';
import { formatDistance } from 'date-fns';
import { PencilLine, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { type PostData } from '@/lib/posts/post.types';
import { deletePost, updatePost } from '@/lib/posts/posts.request';

export function Post({ post, authorId }: { post: PostData; authorId: string }) {
  const {
    content,
    createdAt,
    author: { id, email },
  } = post;

  const { data: sessionData } = useSession();
  const router = useRouter();

  const [postContent, setPostContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeletePost = async (postId: string) => {
    const accessToken = sessionData?.user.accessToken;
    if (accessToken) {
      await deletePost(accessToken, postId);
      router.refresh();
    }
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedContent = {
      content: postContent,
    };

    const accessToken = sessionData?.user.accessToken;
    if (accessToken) {
      try {
        await updatePost(accessToken, post.id, JSON.stringify(updatedContent));
        setIsEditing(false);
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {isEditing ? (
          <form onSubmit={handleUpdatePost}>
            <Input
              defaultValue={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
          </form>
        ) : (
          <p>{content}</p>
        )}
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
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsEditing((prevState) => !prevState)}
            >
              <PencilLine size="14" className="text-slate-400" />
            </Button>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
