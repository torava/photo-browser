'use client';

import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PHOTOS_PER_PAGE = 100;

export function PhotoList() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      setPhotos(
        await fetch(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=${PHOTOS_PER_PAGE}`).then((res) =>
          res.json()
        )
      );
    }
    fetchPhotos();
  }, []);

  const fetchNextPage = async () => {
    if (!allLoaded) {
      const newPhotos = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${photos.length / PHOTOS_PER_PAGE + 1}&_limit=${PHOTOS_PER_PAGE}`
      ).then((res) => res.json());
      if (newPhotos.length) {
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      } else {
        setAllLoaded(true);
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

  return (
    <>
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
      {loading && !allLoaded && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
