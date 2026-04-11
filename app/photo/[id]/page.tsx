import { Photo } from '@/components/Photo/Photo';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`).then((res) => res.json());
  return <Photo photo={photo} />;
}
