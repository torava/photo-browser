'use client';

import { Link, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function Photo({ photo, user }: { photo: any; user: any }) {
  const t = useTranslations();
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // from https://stackoverflow.com/a/54841876
  useEffect(() => {
    setDescriptionHeight(ref.current?.clientHeight || 0);
  });

  useEffect(() => {
    document.title = `${photo.title} / ${t('title')}`;
  }, []);

  return (
    <Box sx={{ height: `calc(100% - ${isSm ? 56 : 64}px)` }}>
      <Box
        component="img"
        src={`https://picsum.photos/4096/2160?${photo.id}`}
        alt={photo.title}
        sx={{ width: '100%', height: `calc(100% - ${descriptionHeight}px - 16px)`, objectFit: 'contain', verticalAlign: 'middle' }}
      />
      <Typography ref={ref} sx={{ textAlign: 'center', my: 1 }}>
        {photo.title} ({t('user')}:{' '}
        <Link component={NextLink} href={`/user/${user.id}`}>
          {user.name}
        </Link>
        )
      </Typography>
    </Box>
  );
}
