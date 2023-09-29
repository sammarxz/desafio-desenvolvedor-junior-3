'use client';

import * as React from 'react';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
import { useToast } from '@/components/ui/use-toast';
import { UserCredentials } from '@/lib/types';
import { apiRegisterUser } from '@/lib/api-requests';

type FormModeType = 'signIn' | 'signUp';

const formSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required'),
});

export function UserForm() {
  const [mode, setMode] = React.useState<FormModeType>('signIn');
  const { toast } = useToast();
  const router = useRouter();

  const userForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function loginUser(values: UserCredentials) {
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/',
    });

    if (response?.error) {
      return toast({
        variant: 'destructive',
        title: 'Ops! Error',
        description: response.error,
      });
    }
  }

  async function registerUser(values: UserCredentials) {
    try {
      const user = await apiRegisterUser(JSON.stringify(values));
      toast({
        title: 'Success',
        description: 'User created successfully',
      });
      // auto login
      await loginUser({
        email: user.email,
        password: values.password,
      });
      return router.push('/');
    } catch (error: any) {
      userForm.setError('email', {
        message: error.message,
      });
      // return toast({
      //   variant: 'destructive',
      //   title: 'Ops! Error',
      //   description: error.message,
      // });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === 'signIn') {
      loginUser(values);
      return router.push('/');
    }

    registerUser(values);
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
