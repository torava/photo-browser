import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

export default async function Home() {
  const photos = await fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json());
  return (
    <Grid container>
      {photos.map((photo: any) => (
        <Grid key={photo.id} size={{ xs: 12, md: 4 }}>
          <Box
            component="img"
            src={`https://picsum.photos/400/300?${photo.id}`}
            alt={photo.title}
            loading="lazy"
            sx={{ minHeight: '100%', width: '100%' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
