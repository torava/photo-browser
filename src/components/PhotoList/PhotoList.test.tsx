import { render, screen } from '@testing-library/react';
import { mockPhoto, mockPhotos } from '@/src/utils/mocks';
import * as mockRouter from 'next-router-mock';

import { PhotoList } from './PhotoList';
import { API_BASE_URL } from '@/src/utils/config';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return key;
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
		case `${API_BASE_URL}/photos?_page=1&_limit=100`: {
			return {
				ok: true,
				status: 200,
				json: async () => mockPhotos,
			};
		}
		default: {
			throw new Error(`Unhandled request: ${url}`)
		}
	}
}

// from https://www.codementor.io/@chihebnabil/complete-guide-to-mocking-fetch-in-jest-2lejnjl4bs
global.fetch = jest.fn().mockImplementation(mockFetch);

test('renders photo list', async () => {
  render(<PhotoList />);
  expect(await screen.findByAltText(mockPhoto.title)).toBeInTheDocument();
});
