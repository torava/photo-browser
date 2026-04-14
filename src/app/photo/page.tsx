import { Photo } from '@/src/components/Photo/Photo';
import { NavigationBar } from '@/src/components/NavigationBar/NavigationBar';
import { Suspense } from 'react';

export default async function PhotoPage() {
  return (
    <Suspense>
      <Photo />
    </Suspense>
  );
}
