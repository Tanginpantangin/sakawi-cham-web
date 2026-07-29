import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "../Layout";
import { useLanguage } from "../i18n";
import { appIconUrl, getSiteCopy, playStoreUrl, qrCodeUrl } from "../siteContent";

const usePageMetadata = (title: string, description: string) => {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [description, title]);
};

export const HomePage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.seo.homeTitle, copy.seo.description);

  return (
    <Layout>
      <Container className="page-container home-page">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <p className="page-eyebrow">{copy.home.eyebrow}</p>
            <h1 id="home-title">{copy.home.title}</h1>
            <p className="page-lede">{copy.home.lede}</p>
            <div className="hero-actions">
              <a className="download-button hero-download" href={playStoreUrl} target="_blank" rel="noreferrer">
                {copy.home.download}
              </a>
              <span className="ios-note">{copy.home.iosNote}</span>
            </div>
          </div>
          <div className="hero-brand-panel" aria-label="Sakawi app icon">
            <img className="hero-app-icon" src={appIconUrl} alt="Sakawi app icon" width="180" height="180" />
            <div className="qr-card">
              <img src={qrCodeUrl} alt="QR code for Sakawi on Google Play" width="132" height="132" />
              <p>{copy.home.qrCaption}</p>
            </div>
          </div>
        </section>

        <section className="formula-section" aria-labelledby="formula-title">
          <h2 id="formula-title">{copy.home.formulaTitle}</h2>
          <p>{copy.home.formulaIntro}</p>
          <div className="formula-grid">
            <article>
              <h3>Saka</h3>
              <p>{copy.home.saka}</p>
            </article>
            <article>
              <h3>Jawi</h3>
              <p>{copy.home.jawi}</p>
            </article>
          </div>
        </section>

        <section className="feature-section" aria-labelledby="features-title">
          <h2 id="features-title">{copy.home.featuresTitle}</h2>
          <div className="feature-grid">
            {copy.home.features.map((feature) => (
              <span className="feature-chip" key={feature}>{feature}</span>
            ))}
          </div>
        </section>

        <section className="screenshot-placeholder" aria-label="App screenshots">
          <div>
            <img src={appIconUrl} alt="" width="72" height="72" />
            <p>{copy.home.screenshotNote}</p>
          </div>
        </section>

        <section className="quick-links-section" aria-labelledby="quick-links-title">
          <h2 id="quick-links-title">{copy.home.linksTitle}</h2>
          <div className="public-link-row">
            <Link to="/months">{copy.home.calendarLink}</Link>
            <Link to="/events">{copy.home.eventsLink}</Link>
            <Link to="/docs">{copy.home.docsLink}</Link>
            <Link to="/privacy">{copy.nav.privacy}</Link>
            <Link to="/support">{copy.nav.support}</Link>
            <Link to="/releases">{copy.nav.releases}</Link>
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export const PrivacyPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.seo.privacyTitle, copy.privacy.lede);

  return (
    <Layout>
      <Container className="page-container public-page">
        <p className="page-eyebrow">Sakawi</p>
        <h1>{copy.privacy.title}</h1>
        <p className="page-lede">{copy.privacy.lede}</p>
        <p className="page-meta">{copy.privacy.updated}</p>

        {copy.privacy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </Container>
    </Layout>
  );
};

export const SupportPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.seo.supportTitle, copy.support.lede);

  return (
    <Layout>
      <Container className="page-container public-page">
        <p className="page-eyebrow">Sakawi</p>
        <h1>{copy.support.title}</h1>
        <p className="page-lede">{copy.support.lede}</p>

        <div className="notice public-notice">
          <p>{copy.support.contactLabel}: <a href="mailto:hoangminhgiam88@gmail.com">hoangminhgiam88@gmail.com</a></p>
        </div>

        <section>
          <h2>{copy.support.installTitle}</h2>
          <p>{copy.support.installBody}</p>
          <p><a href={playStoreUrl} target="_blank" rel="noreferrer">Google Play</a></p>
        </section>

        <section>
          <h2>{copy.support.updateTitle}</h2>
          <p>{copy.support.updateBody}</p>
        </section>

        <section>
          <h2>{copy.support.privacyTitle}</h2>
          <p>{copy.support.privacyBody}</p>
          <p><Link to="/privacy">{copy.nav.privacy}</Link></p>
        </section>

        <section>
          <h2>{copy.support.troubleshootingTitle}</h2>
          <ul>
            {copy.support.troubleshootingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </Container>
    </Layout>
  );
};

export const ReleaseNotesPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.seo.releasesTitle, copy.releases.lede);

  return (
    <Layout>
      <Container className="page-container public-page">
        <p className="page-eyebrow">Sakawi</p>
        <h1>{copy.releases.title}</h1>
        <p className="page-lede">{copy.releases.lede}</p>
        <p className="page-meta">{copy.releases.currentNote}</p>

        {copy.releases.entries.map((entry) => (
          <section className="release-entry" aria-labelledby={`release-${entry.version}`} key={entry.version}>
            <p className="release-version">{entry.version}</p>
            <h2 id={`release-${entry.version}`}>{entry.title}</h2>
            <ul>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </Layout>
  );
};
