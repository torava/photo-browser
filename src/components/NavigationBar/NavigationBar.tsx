'use client';

import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export function NavigationBar({ title }: { title?: string }) {
  const t = useTranslations();
  return (
    <>
    <AppBar sx={{ backgroundColor: 'black' }} position="fixed">
      <Toolbar>
        <Link style={{ fontWeight: 'bold', color: 'white', textDecoration: 'none' }} href="/">
          {t('title')}
        </Link>
        {title ? (
          <>
            <Typography component="span" sx={{ m: 0.5 }}>/</Typography>
            <Typography component="span">{title}</Typography>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
    <Offset />
    </>
  );
}
