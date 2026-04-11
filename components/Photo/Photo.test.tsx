import { prettyDOM, render, screen } from '@testing-library/react';

import { Photo } from './Photo';

const mockPhoto = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952',
};

test('renders photo', async () => {
  render(<Photo photo={mockPhoto} />);
  screen.getByText(mockPhoto.title);
});
