import { CreatePostInput } from './post.schema';
import { prisma } from '../../lib/prisma';

export async function createPost(data: CreatePostInput) {
  return await prisma.post.create({
    data,
  });
}
