import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { languageStorageKey, resolveBrowserLanguage } from './i18n';
import { siteCopy, supportEmail } from './siteContent';

jest.setTimeout(60000);

jest.mock('./utils/today', () => ({
  getToday: () => new Date(2026, 6, 29, 12, 0, 0)
}));

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
  expect(await screen.findByRole('radio', { name: /Sakawi Ninh/i })).toBeInTheDocument();
  expect(document.querySelectorAll('a[href="#/calendar"]').length).toBeGreaterThan(0);
  expect(document.querySelectorAll('a[href="#/events"]').length).toBeGreaterThan(0);
  expect(document.querySelectorAll('a[href="#/documents"]').length).toBeGreaterThan(0);
  expect(document.querySelectorAll('a[href="#/about"]').length).toBeGreaterThan(0);
  expect(document.querySelectorAll('a[href="#/releases"]')).toHaveLength(0);
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
  expect(await screen.findByRole('radio', { name: /Sakawi Ninh/i })).toBeInTheDocument();
});

test('switches language without leaving the current route', async () => {
  window.location.hash = '#/support';
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /English/i })[0]);

  await waitFor(() => expect(screen.getByRole('heading', { name: /Support/i })).toBeInTheDocument());
  expect(window.location.hash).toBe('#/support');
  expect(window.localStorage.getItem(languageStorageKey)).toBe('en');
  expect(document.documentElement.lang).toBe('en');
});

test('documents index shows the mobile app document set', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/documents';

  render(<App />);

  expect(screen.getByRole('heading', { name: /Sakawi Documents/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Sakawi Cham and Sakawi Awal/i })).toBeInTheDocument();
  const documentLinks = screen.getAllByRole('link', { name: /Open document/i });
  expect(documentLinks).toHaveLength(7);
  expect(documentLinks[0]).toHaveAttribute('href', '#/documents/comparison');

  fireEvent.click(documentLinks[0]);
  await waitFor(() => expect(window.location.hash).toBe('#/documents/comparison'));
  expect(screen.getByRole('heading', { name: /Sakawi Cham and Sakawi Awal/i, level: 1 })).toBeInTheDocument();
});

test('documents route preserves language and renders approved mobile detail bodies', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/documents/calendar-rules';

  render(<App />);

  expect(document.documentElement.lang).toBe('en');
  expect(screen.getByRole('heading', { name: /Month and year rules/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Rule groups/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Sakawi Awal/i })).toBeInTheDocument();
  expect(screen.getByText(/Awal khik, Cham nduec/i)).toBeInTheDocument();
  expect(screen.queryByText(/Approved detailed website body copy is not available/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getAllByText('VI')[0]);
  await waitFor(() => expect(document.documentElement.lang).toBe('vi'));
  expect(window.location.hash).toBe('#/documents/calendar-rules');
});

test('invalid document slugs stay inside the documents section', () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/documents/not-real';

  render(<App />);

  expect(screen.getByRole('heading', { name: /Document not found/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Back to Documents/i })).toHaveAttribute('href', '#/documents');
});

test('about route keeps the product introduction and mobile app CTA available', () => {
  window.location.hash = '#/about';

  render(<App />);

  expect(screen.getByRole('heading', { name: /Sakawi/i, level: 1 })).toBeInTheDocument();
  expect(document.querySelector('a[href="#/calendar"]')).toBeInTheDocument();
  expect(document.querySelector('a[href="#/events"]')).toBeInTheDocument();
  expect(document.querySelector('a[href="#/releases"]')).not.toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Google Play/i })[0]).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.sakawi.cham&hl=vi'
  );
  const qrImage = screen.getByAltText(/QR/i);
  const qrLink = qrImage.closest('a');
  expect(qrImage).toHaveAttribute('src', '/google-play-qr.svg');
  expect(qrImage).toHaveAttribute('width', '160');
  expect(qrImage).toHaveAttribute('height', '160');
  expect(qrLink).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.sakawi.cham&hl=vi');
  expect(qrLink).toHaveAttribute('target', '_blank');
  expect(qrLink).toHaveAttribute('rel', 'noreferrer');
});

test('releases route redirects to about without exposing releases navigation', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/releases';

  render(<App />);

  await waitFor(() => expect(window.location.hash).toBe('#/about'));
  expect(screen.getByRole('heading', { name: /^Sakawi$/i, level: 1 })).toBeInTheDocument();
  expect(document.querySelector('a[href="#/releases"]')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /Releases/i })).not.toBeInTheDocument();
});

