import { expect } from '@playwright/test';

import { test } from './fixtures';

const mockPhotos = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
];

test('has alt text', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos$/, {
    body: mockPhotos,
  });

  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page.getByAltText(mockPhotos[0].title)).toBeVisible();
});
