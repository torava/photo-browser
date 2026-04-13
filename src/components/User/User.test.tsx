import { render, screen } from '@testing-library/react';
import { mockAlbum, mockAlbums, mockUser } from '@/src/utils/mocks';

import { User } from './User';

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
      albums: 'Albums'
    };
    return translations[key] || key;
  },
}));

test('renders user', async () => {
  render(<User user={mockUser} albums={mockAlbums} />);
  expect(screen.getByText(`User name: ${mockUser.username}`)).toBeInTheDocument();
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
