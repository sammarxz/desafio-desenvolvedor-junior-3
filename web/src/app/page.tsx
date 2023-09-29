import { getServerSession } from 'next-auth';

import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/ui/navbar';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getPosts } from '@/lib/posts/posts.request';

import { PostForm } from './PostForm';
import { Post } from './Post';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const preload = () => {
  void getPosts();
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const posts = await getPosts();

  return (
    <main className="flex flex-col gap-12 py-16">
      <Navbar />
      {session?.user ? <PostForm /> : null}
      <section className="flex flex-col gap-6">
        {posts && posts.length > 0 ? (
          <>
            <Separator />
            <h1>Latest Posts</h1>
            {posts.map((post) => (
              <Post key={post.id} post={post} authorId={session?.user.id!} />
            ))}
          </>
        ) : (
          <Card className="p-4">
            <p>No posts found 😢</p>
          </Card>
        )}
      </section>
    </main>
  );
}
