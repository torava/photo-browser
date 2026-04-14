import { render, screen } from '@testing-library/react';
import { mockAlbum, mockPhoto } from '@/src/utils/mocks';
import { mockUser } from '@/src/utils/mocks';
import { createTheme, ThemeProvider } from '@mui/material';
import * as mockRouter from 'next-router-mock';

import { Photo } from './Photo';
import { API_BASE_URL } from '@/src/utils/config';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      user: 'User',
    };
    return translations[key] || key;
  },
}));

const useRouter = mockRouter.useRouter;

jest.mock('next/navigation', () => ({
  ...mockRouter,
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    return new URLSearchParams(path as never);
  },
}));

// from https://kentcdodds.com/blog/stop-mocking-fetch
async function mockFetch(url: string) {
  switch (url) {
    case `${API_BASE_URL}/photos/1`: {
      return {
        ok: true,
        status: 200,
        json: async () => mockPhoto,
      };
    }
    case `${API_BASE_URL}/users/1`: {
      return {
        ok: true,
        status: 200,
        json: async () => mockUser,
      };
    }
    case `${API_BASE_URL}/albums/1`: {
      return {
        ok: true,
        status: 200,
        json: async () => mockAlbum,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

// from https://www.codementor.io/@chihebnabil/complete-guide-to-mocking-fetch-in-jest-2lejnjl4bs
global.fetch = jest.fn().mockImplementation(mockFetch);

const theme = createTheme();

test('renders photo', async () => {
  mockRouter.default.push('/?id=1');
  render(
    <ThemeProvider theme={theme}>
        <Photo />
    </ThemeProvider>
  );
  expect(await screen.findByText(mockPhoto.title, { exact: false })).toBeInTheDocument();
  expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
});
