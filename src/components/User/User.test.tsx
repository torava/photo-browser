import { render, screen } from '@testing-library/react';
import { mockUser } from '@/src/utils/mocks';

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
      company: 'Company'
    };
    return translations[key] || key;
  },
}));

test('renders user', async () => {
  render(<User user={mockUser} albums={[]} />);
  expect(screen.getByText(`User name: ${mockUser.username}`)).toBeInTheDocument();
});
