import { CreatePostInput } from './post.schema';
import { prisma } from '../../lib/prisma';

export async function createPost(data: CreatePostInput) {
  return await prisma.post.create({
    data,
  });
}

export async function getPosts() {
  return await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
}
