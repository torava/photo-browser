'use client';

import { API_BASE_URL } from '@/src/utils/config';
import { Link, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function Photo() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const t = useTranslations();
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [photo, setPhoto] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchPhoto = async () => {
      setPhoto(await fetch(`${API_BASE_URL}/photos/${id}`).then((res) => res.json()));
    };
    fetchPhoto();
  }, []);

  useEffect(() => {
    if (photo) {
      const fetchUser = async () => {
        const album = await fetch(`${API_BASE_URL}/albums/${photo.albumId}`).then((res) => res.json());
        setUser(await fetch(`${API_BASE_URL}/users/${album.userId}`).then((res) => res.json()));
      };
      fetchUser();
    }
  });

  // from https://stackoverflow.com/a/54841876
  useEffect(() => {
    setDescriptionHeight(ref.current?.clientHeight || 0);
  });

  useEffect(() => {
    document.title = `${photo?.title} / ${t('title')}`;
  }, [photo]);

  return (
    <Box sx={{ height: `calc(100% - ${isSm ? 56 : 64}px)` }}>
      <Box
        component="img"
        src={`https://picsum.photos/4096/2160?${photo?.id}`}
        alt={photo?.title}
        sx={{
          width: '100%',
          height: `calc(100% - ${descriptionHeight}px - 16px)`,
          objectFit: 'contain',
          verticalAlign: 'middle',
        }}
      />
      {photo?.title && user?.name && (
        <Typography ref={ref} sx={{ textAlign: 'center', my: 1 }}>
          {photo.title} ({t('user')}:{' '}
          <Link component={NextLink} href={`/user?id=${user?.id}`}>
            {user.name}
          </Link>
          )
        </Typography>
      )}
    </Box>
  );
}
