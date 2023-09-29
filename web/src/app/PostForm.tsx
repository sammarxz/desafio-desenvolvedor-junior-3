'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPost } from '@/lib/api-requests';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MAX_CHARACTERS = 200;

const postSchema = z.object({
  content: z.string().max(MAX_CHARACTERS),
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
    const token = session.data?.user!.accessToken;
    await createPost(token!, JSON.stringify(values));

    router.refresh();
    reset(); // Limpar o campo de texto após o envio
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
