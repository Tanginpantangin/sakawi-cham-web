import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sakawi shell with required public links', () => {
  render(<App />);

  expect(screen.getAllByRole('link', { name: /sakawi/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Quyền riêng tư/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Hỗ trợ/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Phát hành/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Google Play/i })[0]).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.sakawi.cham&hl=vi'
  );
});
