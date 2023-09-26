import bcrypt from 'bcrypt';

import { CreateUserInput } from './user.schema';
import { prisma } from '@/lib/prisma';

export async function createUser(data: CreateUserInput) {
  const { password, ...rest } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('This email is already in use.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });

  return newUser;
}
