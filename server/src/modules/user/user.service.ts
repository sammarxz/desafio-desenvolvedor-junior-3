import bcrypt from 'bcrypt';

import { CreateUserInput } from './user.schema';
import { prisma } from '../../lib/prisma';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(data: CreateUserInput) {
  const { password, ...rest } = data;

  const existingUser = await findUserByEmail(data.email);

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
