import { User } from '@/src/components/User/User';
import { Suspense } from 'react';

export default async function UserPage() {
  return (
    <Suspense>
      <User />
    </Suspense>
  );
}
