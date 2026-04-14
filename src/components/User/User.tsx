'use client';

import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import { notFound, useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/src/utils/config';

export function User() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const tCommon = useTranslations();
  const t = useTranslations('User');
  const [user, setUser] = useState<any>();
  const [albums, setAlbums] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      const user = await fetch(`${API_BASE_URL}/users/${id}`).then((res) => res.json());
      if (user?.name) setUser(user);
      else notFound();
      setAlbums(await fetch(`${API_BASE_URL}/users/${id}/albums`).then((res) => res.json()));
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (user) {
      document.title = `${user.name} / ${tCommon('title')}`;
    }
  }, [user]);
  return (
    <>
      <NavigationBar title={user?.name && `${tCommon('user')}: ${user.name}`} />
      <Box sx={{ p: 1 }}>
        <Typography>
          {t('username')}: {user?.username}
        </Typography>
        <Typography>
          {t('name')}: {user?.name}
        </Typography>
        <Typography>
          {t('email')}: <Link component={NextLink} href={`mailto:${user?.email}`}>{user?.email}</Link>
        </Typography>
        <Typography>
          {t('phone')}: <Link component={NextLink} href={`tel:${user?.phone}`}>{user?.phone}</Link>
        </Typography>
        <Typography>
          {t('address')}: <Link href={`https://www.google.com/maps/search/${encodeURIComponent(`${user?.address.street} ${user?.address.suite}, ${user?.address.zipcode} ${user?.address.city}`)}`} target="_blank">
            {user?.address.street} {user?.address.suite}, {user?.address.zipcode} {user?.address.city}
          </Link>
        </Typography>
        <Typography>
          {t('website')}: <Link href={user?.website} target="_blank">
            {user?.website}
          </Link>
        </Typography>
        <Typography>
          {t('company')}: {user?.company.name}
        </Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography>{t('albums')}:</Typography>
        <Box component="ul">
          {albums.map((album) => (
            <Typography component="li" key={album.id}>
              <Link component={NextLink} href={`/album?id=${album.id}`}>
                {album.title}
              </Link>
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
}
