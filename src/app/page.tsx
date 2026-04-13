import { PhotoList } from '@/src/components/PhotoList/PhotoList';
import { NavigationBar } from '@/src/components/NavigationBar/NavigationBar';

export default async function PhotoListPage() {
  return (
    <>
      <NavigationBar />
      <PhotoList />
    </>
  );
}
