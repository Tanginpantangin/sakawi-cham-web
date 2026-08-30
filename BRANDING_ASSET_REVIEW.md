# Sakawi Branding Asset Review

Reviewed on July 29, 2026. Updated on August 29, 2026 for official App Store and Google Play availability.

## Mobile App Sources Inspected

| Source | Finding |
| --- | --- |
| `D:\CHAM PROJECT\sakawi-cham-app\app.json` | Expo app icon is `./assets/icon.png`. Android adaptive icon foreground is `./assets/adaptive-icon.png` with background `#D85A2A`. Expo Notifications color is `#D85A2A`. |
| `D:\CHAM PROJECT\sakawi-cham-app\src\theme.ts` | Mobile theme colors include `chrome: #8F3F24`, `chromeActive: #A94E2B`, `ahier: #D85A2A`, `awal: #0D7A55`, `gregory: #2E6FBA`, `background: #F8FAFC`, and `surface: #FFFFFF`. |
| `D:\CHAM PROJECT\sakawi-cham-app\assets` | Official app assets include `icon.png`, `adaptive-icon.png`, and `favicon.png`. |
| `D:\CHAM PROJECT\sakawi-cham-app\android\app\src\main\res` | Native launcher and splash resources are generated from the same app branding family. |

## Selected Website Assets

| Use | Selected asset | Reason |
| --- | --- | --- |
| Header logo | `public/sakawi-app-icon.png` | Copied from mobile `assets/icon.png`, the canonical Expo app icon and Play/launcher-style orange icon. |
| Footer logo | `public/sakawi-app-icon.png` | Same official app icon for consistent site-wide branding. |
| Hero icon | `public/sakawi-app-icon.png` | The Android launcher and Google Play style icon should be the first visual signal on the official website. |
| Favicon | `public/sakawi-favicon.png` | Copied from mobile `assets/favicon.png`; `public/sakawi.ico` remains as an alternate fallback only. |
| Apple touch icon | `public/apple-touch-icon.png` | Derived from mobile `assets/icon.png` at 180 x 180 while preserving artwork and proportions. |
| PWA icons | `public/icon-192.png`, `public/icon-512.png`, `public/sakawi-app-icon.png` | Derived from mobile `assets/icon.png` for browser install metadata. |
| Open Graph image | `public/og-image.png` | Derived from mobile `assets/icon.png` and mobile theme colors without altering the logo artwork. |
| App Store badge | `public/app-store-badge-en.svg`, `public/app-store-badge-vi.svg` | Official Apple Media Services badge artwork. Apple officially provides Vietnamese localized badge artwork. |
| Google Play badge | `public/google-play-badge-en.png`, `public/google-play-badge-vi.png` | Official Google Play badge artwork from Google's localized badge endpoints. |
| App Store QR code | `public/apple-app-store-qr.svg` | Static QR generated from `https://apps.apple.com/vn/app/sakawi-cham-calendar/id6799479303` with no logo overlay. |
| Google Play QR code | `public/google-play-qr.svg` | Static QR generated from `https://play.google.com/store/apps/details?id=com.sakawi.cham` with no logo overlay. |
| Feature showcase source screenshots | `public/showcase/source/*.jpg` | Official public App Store screenshots downloaded from the Sakawi listing without editing the app UI. |
| Feature showcase localized assets | `public/showcase/vi/*.svg`, `public/showcase/en/*.svg` | Presentation SVGs generated around the source screenshots with separate Vietnamese and English titles. |

The logo was not redrawn, simplified, recolored, regenerated, or replaced with a monochrome mark. Web icon sizes were derived from the official mobile app icon while preserving the original visual identity.
