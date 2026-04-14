import { expect } from '@playwright/test';

import { test } from './fixtures';
import { mockPhoto, mockUser } from "./mocks";

test('has description', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos/, {
    body: mockPhoto,
  });

  await page.goto('/photo?id=1');

  await expect(page.getByText(`${mockPhoto.title} (User: ${ mockUser.name})`, { exact: true })).toBeVisible();
});
