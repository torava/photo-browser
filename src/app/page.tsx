import { PhotoList } from '@/src/components/PhotoList/PhotoList';
import { Suspense } from 'react';

export default async function PhotoListPage() {
  return (
    <Suspense>
      <PhotoList />
    </Suspense>
  );
}
