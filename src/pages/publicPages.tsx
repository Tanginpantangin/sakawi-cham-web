import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../Layout";
import { useLanguage } from "../i18n";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { appIconUrl, getDocumentById, getSiteCopy, playStoreUrl, qrCodeUrl } from "../siteContent";
import Helper from "../utility/helper";
import {
  displayAhierDateSummary,
  displayAwalDateSummary,
  formatDateParam,
  sameDate
} from "../utils/dateFormat";

const setMetaContent = (selector: string, content: string) => {
  document.querySelector(selector)?.setAttribute("content", content);
};

const usePageMetadata = (title: string, description: string) => {
  useEffect(() => {
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [description, title]);
};

const Breadcrumb = ({ current }: { current: string }) => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  return (
    <nav className="breadcrumb-nav" aria-label={copy.accessibility.breadcrumbLabel}>
      <Link to="/">{copy.nav.home}</Link>
      <span aria-hidden="true">/</span>
      <span>{current}</span>
    </nav>
  );
};

interface HomePageProps {
  matrixSakawi: MatrixCalendarType[];
  fullSakawi: FullCalendarType[];
}

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const daysUntil = (date: Date) => {
  const today = startOfDay(new Date());
  return Math.max(0, Math.ceil((startOfDay(date).getTime() - today.getTime()) / 86400000));
};

const formatLongDate = (date: Date, language: string) =>
  date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

const buildCalendarPreviewDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];
};

const buildWeekdayLabels = (language: string) => {
  const locale = language === "vi" ? "vi-VN" : "en-US";
  return Array.from({ length: 7 }, (_, index) =>
    new Date(2026, 7, 2 + index).toLocaleDateString(locale, { weekday: "narrow" })
  );
};

