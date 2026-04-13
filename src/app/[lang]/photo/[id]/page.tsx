import { notFound } from 'next/navigation';
import { Photo } from '@/src/components/Photo/Photo';
import { API_BASE_URL } from '@/src/utils/config';
import { getDictionary, hasLocale } from '@/src/app/[lang]/dictionaries';

export default async function PhotoPage({ params }: PageProps<'/[lang]/photo/[id]'> & { params: Promise<{ id: string }> }) {
  const { id, lang } = await params;
  const photo = await fetch(`${API_BASE_URL}/photos/${id}`).then((res) => res.json());
  const album = await fetch(`${API_BASE_URL}/albums/${photo.albumId}`).then((res) => res.json());
  const user = await fetch(`${API_BASE_URL}/users/${album.userId}`).then((res) => res.json());

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <Photo dict={dict} photo={photo} user={user} />;
}
