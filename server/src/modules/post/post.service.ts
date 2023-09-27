import { CreatePostInput, PostIdInput } from './post.schema';
import { prisma } from '../../lib/prisma';
import { UserIdInput } from '../user/user.schema';

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

export async function deletePost(userId: UserIdInput, postId: PostIdInput) {
  return await prisma.post.delete({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}
