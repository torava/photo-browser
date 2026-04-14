'use client';

import { API_BASE_URL, PHOTOS_PER_PAGE } from '@/src/utils/config';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import { useSearchParams } from 'next/navigation';

export function PhotoList({ isAlbum }: { isAlbum?: boolean }) {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [album, setAlbum] = useState<any>();
  const t = useTranslations();
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const path = isAlbum ? `/albums/${id}/photos` : '/photos';

  useEffect(() => {
    async function fetchAlbum() {
      try {
        setAlbum(await fetch(`${API_BASE_URL}/albums/${id}`).then((res) => res.json()));
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchPhotos() {
      try {
        setPhotos(
          await fetch(`${API_BASE_URL}${path}?_page=1&_limit=${PHOTOS_PER_PAGE}`).then((res) =>
            res.json()
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
    if (isAlbum) fetchAlbum();
    fetchPhotos();
  }, []);

  const fetchNextPage = async () => {
    if (!allLoaded) {
      try {
        const newPhotos = await fetch(
          `${API_BASE_URL}${path}?_page=${page + 1}&_limit=${PHOTOS_PER_PAGE}`
        ).then((res) => res.json());
        if (newPhotos.length) {
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
          setPage(page + 1);
        } else {
          setAllLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchNextPage();
    }
  }, [loading]);

  const onScroll = () => {
    if (window.pageYOffset > window.document.body.scrollHeight / 2 && !loading) {
      setLoading(true);
    }
  };

  useEffect(() => {
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (album) {
      document.title = `${album.title} / ${t('title')}`;
    }
  }, []);

  return (
    <>
      <NavigationBar title={album?.title && `${t('album')}: ${album.title}`} />
      <Grid container>
        {photos.map((photo: any) => (
          <Grid key={photo.id} size={{ xs: 12, md: 4 }}>
            <Link href={`/photo?id=${photo.id}`}>
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
      {loading && !allLoaded && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
