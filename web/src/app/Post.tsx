import { formatDistance } from 'date-fns';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PostData } from '@/lib/types';

export function Post({ post }: { post: PostData }) {
  const {
    content,
    createdAt,
    author: { email },
  } = post;

  return (
    <Card>
      <CardContent className="pt-5">
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-slate-400">
          {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}{' '}
          by
          <span> @{email.split('@')[0]}</span>
        </p>
      </CardFooter>
    </Card>
  );
}
