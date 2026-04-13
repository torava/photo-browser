import { render, screen } from '@testing-library/react';
import { mockPhoto } from '@/src/utils/mocks';
import { mockUser } from '@/src/utils/mocks';

import { Photo } from './Photo';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      user: 'User',
    };
    return translations[key] || key;
  },
}));

test('renders photo', async () => {
  render(<Photo photo={mockPhoto} user={mockUser} />);
  expect(screen.getByText(`${mockPhoto.title} (User: ${mockUser.name})`)).toBeInTheDocument();
});
