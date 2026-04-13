import { notFound } from 'next/navigation';
import { Photo } from '@/src/components/Photo/Photo';
import { API_BASE_URL } from '@/src/utils/config';
import { NavigationBar } from '@/src/components/NavigationBar/NavigationBar';

export default async function PhotoPage({ params }: PageProps<'/photo/[id]'>) {
  const { id } = await params;
  const photo = await fetch(`${API_BASE_URL}/photos/${id}`).then((res) => res.json());
  const album = await fetch(`${API_BASE_URL}/albums/${photo.albumId}`).then((res) => res.json());
  const user = await fetch(`${API_BASE_URL}/users/${album.userId}`).then((res) => res.json());
  return (
    <>
      <NavigationBar />
      <Photo photo={photo} user={user} />
    </>
  );
}
