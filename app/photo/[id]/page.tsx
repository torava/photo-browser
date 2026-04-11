import { Photo } from '@/components/Photo/Photo';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Photo id={id} />;
}
