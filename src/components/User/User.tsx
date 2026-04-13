import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export function User({ user }: { user: any }) {
  const t = useTranslations('User');
  return (
    <Box sx={{ p: 1 }}>
      <Typography>{t('username')}: {user.username}</Typography>
      <Typography>{t('name')}: {user.name}</Typography>
      <Typography>{t('email')}: {user.email}</Typography>
      <Typography>{t('phone')}: {user.phone}</Typography>
      <Typography>
        {t('address')}: {user.address.street} {user.address.suite}, {user.address.zipcode} {user.address.city}
      </Typography>
      <Typography>{t('website')}: {user.website}</Typography>
      <Typography>{t('company')}: {user.company.name}</Typography>
    </Box>
  );
}
