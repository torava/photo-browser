import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import Link from 'next/link';

export default async function Home() {
  const photos = await fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json());
  return (
    <Grid container>
      {photos.map((photo: any) => (
        <Grid key={photo.id} size={{ xs: 12, md: 4 }}>
          <Link href={`/photo/${photo.id}`}>
            <Box
              component="img"
              src={`https://picsum.photos/1680/1050?${photo.id}`}
              alt={photo.title}
              loading="lazy"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
