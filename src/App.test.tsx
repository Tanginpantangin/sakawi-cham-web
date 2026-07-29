import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { languageStorageKey, resolveBrowserLanguage } from './i18n';
import { siteCopy } from './siteContent';

jest.setTimeout(20000);

const flattenShape = (value: unknown, prefix = ''): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenShape(item, `${prefix}[${index}]`));
  }

  if (!value || typeof value !== 'object') {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(child)) {
      if (child.every((item) => typeof item === 'string')) {
        return [nextPrefix];
      }

      return flattenShape(child, nextPrefix);
    }

    if (typeof child === 'object') {
      return flattenShape(child, nextPrefix);
    }

    return [nextPrefix];
  });
};

beforeEach(() => {
  window.localStorage.clear();
  window.location.hash = '#/';
  document.documentElement.lang = '';
});

test('root redirects to calendar and renders required public links', async () => {
  render(<App />);

  expect(document.documentElement.lang).toBe('vi');
  await waitFor(() => expect(window.location.hash).toBe('#/calendar'));
  expect(await screen.findByRole('heading', { name: /Lịch tháng/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /sakawi/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Lịch tháng/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Sự kiện/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Tài liệu/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Giới thiệu/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Chính sách riêng tư/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Hỗ trợ/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Phiên bản/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Google Play/i })[0]).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.sakawi.cham&hl=vi'
  );
});

test('restores saved English language and updates html lang', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');

  render(<App />);

  expect(document.documentElement.lang).toBe('en');
  expect(screen.getAllByRole('link', { name: /Monthly Calendar/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Events/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Documents/i }).length).toBeGreaterThan(0);
  expect(await screen.findByRole('heading', { name: /Monthly Calendar/i })).toBeInTheDocument();
});

test('switches language without leaving the current route', async () => {
  window.location.hash = '#/support';
  render(<App />);

  expect(screen.getByRole('heading', { name: /Hỗ trợ/i })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: /English/i })[0]);

  await waitFor(() => expect(screen.getByRole('heading', { name: /Support/i })).toBeInTheDocument());
  expect(window.location.hash).toBe('#/support');
  expect(window.localStorage.getItem(languageStorageKey)).toBe('en');
  expect(document.documentElement.lang).toBe('en');
});

test('documents route does not reset language and avoids untranslated English detail bodies', () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/documents/calendar-rules';

  render(<App />);

  expect(document.documentElement.lang).toBe('en');
  expect(screen.getByRole('heading', { name: /Month and year rules/i })).toBeInTheDocument();
  expect(screen.getByText(/Approved detailed website body copy is not available/i)).toBeInTheDocument();
});

test('about route keeps the product introduction available', () => {
  window.location.hash = '#/about';

  render(<App />);

  expect(screen.getByRole('heading', { name: /Sakawi/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^Xem Lịch tháng$/i })).toHaveAttribute('href', '#/calendar');
  expect(screen.getByRole('link', { name: /^Xem Sự kiện sắp tới$/i })).toHaveAttribute('href', '#/events');
});

test('calendar route opens a linked date and exposes month controls', async () => {
  window.location.hash = '#/calendar?date=2026-07-29';

  render(<App />);

  expect(await screen.findByRole('heading', { name: /Lịch tháng/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Chi tiết ngày/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Tháng trước/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Tháng sau/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Hôm nay/i })).toBeInTheDocument();
});

test('events route can show all events and link back to the monthly calendar', async () => {
  window.location.hash = '#/events';

  render(<App />);

  expect(await screen.findByRole('heading', { name: /^Sự kiện$/i })).toBeInTheDocument();
  fireEvent.click(await screen.findByRole('button', { name: /Tất cả/i }));

  const calendarLinks = await screen.findAllByRole('link', { name: /Mở trong Lịch tháng/i });
  fireEvent.click(calendarLinks[0]);

  await waitFor(() => expect(window.location.hash).toMatch(/^#\/calendar\?date=\d{4}-\d{2}-\d{2}$/));
});

test('unsupported browser languages fall back safely to Vietnamese', () => {
  expect(resolveBrowserLanguage('fr-FR')).toBe('vi');
  expect(resolveBrowserLanguage('en-US')).toBe('en');
  expect(resolveBrowserLanguage('vi-VN')).toBe('vi');
});

test('Vietnamese and English translation structures stay aligned', () => {
  expect(flattenShape(siteCopy.vi).sort()).toEqual(flattenShape(siteCopy.en).sort());
});
