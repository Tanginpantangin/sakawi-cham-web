import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  calendarRuleGroups,
  comparisonRows,
  foundationFacts,
  getAdjacentDocuments,
  getDocumentById,
  getDocuments,
  monthPhaseTerms,
  monthRules,
  sakawiDefinition,
  sharedFeatures,
  yearExample,
  type DocumentBlock,
  type DocumentTone,
  type TermItem
} from "../data/documentLibrary";
import { Layout } from "../Layout";
import { useLanguage } from "../i18n";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { appIconUrl, getSiteCopy, playStoreUrl, qrCodeUrl } from "../siteContent";
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

const documentToneClass = (tone: DocumentTone) => `document-tone-${tone}`;

const renderTerms = (terms: readonly TermItem[], tone: DocumentTone) => (
  <div className="document-term-grid">
    {terms.map((term) => (
      <article className={`document-term-card ${documentToneClass(tone)}`} key={`${term.name}-${term.detail}`}>
        {term.symbol && <span className="document-term-symbol" aria-hidden="true">{term.symbol}</span>}
        {term.chamText && <span className="document-term-cham">{term.chamText}</span>}
        <h3>{term.name}</h3>
        <p>{term.detail}</p>
      </article>
    ))}
  </div>
);

const renderDocumentBlock = (
  block: DocumentBlock,
  copy: ReturnType<typeof getSiteCopy>,
  index: number
) => {
  switch (block.type) {
    case "sakawi-definition":
      return (
        <section className="document-section document-definition" aria-labelledby="sakawi-definition-title" key={block.type}>
          <h2 id="sakawi-definition-title">{sakawiDefinition.formula}</h2>
          <p>{sakawiDefinition.intro}</p>
          <ul>
            {sakawiDefinition.parts.map((part) => (
              <li key={part.term}><strong>{part.term}</strong> - {part.detail}</li>
            ))}
          </ul>
        </section>
      );
    case "shared-features":
      return (
        <section className="document-section" aria-labelledby="document-shared-title" key={block.type}>
          <h2 id="document-shared-title">{copy.documents.sharedHeading}</h2>
          <ul className="document-check-list">
            {sharedFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      );
    case "comparison-table":
      return (
        <section className="document-section" aria-labelledby="document-comparison-title" key={block.type}>
          <h2 id="document-comparison-title">{copy.documents.differencesHeading}</h2>
          <div className="document-table-wrap">
            <table className="document-comparison-table">
              <thead>
                <tr>
                  <th scope="col">{copy.documents.topicLabel}</th>
                  <th scope="col">{copy.documents.awalLabel}</th>
                  <th scope="col">{copy.documents.chamLabel}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.topic}>
                    <th scope="row">{row.topic}</th>
                    <td>{row.awal}</td>
                    <td>{row.cham}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    case "paragraph":
      return <p className="document-paragraph" key={`${block.type}-${index}`}>{block.text}</p>;
    case "rule-groups":
      return (
        <section className="document-section" aria-labelledby="document-rule-groups-title" key={block.type}>
          <h2 id="document-rule-groups-title">{copy.documents.ruleGroupsHeading}</h2>
          <div className="document-rule-grid">
            {calendarRuleGroups.map((group) => (
              <article className={`document-rule-card ${documentToneClass(group.tone)}`} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      );
    case "facts":
      return (
        <section className="document-section" aria-labelledby="document-facts-title" key={block.type}>
          <h2 id="document-facts-title">{copy.documents.factsHeading}</h2>
          <div className="document-fact-grid">
            {foundationFacts.map((fact) => (
              <article key={fact.value}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </article>
            ))}
          </div>
        </section>
      );
    case "terms":
      return (
        <section className="document-section" aria-labelledby={`document-terms-${index}`} key={`${block.type}-${index}`}>
          {block.title && <h2 id={`document-terms-${index}`}>{block.title}</h2>}
          {!block.title && <h2 className="sr-only" id={`document-terms-${index}`}>{copy.documents.contentsLabel}</h2>}
          {renderTerms(block.terms, block.tone)}
        </section>
      );
    case "phases":
      return (
        <section className="document-section" aria-labelledby="document-phases-title" key={block.type}>
          <h2 id="document-phases-title">{copy.documents.phaseHeading}</h2>
          {renderTerms(monthPhaseTerms, "accent")}
        </section>
      );
    case "month-rules":
      return (
        <section className="document-section" aria-labelledby="document-month-rules-title" key={block.type}>
          <h2 id="document-month-rules-title">{copy.documents.monthRuleHeading}</h2>
          <div className="document-rule-grid document-month-rule-grid">
            {monthRules.map((rule) => (
              <article className={`document-rule-card ${documentToneClass(rule.tone)}`} key={rule.type}>
                <h3>{rule.type === "full" ? copy.documents.fullMonthTitle : copy.documents.shortMonthTitle}</h3>
                <ul>
                  {rule.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      );
    case "month-grid":
      return (
        <section className="document-section" aria-labelledby={`document-month-grid-${index}`} key={`${block.type}-${block.title}`}>
          <h2 id={`document-month-grid-${index}`}>{block.title}</h2>
          {renderTerms(block.terms, block.tone)}
        </section>
      );
    case "year-example":
      return (
        <section className="document-section" aria-labelledby="document-year-example-title" key={block.type}>
          <h2 id="document-year-example-title">{copy.documents.yearExampleHeading}</h2>
          <article className="document-year-example document-tone-chrome">
            <span>{yearExample.year.yearNumber}</span>
            <strong>{yearExample.nasak.rumiName} {yearExample.ikasLatin}</strong>
            <small>{yearExample.nasak.akharThrahName} {yearExample.ikasCham}</small>
          </article>
        </section>
      );
    case "year-formula":
      return (
        <section className="document-section" aria-labelledby="document-year-formula-title" key={block.type}>
          <h2 id="document-year-formula-title">{copy.documents.yearFormulaHeading}</h2>
          <div className="document-formula">
            <span>Nasak</span>
            <span aria-hidden="true">+</span>
            <span>Ikas Sarak</span>
          </div>
        </section>
      );
    case "source-note":
      return (
        <aside className="notice public-notice document-source-note" aria-labelledby={`document-source-${index}`} key={`${block.type}-${index}`}>
          <h2 id={`document-source-${index}`}>{copy.documents.sourceHeading}</h2>
          <p>{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
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
  const documents = getDocuments(language);

  usePageMetadata(copy.metadata.documentsTitle, copy.metadata.documentsDescription);

  return (
    <Layout>
      <Container className="page-container public-page documents-page">
        <Breadcrumb current={copy.nav.documents} />
        <p className="page-eyebrow">{copy.shared.productName}</p>
        <h1>{copy.documents.title}</h1>
        <p className="page-lede">{copy.documents.subtitle}</p>
        <p className="documents-intro">{copy.documents.indexIntro}</p>
        <div className="documents-grid">
          {documents.map((item) => (
            <article className={`document-card ${documentToneClass(item.tone)}`} key={item.id}>
              <span className="document-card-number" aria-hidden="true">{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <Link to={`/documents/${item.id}`}>{copy.documents.openDocument}</Link>
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
  const currentDocument = getDocumentById(language, documentId);
  const adjacent = currentDocument ? getAdjacentDocuments(language, currentDocument.id) : undefined;

  usePageMetadata(
    currentDocument ? `${currentDocument.title} | ${copy.shared.productName}` : copy.metadata.notFoundTitle,
    currentDocument?.summary ?? copy.metadata.notFoundDescription
  );

  if (!currentDocument) {
    return (
      <Layout>
        <Container className="page-container public-page document-detail-page">
          <Breadcrumb current={copy.documents.notFoundTitle} />
          <p className="page-eyebrow">{copy.nav.documents}</p>
          <h1>{copy.documents.notFoundTitle}</h1>
          <p className="page-lede">{copy.documents.notFoundText}</p>
          <div className="public-link-row">
            <Link to="/documents">{copy.actions.backToDocuments}</Link>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="page-container public-page document-detail-page">
        <Breadcrumb current={currentDocument.title} />
        <p className="page-eyebrow">{copy.nav.documents}</p>
        <h1>{currentDocument.title}</h1>
        <p className="page-lede">{currentDocument.summary}</p>
        <p><Link className="document-back-link" to="/documents">{copy.actions.backToDocuments}</Link></p>
        <article className={`document-body ${documentToneClass(currentDocument.tone)}`}>
          {currentDocument.blocks.map((block, index) => renderDocumentBlock(block, copy, index))}
        </article>
        {adjacent && (
          <nav className="document-adjacent-nav" aria-label={copy.documents.documentNavigationLabel}>
            {adjacent.previous ? (
              <Link to={`/documents/${adjacent.previous.id}`}>
                <span>{copy.documents.previousDocument}</span>
                <strong>{adjacent.previous.title}</strong>
              </Link>
            ) : <span />}
            {adjacent.next ? (
              <Link to={`/documents/${adjacent.next.id}`}>
                <span>{copy.documents.nextDocument}</span>
                <strong>{adjacent.next.title}</strong>
              </Link>
            ) : <span />}
          </nav>
        )}
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