test('public contact pages use Sakawi official contact and copyright', () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/privacy';

  const { unmount } = render(<App />);

  expect(screen.getByRole('heading', { name: /^Privacy$/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: supportEmail })).toHaveAttribute('href', `mailto:${supportEmail}`);
  expect(screen.getByText('© 2026 Sakawi')).toBeInTheDocument();

  unmount();
  window.location.hash = '#/support';
  render(<App />);

  expect(screen.getByRole('heading', { name: /^Support$/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: supportEmail })).toHaveAttribute('href', `mailto:${supportEmail}`);
  expect(screen.getByText('© 2026 Sakawi')).toBeInTheDocument();
});

test('calendar route supports month navigation, today, selection, events, language, and region', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/calendar?date=2026-07-29';

  const { container } = render(<App />);

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Date details/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

  expect(await screen.findByText(/Month 7 - 2026/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Previous month/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Next month/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^Today$/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Next month/i }));
  expect(await screen.findByText(/Month 8 - 2026/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Previous month/i }));
  expect(await screen.findByText(/Month 7 - 2026/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /^Today$/i }));
  await waitFor(() => expect(screen.getAllByText(/July 29, 2026/i).length).toBeGreaterThan(0));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

  const todayCell = await screen.findByTestId('calendar-today-cell');
  expect(todayCell).toHaveAttribute('aria-current', 'date');
  expect(container.querySelectorAll('.calendar-table tbody td')).toHaveLength(42);

  const selectableDate = await screen.findByRole('button', { name: /30.*7.*2026.*View details/i });
  fireEvent.click(selectableDate);
  await waitFor(() => expect(screen.getAllByText(/July 30, 2026/i).length).toBeGreaterThan(0));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

  const eventButtons = await screen.findAllByRole('button', { name: / - Events$/i });
  expect(eventButtons.length).toBeGreaterThan(0);

  const firstEventButton = eventButtons[0];
  const eventName = firstEventButton.textContent?.trim();
  const eventCell = firstEventButton.closest('td');
  expect(eventCell).not.toBeNull();

  fireEvent.click(eventCell as HTMLTableCellElement);
  expect(await screen.findByRole('heading', { name: /Date details/i })).toBeInTheDocument();
  expect(screen.getAllByText(eventName ?? '')[0]).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

  fireEvent.click(screen.getAllByText('VI')[0]);
  await waitFor(() => expect(document.documentElement.lang).toBe('vi'));
  fireEvent.click(screen.getAllByText('EN')[0]);
  await waitFor(() => expect(document.documentElement.lang).toBe('en'));
  expect(window.location.hash).toBe('#/calendar?date=2026-07-29');

  fireEvent.click(screen.getAllByRole('radio')[1]);
  expect(window.localStorage.getItem('sakawi.calendar.region')).toBe('BinhThuan');
  expect(screen.getAllByText(/Sakawi B/i).length).toBeGreaterThan(0);
});

test('events route opens event details and links back to the monthly calendar', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/events';

  render(<App />);

  expect(await screen.findByRole('heading', { name: /^Events$/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Events in/i })).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('radio')[1]);
  expect(window.localStorage.getItem('sakawi.calendar.region')).toBe('BinhThuan');

  fireEvent.click(screen.getAllByText('VI')[0]);
  await waitFor(() => expect(document.documentElement.lang).toBe('vi'));
  fireEvent.click(screen.getAllByText('EN')[0]);
  expect(await screen.findByRole('heading', { name: /^Events$/i })).toBeInTheDocument();

  fireEvent.click((await screen.findAllByRole('button', { name: /Cham New Year/i }))[0]);
  const calendarLink = await screen.findByRole('link', { name: /Open in Monthly Calendar/i });
  expect(calendarLink).toHaveAttribute('href', expect.stringMatching(/^#\/calendar\?date=\d{4}-\d{2}-\d{2}$/));
  fireEvent.click(calendarLink);

  await waitFor(() => expect(window.location.hash).toMatch(/^#\/calendar\?date=\d{4}-\d{2}-\d{2}$/));
  expect(await screen.findByRole('heading', { name: /Date details/i })).toBeInTheDocument();
});

test('unsupported browser languages fall back safely to Vietnamese', () => {
  expect(resolveBrowserLanguage('fr-FR')).toBe('vi');
  expect(resolveBrowserLanguage('en-US')).toBe('en');
  expect(resolveBrowserLanguage('vi-VN')).toBe('vi');
});

test('Vietnamese and English translation structures stay aligned', () => {
  expect(flattenShape(siteCopy.vi).sort()).toEqual(flattenShape(siteCopy.en).sort());
});
