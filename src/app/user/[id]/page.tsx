import { User } from '@/src/components/User/User';
import { API_BASE_URL } from '@/src/utils/config';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await fetch(`${API_BASE_URL}/users/${id}`).then((res) => res.json());
  return <User user={user} />;
}