export const AboutPage = ({ matrixSakawi, fullSakawi }: HomePageProps) => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);
  const today = new Date();
  const todayItem = fullSakawi.find((item) => sameDate(item.dateGregory, today));
  const ahierDayCount = todayItem
    ? Helper.getActualDayNumbersOfAhierMonth(matrixSakawi, todayItem.dateAhier.ahierMonth)
    : 0;
  const awalDayCount = todayItem
    ? Helper.getDayNumbersOfAwalMonth(todayItem.dateAwal.awalMonth.year, todayItem.dateAwal.awalMonth.month)
    : 0;
  const weekdayLabels = buildWeekdayLabels(language);
  const previewDays = buildCalendarPreviewDays(today.getFullYear(), today.getMonth());
  const upcomingEvents = Helper.getNextEvents(fullSakawi).slice(0, 4);

  usePageMetadata(copy.metadata.homeTitle, copy.metadata.homeDescription);

  return (
    <Layout>
      <Container className="page-container home-page">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <p className="page-eyebrow">{copy.home.eyebrow}</p>
            <h1 id="home-title">{copy.home.title}</h1>
            <p className="page-lede">{copy.home.lede}</p>
            <div className="hero-actions">
              <Link className="download-button hero-download" to="/calendar">
                {copy.home.primaryCalendarAction}
              </Link>
              <Link className="secondary-action" to="/events">
                {copy.home.primaryEventsAction}
              </Link>
              <a className="download-button hero-download" href={playStoreUrl} target="_blank" rel="noreferrer">
                {copy.home.download}
              </a>
            </div>
          </div>
          <div className="hero-brand-panel" aria-label={copy.accessibility.heroBrandLabel}>
            <img className="hero-app-icon" src={appIconUrl} alt={copy.accessibility.appIconAlt} width="180" height="180" />
            <div className="qr-card">
              <img src={qrCodeUrl} alt={copy.accessibility.qrAlt} width="132" height="132" />
              <p>{copy.home.qrCaption}</p>
            </div>
          </div>
        </section>

        <section className="home-preview-section" aria-labelledby="home-calendar-preview-title">
          <article className="calendar-preview-panel">
            <div className="section-heading-row">
              <div>
                <p className="page-eyebrow">{copy.home.currentMonthLabel}</p>
                <h2 id="home-calendar-preview-title">{copy.home.calendarPreviewTitle}</h2>
              </div>
              <Link to="/calendar">{copy.home.calendarPreviewCta}</Link>
            </div>
            <p className="calendar-preview-month">
              {today.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="mini-calendar" aria-label={copy.home.calendarPreviewTitle}>
              {weekdayLabels.map((dayName, index) => (
                <span className="mini-calendar-weekday" key={`${dayName}-${index}`}>{dayName}</span>
              ))}
              {previewDays.map((day, index) => (
                <span
                  className={day === today.getDate() ? "mini-calendar-day mini-calendar-today" : "mini-calendar-day"}
                  key={`${day ?? "blank"}-${index}`}
                  aria-current={day === today.getDate() ? "date" : undefined}
                >
                  {day}
                </span>
              ))}
            </div>
            {todayItem && (
              <dl className="today-date-summary">
                <div>
                  <dt>{copy.home.todayLabel}</dt>
                  <dd>{formatLongDate(todayItem.dateGregory, language)}</dd>
                </div>
                <div>
                  <dt>{copy.home.chamDateLabel}</dt>
                  <dd>{displayAhierDateSummary(todayItem.dateAhier, ahierDayCount).latin}</dd>
                </div>
                <div>
                  <dt>{copy.home.awalDateLabel}</dt>
                  <dd>{displayAwalDateSummary(todayItem.dateAwal, awalDayCount).latin}</dd>
                </div>
              </dl>
            )}
          </article>

          <article className="events-preview-panel">
            <div className="section-heading-row">
              <div>
                <p className="page-eyebrow">{copy.nav.events}</p>
                <h2>{copy.home.upcomingPreviewTitle}</h2>
              </div>
              <Link to="/events">{copy.home.upcomingPreviewCta}</Link>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="preview-event-list">
                {upcomingEvents.map((event) => {
                  const eventInfo = Helper.displayEventDay(event.eventType);
                  return (
                    <Link className="preview-event" to={`/calendar?date=${formatDateParam(event.eventDate)}`} key={`${event.eventType}-${event.eventDate.toISOString()}`}>
                      <span className="preview-event-date">{Helper.displayDateString(event.eventDate)}</span>
                      <span className="preview-event-name">{eventInfo?.latinName ?? event.eventType}</span>
                      <span className="preview-event-meta">{eventInfo?.sakawiType === "sakawiAwal" ? copy.home.awalDateLabel : eventInfo?.sakawiType === "sakawiAhier" ? copy.home.chamDateLabel : copy.nav.events}</span>
                      <span className="preview-event-countdown">{daysUntil(event.eventDate)} {language === "vi" ? "ngày" : "days"}</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p>{copy.home.noEvents}</p>
            )}
          </article>
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

        <section className="screenshot-placeholder" aria-label={copy.accessibility.screenshotsLabel}>
          <div>
            <img src={appIconUrl} alt="" width="72" height="72" />
            <p>{copy.home.screenshotNote}</p>
          </div>
        </section>

        <section className="quick-links-section" aria-labelledby="quick-links-title">
          <h2 id="quick-links-title">{copy.home.linksTitle}</h2>
          <div className="public-link-row">
            <Link to="/calendar">{copy.home.calendarLink}</Link>
            <Link to="/events">{copy.home.eventsLink}</Link>
            <Link to="/documents">{copy.nav.documents}</Link>
            <Link to="/privacy">{copy.nav.privacy}</Link>
            <Link to="/support">{copy.nav.support}</Link>
            <Link to="/releases">{copy.nav.releases}</Link>
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export const DocumentsPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.metadata.documentsTitle, copy.metadata.documentsDescription);

  return (
    <Layout>
      <Container className="page-container public-page documents-page">
        <Breadcrumb current={copy.nav.documents} />
        <p className="page-eyebrow">{copy.shared.productName}</p>
        <h1>{copy.documents.title}</h1>
        <p className="page-lede">{copy.documents.subtitle}</p>
        <div className="documents-grid">
          {copy.documents.documents.map((document) => (
            <article className="document-card" key={document.id}>
              <h2>{document.title}</h2>
              <p>{document.description}</p>
              <Link to={`/documents/${document.id}`}>{copy.actions.readMore}</Link>
            </article>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export const DocumentDetailPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { language } = useLanguage();
  const copy = getSiteCopy(language);
  const document = getDocumentById(language, documentId);

  usePageMetadata(
    document ? `${document.title} | ${copy.shared.productName}` : copy.metadata.notFoundTitle,
    document?.description ?? copy.metadata.notFoundDescription
  );

  if (!document) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Container className="page-container public-page document-detail-page">
        <Breadcrumb current={document.title} />
        <p className="page-eyebrow">{copy.nav.documents}</p>
        <h1>{document.title}</h1>
        <p className="page-lede">{document.description}</p>
        {document.body.length > 0 ? (
          <div className="document-body">
            {document.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="notice public-notice missing-translation">
            <h2>{copy.documents.missingBodyTitle}</h2>
            <p>{copy.documents.missingBodyText}</p>
          </div>
        )}
        <p><Link to="/documents">{copy.actions.backToDocuments}</Link></p>
      </Container>
    </Layout>
  );
};

export const PrivacyPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.metadata.privacyTitle, copy.metadata.privacyDescription);

  return (
    <Layout>
      <Container className="page-container public-page">
        <Breadcrumb current={copy.nav.privacy} />
        <p className="page-eyebrow">{copy.shared.productName}</p>
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

  usePageMetadata(copy.metadata.supportTitle, copy.metadata.supportDescription);

  return (
    <Layout>
      <Container className="page-container public-page">
        <Breadcrumb current={copy.nav.support} />
        <p className="page-eyebrow">{copy.shared.productName}</p>
        <h1>{copy.support.title}</h1>
        <p className="page-lede">{copy.support.lede}</p>

        <div className="notice public-notice">
          <p>{copy.support.contactLabel}: <a href="mailto:hoangminhgiam88@gmail.com">hoangminhgiam88@gmail.com</a></p>
        </div>

        <section>
          <h2>{copy.support.installTitle}</h2>
          <p>{copy.support.installBody}</p>
          <p><a href={playStoreUrl} target="_blank" rel="noreferrer">{copy.shared.googlePlay}</a></p>
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

  usePageMetadata(copy.metadata.releasesTitle, copy.metadata.releasesDescription);

  return (
    <Layout>
      <Container className="page-container public-page">
        <Breadcrumb current={copy.nav.releases} />
        <p className="page-eyebrow">{copy.shared.productName}</p>
        <h1>{copy.releases.title}</h1>
        <p className="page-lede">{copy.releases.lede}</p>
        <p className="page-meta">{copy.releases.currentNote}</p>

        {copy.releases.entries.map((entry) => (
          <section className="release-entry" aria-labelledby={`release-${entry.version}`} key={entry.version}>
            <p className="release-version">{entry.version}</p>
            <p className="page-meta">{entry.date}</p>
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

export const NotFoundPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(copy.metadata.notFoundTitle, copy.metadata.notFoundDescription);

  return (
    <Layout>
      <Container className="page-container public-page">
        <p className="page-eyebrow">{copy.shared.productName}</p>
        <h1>{copy.notFound.title}</h1>
        <p className="page-lede">{copy.notFound.lede}</p>
        <div className="public-link-row">
          <Link to="/">{copy.notFound.homeLink}</Link>
        </div>
      </Container>
    </Layout>
  );
};
