'use client';

import { Box, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useEffect } from 'react';

export function User({ user, albums }: { user: any; albums: any[] }) {
  const tCommon = useTranslations();
  const t = useTranslations('User');
  useEffect(() => {
    document.title = `${user.name} / ${tCommon('title')}`;
  }, []);
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography>
          {t('username')}: {user.username}
        </Typography>
        <Typography>
          {t('name')}: {user.name}
        </Typography>
        <Typography>
          {t('email')}: <Link component={NextLink} href={`mailto:${user.email}`}>{user.email}</Link>
        </Typography>
        <Typography>
          {t('phone')}: <Link component={NextLink} href={`tel:${user.phone}`}>{user.phone}</Link>
        </Typography>
        <Typography>
          {t('address')}: <Link href={`https://www.google.com/maps/search/${encodeURIComponent(`${user.address.street} ${user.address.suite}, ${user.address.zipcode} ${user.address.city}`)}`} target="_blank">
            {user.address.street} {user.address.suite}, {user.address.zipcode} {user.address.city}
          </Link>
        </Typography>
        <Typography>
          {t('website')}: <Link href={user.website} target="_blank">
            {user.website}
          </Link>
        </Typography>
        <Typography>
          {t('company')}: {user.company.name}
        </Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography>{t('albums')}:</Typography>
        <Box component="ul">
          {albums.map((album) => (
            <Typography component="li" key={album.id}>
              <Link component={NextLink} href={`/album/${album.id}`}>
                {album.title}
              </Link>
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
}
