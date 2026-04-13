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

const mockUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

test('has alt text', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos$/, {
    body: mockPhotos,
  });

  await page.goto('http://localhost:3000');

  await expect(page.getByAltText(mockPhotos[0].title)).toBeVisible();
});

test('has description', async ({ page, mockServerRequest }) => {
  await mockServerRequest.GET(/.*\/photos$/, {
    body: mockPhotos[0],
  });

  await page.goto('http://localhost:3000/photo/1');

  await expect(page.getByText(`${mockPhotos[0].title} (User: ${mockUser.name})`, { exact: true })).toBeVisible();
});
