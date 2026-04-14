import { expect } from '@playwright/test';

import { test } from './fixtures';
import { mockPhoto, mockPhotos } from './mocks';

test('has alt text', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos$/, {
    body: mockPhotos,
  });

  await page.goto('/');

  await expect(page.getByAltText(mockPhoto.title)).toBeVisible();
});
