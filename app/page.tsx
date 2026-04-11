import { PhotoList } from '@/components/PhotoList/PhotoList';

export default async function Home() {
  const photos = await fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json());
  return <PhotoList photos={photos} />;
}
