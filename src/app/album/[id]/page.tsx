import { NavigationBar } from '@/src/components/NavigationBar/NavigationBar';
import { PhotoList } from '@/src/components/PhotoList/PhotoList';
import { API_BASE_URL } from '@/src/utils/config';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function PhotoListPage({ params }: PageProps<'/album/[id]'>) {
  const t = await getTranslations();
  const { id } = await params;
  const album = await fetch(`${API_BASE_URL}/albums/${id}`).then((res) => res.json());
  if (!album.title) notFound();
  return (
    <>
      <NavigationBar title={`${t('album')}: ${album.title}`} />
      <PhotoList path={`/albums/${id}/photos`} album={album} />;
    </>
  );
}
