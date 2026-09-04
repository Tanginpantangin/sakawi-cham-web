import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import { languageStorageKey, resolveBrowserLanguage } from './i18n';
import { appStoreUrl, playStoreUrl, siteCopy, supportEmail } from './siteContent';

jest.setTimeout(60000);

jest.mock('./utils/today', () => ({
  getToday: () => new Date(2026, 6, 29, 12, 0, 0)
}));

let scrollIntoViewMock: jest.Mock;

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
  scrollIntoViewMock = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoViewMock;
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
    playStoreUrl
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

test('about route renders the feature showcase and official download cards', () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/about';

  render(<App />);

  expect(screen.getByRole('heading', { name: /Sakawi/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Feature Showcase/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Download Sakawi/i })).toBeInTheDocument();
  expect(document.querySelector('a[href="#/calendar"]')).toBeInTheDocument();
  expect(document.querySelector('a[href="#/events"]')).toBeInTheDocument();
  expect(document.querySelector('a[href="#/releases"]')).not.toBeInTheDocument();

  const showcaseImages = screen.getAllByRole('img', { name: /Feature showcase image/i });
  expect(showcaseImages).toHaveLength(4);
  expect(showcaseImages.map((image) => image.getAttribute('src'))).toEqual([
    '/showcase/en/calendar.svg',
    '/showcase/en/upcoming-events.svg',
    '/showcase/en/year-events.svg',
    '/showcase/en/documents.svg'
  ]);

  const downloadSection = document.getElementById('download-sakawi');
  expect(downloadSection).toBeInTheDocument();

  const appStoreBadge = within(downloadSection as HTMLElement).getByAltText('Download Sakawi on the App Store');
  const googlePlayBadge = within(downloadSection as HTMLElement).getByAltText('Get Sakawi on Google Play');
  const appStoreQrImage = within(downloadSection as HTMLElement).getByAltText('QR code to download Sakawi from the App Store.');
  const googlePlayQrImage = within(downloadSection as HTMLElement).getByAltText('QR code to download Sakawi from Google Play.');
  const appStoreLinks = within(downloadSection as HTMLElement).getAllByRole('link', { name: /App Store/i });
  const googlePlayLinks = within(downloadSection as HTMLElement).getAllByRole('link', { name: /Google Play/i });

  expect(appStoreBadge).toHaveAttribute('src', '/app-store-badge-en.svg');
  expect(googlePlayBadge).toHaveAttribute('src', '/google-play-badge-en.png');
  expect(appStoreQrImage).toHaveAttribute('src', '/apple-app-store-qr.svg');
  expect(googlePlayQrImage).toHaveAttribute('src', '/google-play-qr.svg');
  expect(appStoreQrImage).toHaveAttribute('width', '160');
  expect(appStoreQrImage).toHaveAttribute('height', '160');
  expect(googlePlayQrImage).toHaveAttribute('width', '160');
  expect(googlePlayQrImage).toHaveAttribute('height', '160');
  expect(appStoreLinks).toHaveLength(3);
  expect(googlePlayLinks).toHaveLength(3);
  appStoreLinks.forEach((link) => expect(link).toHaveAttribute('href', appStoreUrl));
  googlePlayLinks.forEach((link) => expect(link).toHaveAttribute('href', playStoreUrl));
  [...appStoreLinks, ...googlePlayLinks].forEach((link) => {
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('about download assets switch with the selected language', async () => {
  window.location.hash = '#/about';

  render(<App />);

  expect(screen.getAllByRole('button', { name: /Tải ứng dụng/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: /Tải Sakawi/i })).toBeInTheDocument();
  expect(screen.getByAltText('Tải Sakawi trên App Store')).toHaveAttribute('src', '/app-store-badge-vi.svg');
  expect(screen.getByAltText('Tải Sakawi trên Google Play')).toHaveAttribute('src', '/google-play-badge-vi.png');
  expect(screen.getByAltText('Mã QR tải Sakawi từ App Store.')).toHaveAttribute('src', '/apple-app-store-qr.svg');
  expect(screen.getByAltText('Mã QR tải Sakawi từ Google Play.')).toHaveAttribute('src', '/google-play-qr.svg');
  expect(screen.getAllByRole('img', { name: /Ảnh giới thiệu tính năng/i })[0]).toHaveAttribute(
    'src',
    '/showcase/vi/calendar.svg'
  );

  fireEvent.click(screen.getAllByRole('button', { name: /English/i })[0]);

  await waitFor(() => expect(document.documentElement.lang).toBe('en'));
  expect(screen.getAllByRole('button', { name: /Download App/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: /Download Sakawi/i })).toBeInTheDocument();
  expect(screen.getByAltText('Download Sakawi on the App Store')).toHaveAttribute('src', '/app-store-badge-en.svg');
  expect(screen.getByAltText('Get Sakawi on Google Play')).toHaveAttribute('src', '/google-play-badge-en.png');
  expect(screen.getByAltText('QR code to download Sakawi from the App Store.')).toHaveAttribute('src', '/apple-app-store-qr.svg');
  expect(screen.getByAltText('QR code to download Sakawi from Google Play.')).toHaveAttribute('src', '/google-play-qr.svg');
  expect(screen.getAllByRole('img', { name: /Feature showcase image/i })[0]).toHaveAttribute(
    'src',
    '/showcase/en/calendar.svg'
  );
});

test('header download CTA scrolls on about and navigates there from other routes', async () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/about';

  const { unmount } = render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /^Download App$/i })[0]);
  expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

  unmount();
  scrollIntoViewMock.mockClear();
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/calendar';
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /^Download App$/i })[0]);

  await waitFor(() => expect(window.location.hash).toBe('#/about?download=1'));
  await waitFor(() => expect(screen.getByRole('heading', { name: /Download Sakawi/i })).toBeInTheDocument());
  await waitFor(() => expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' }));
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

test('Cham Keyboard privacy route explains local composition without data transmission', () => {
  window.localStorage.setItem(languageStorageKey, 'en');
  window.location.hash = '#/cham-keyboard/privacy';

  render(<App />);

  expect(screen.getByRole('heading', { name: /^Privacy Policy$/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByText('Product: Cham Keyboard')).toBeInTheDocument();
  expect(screen.getByText('Android package: com.chamkeyboard')).toBeInTheDocument();
  expect(screen.getByText('Last updated: September 4, 2026')).toBeInTheDocument();
  expect(screen.getByText(/separate from Sakawi - Cham Calendar/i)).toBeInTheDocument();
  expect(screen.getByText(/at most 8 Unicode code points before the cursor/i)).toBeInTheDocument();
  expect(screen.getByText(/does not request the Android INTERNET permission/i)).toBeInTheDocument();
  expect(screen.getByText(/does not use analytics SDKs, advertising SDKs, or tracking SDKs/i)).toBeInTheDocument();
  expect(screen.getByText(/does not sell or share typed text/i)).toBeInTheDocument();
  expect(screen.getByText('Theme')).toBeInTheDocument();
  expect(screen.getByText('Haptic feedback')).toBeInTheDocument();
  expect(screen.getByText('Keyboard size')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: supportEmail })).toHaveAttribute('href', `mailto:${supportEmail}`);
  expect(document.title).toBe('Privacy Policy | Cham Keyboard');
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.sakawi.com/cham-keyboard/privacy'
  );
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    siteCopy.en.metadata.chamKeyboardPrivacyDescription
  );
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
