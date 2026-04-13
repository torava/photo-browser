import fetchMock from 'fetch-mock';
import { render, screen } from '@testing-library/react';

import { PhotoList } from './PhotoList';
import { mockPhotos } from '@/src/utils/mocks';

// from https://kentcdodds.com/blog/stop-mocking-fetch
async function mockFetch(url: string) {
	switch (url) {
		case 'https://jsonplaceholder.typicode.com/photos?_page=1&_limit=100': {
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

beforeAll(() => jest.spyOn(window, 'fetch'))
beforeEach(() => (window.fetch as jest.Mock).mockImplementation(mockFetch))

test('renders photo list', async () => {
  render(<PhotoList />);
  expect(await screen.findByAltText(mockPhotos[0].title)).toBeInTheDocument();
});
