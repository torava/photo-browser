import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const photo = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`).then((res) => res.json());
  return (
    <Box sx={{ height: '100%' }}>
      <Box
        component="img"
        src={`https://picsum.photos/4096/2160?${photo.id}`}
        alt={photo.title}
        sx={{ width: '100%', height: 'calc(100% - 48px)', objectFit: 'contain', verticalAlign: 'middle' }}
      />
      <Typography sx={{ textAlign: 'center', my: 1 }}>{photo.title}</Typography>
    </Box>
  );
}
