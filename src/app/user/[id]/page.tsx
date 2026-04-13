import { NavigationBar } from '@/src/components/NavigationBar/NavigationBar';
import { User } from '@/src/components/User/User';
import { API_BASE_URL } from '@/src/utils/config';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations();
  const user = await fetch(`${API_BASE_URL}/users/${id}`).then((res) => res.json());
  const albums = await fetch(`${API_BASE_URL}/users/${id}/albums`).then((res) => res.json());
  if (!user.username) notFound();
  return (
    <>
      <NavigationBar title={`${t('user')}: ${user.name}`} />
      <User user={user} albums={albums} />
    </>
  );
}
