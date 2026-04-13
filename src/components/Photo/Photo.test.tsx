import { render, screen } from '@testing-library/react';
import { mockPhoto } from '@/src/utils/mocks';
import { mockUser } from '@/src/utils/mocks';
import { createTheme, ThemeProvider } from '@mui/material';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/src/messages/en.json';

import { Photo } from './Photo';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      user: 'User',
    };
    return translations[key] || key;
  },
}));

const theme = createTheme();

test('renders photo', async () => {
  render(
    <ThemeProvider theme={theme}>
        <Photo photo={mockPhoto} user={mockUser} />
    </ThemeProvider>
  );
  expect(screen.getByText(mockPhoto.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(mockUser.name)).toBeInTheDocument();
});
