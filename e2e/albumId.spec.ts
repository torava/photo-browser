import { expect } from '@playwright/test';

import { test } from './fixtures';
import { mockAlbum, mockAlbums, mockPhoto, mockPhotos } from './mocks';

test('has title', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos$/, {
    body: mockPhotos,
  });
  await mockServerRequest.GET(/.*\/albums$/, {
    body: mockAlbums,
  });

  await page.goto('/album?id=1');

  await expect(page.getByText(`Album: ${mockAlbum.title}`)).toBeVisible();
});

test('has alt text', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos$/, {
    body: mockPhotos,
  });
  await mockServerRequest.GET(/.*\/albums$/, {
    body: mockAlbums,
  });

  await page.goto('/album?id=1');

  await expect(page.getByAltText(mockPhoto.title)).toBeVisible();
});
