import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sakawi shell with required public links', () => {
  render(<App />);
  expect(screen.getAllByText(/SAKAWI/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: /Chính sách quyền riêng tư/i })).toHaveAttribute('href', '/privacy');
  expect(screen.getByRole('link', { name: /Hỗ trợ/i })).toHaveAttribute('href', '/support');
  expect(screen.getByRole('link', { name: /Google Play/i })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.sakawi.cham'
  );
});
