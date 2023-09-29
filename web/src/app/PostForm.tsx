'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { createPost } from '@/lib/posts/posts.request';

const MAX_CHARACTERS = 200;

export const postSchema = z.object({
  content: z
    .string()
    .min(2)
    .max(MAX_CHARACTERS)
    .nonempty('Content is required'),
});

export function PostForm() {
  const router = useRouter();
  const [charactersCount, setCharactersCount] = React.useState(0);
  const session = useSession();
  const { control, handleSubmit, formState, reset } = useForm<
    z.infer<typeof postSchema>
  >({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    const accessToken = session.data?.user!.accessToken;
    await createPost(accessToken!, JSON.stringify(values));

    router.refresh();
    reset();
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setCharactersCount(text.length);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            onChange={(e) => {
              handleChange(e);
              field.onChange(e);
            }}
            placeholder="What's happening bro?"
            maxLength={MAX_CHARACTERS}
          />
        )}
      />
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">
          {MAX_CHARACTERS - charactersCount} characters left
        </p>
        <Button type="submit" disabled={!formState.isValid}>
          Create Post
        </Button>
      </div>
    </form>
  );
}
