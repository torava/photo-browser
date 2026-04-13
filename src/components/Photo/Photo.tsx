'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useT } from 'next-i18next/client';

export function Photo({ photo, user }: { photo: any; user: any }) {
    const { t } = useT();
  return (
    <Box sx={{ height: '100%' }}>
      <Box
        component="img"
        src={`https://picsum.photos/4096/2160?${photo.id}`}
        alt={photo.title}
        sx={{ width: '100%', height: 'calc(100% - 48px)', objectFit: 'contain', verticalAlign: 'middle' }}
      />
      <Typography sx={{ textAlign: 'center', my: 1 }}>{photo.title} ({t('user')}: {user.name})</Typography>
    </Box>
  );
}
