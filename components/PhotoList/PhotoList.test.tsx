import { render, screen } from '@testing-library/react';

import { PhotoList } from './PhotoList';

const mockPhotos = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
];

test('renders photo list', async () => {
  render(<PhotoList photos={mockPhotos} />);
  expect(screen.getByAltText(mockPhotos[0].title)).toBeInTheDocument();
});
