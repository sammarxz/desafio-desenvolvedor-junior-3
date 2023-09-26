import { hashPassword } from '@/utils/hash';
import { CreateUserInput } from './user.schema';
import { prisma } from '@/lib/prisma';

export async function createUser(data: CreateUserInput) {
  const { password, ...rest } = data;

  const { hash } = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
    },
  });

  return user;
}
