import { CreatePostInput, PostIdInput, UpdatePostInput } from './post.schema';

import { prisma } from '../../lib/prisma';

import { UserIdInput } from '../user/user.schema';

export async function createPost(userId: UserIdInput, data: CreatePostInput) {
  return await prisma.post.create({
    data: {
      authorId: userId,
      ...data,
    },
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
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getPostById(userId: UserIdInput, postId: PostIdInput) {
  return await prisma.post.findUnique({
    where: {
      id: postId.postId,
      authorId: userId,
    },
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

export async function deletePost(userId: UserIdInput, postId: PostIdInput) {
  return await prisma.post.delete({
    where: {
      id: postId.postId,
      authorId: userId,
    },
  });
}

export async function updatePost(
  userId: UserIdInput,
  postId: PostIdInput,
  data: UpdatePostInput
) {
  return await prisma.post.update({
    where: {
      id: postId.postId,
      authorId: userId,
    },
    data,
  });
}
