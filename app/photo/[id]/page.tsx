import { Photo } from '@/components/Photo/Photo';
import { API_BASE_URL } from '@/utils/config';

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await fetch(`${API_BASE_URL}/photos/${id}`).then((res) => res.json());
  const album = await fetch(`${API_BASE_URL}/albums/${photo.albumId}`).then((res) => res.json());
  const user = await fetch(`${API_BASE_URL}/users/${album.userId}`).then((res) => res.json());
  return <Photo photo={photo} user={user} />;
}
