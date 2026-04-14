import { render, screen } from '@testing-library/react';
import { mockAlbum, mockAlbums, mockUser } from '@/src/utils/mocks';
import * as mockRouter from 'next-router-mock';

import { User } from './User';
import { API_BASE_URL } from '@/src/utils/config';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      username: 'User name',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      website: 'Website',
      company: 'Company',
      albums: 'Albums',
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
    case `${API_BASE_URL}/users/1`: {
      return {
        ok: true,
        status: 200,
        json: async () => mockUser,
      };
    }
    case `${API_BASE_URL}/users/1/albums`: {
      return {
        ok: true,
        status: 200,
        json: async () => mockAlbums,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

// from https://www.codementor.io/@chihebnabil/complete-guide-to-mocking-fetch-in-jest-2lejnjl4bs
global.fetch = jest.fn().mockImplementation(mockFetch);

test('renders user', async () => {
  mockRouter.default.push('/?id=1');
  render(<User />);
  expect(await screen.findByText(`User name: ${mockUser.username}`)).toBeInTheDocument();
  expect(screen.getByText(`Full name: ${mockUser.name}`)).toBeInTheDocument();
  expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
  expect(
    screen.getByText(
      `${mockUser.address.street} ${mockUser.address.suite}, ${mockUser.address.zipcode} ${mockUser.address.city}`
    )
  ).toBeInTheDocument();
  expect(screen.getByText(mockUser.website)).toBeInTheDocument();
  expect(screen.getByText(`Company: ${mockUser.company.name}`)).toBeInTheDocument();
  expect(screen.getByText(`Albums:`)).toBeInTheDocument();
  expect(screen.getByText(mockAlbum.title)).toBeInTheDocument();
});
