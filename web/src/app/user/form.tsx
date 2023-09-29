'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';

type FormModeType = 'signIn' | 'signUp';

const formSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required'),
});

export function UserForm() {
  const [mode, setMode] = React.useState<FormModeType>('signIn');

  const userForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function registerUser() {}

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === 'signIn') {
      return await signIn('credentials', {
        ...values,
        redirect: true,
        callbackUrl: '/',
      });
    }

    // return registerUser(values)
  }

  return (
    <>
      <Form {...userForm}>
        <form onSubmit={userForm.handleSubmit(onSubmit)} className="">
          <CardContent className="pt-6">
            <div className="grid w-full items-center gap-4">
              <FormField
                name="email"
                control={userForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@provider.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={userForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      <CardFooter className="flex justify-center gap-1">
        <span className="text-sm text-slate-400">
          {mode === 'signIn'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </span>
        <Button
          variant="link"
          className="p-0"
          onClick={() =>
            setMode((prevMode) => (prevMode === 'signIn' ? 'signUp' : 'signIn'))
          }
        >
          {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
        </Button>
      </CardFooter>
    </>
  );
}
