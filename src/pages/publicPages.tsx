import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
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
import {
  appIconUrl,
  appStoreQrCodeUrl,
  appStoreUrl,
  getFeatureShowcaseImageUrl,
  getSiteCopy,
  getStoreBadgeUrls,
  googlePlayQrCodeUrl,
  playStoreUrl,
  supportEmail
} from "../siteContent";

const setMetaContent = (selector: string, content: string) => {
  ensureMeta(selector).setAttribute("content", content);
};

const ensureCanonicalLink = () => {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  return canonical;
};

const ensureMeta = (selector: string) => {
  const existing = document.querySelector<HTMLMetaElement>(selector);

  if (existing) {
    return existing;
  }

  const meta = document.createElement("meta");
  const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
  const propertyMatch = selector.match(/meta\[property="([^"]+)"\]/);

  if (nameMatch) {
    meta.name = nameMatch[1];
  }

  if (propertyMatch) {
    meta.setAttribute("property", propertyMatch[1]);
  }

  document.head.appendChild(meta);
  return meta;
};

const usePageMetadata = (title: string, description: string, canonicalUrl?: string) => {
  useEffect(() => {
    document.title = title;
    if (canonicalUrl) {
      ensureCanonicalLink().href = canonicalUrl;
      setMetaContent('meta[property="og:url"]', canonicalUrl);
    }
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [canonicalUrl, description, title]);
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

const renderPrivacySections = (
  sections: readonly {
    title: string;
    body: string;
    items?: readonly string[];
    contactEmail?: boolean;
  }[]
) => (
  <>
    {sections.map((section) => (
      <section key={section.title}>
        <h2>{section.title}</h2>
        <p>
          {section.body}
          {section.contactEmail && <> <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</>}
        </p>
        {section.items && (
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </>
);

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

export const AboutPage = () => {
  const { search } = useLocation();
  const { language } = useLanguage();
  const copy = getSiteCopy(language);
  const storeBadgeUrls = getStoreBadgeUrls(language);
  const downloadCards = [
    {
      key: "app-store",
      title: copy.home.appStoreCardTitle,
      url: appStoreUrl,
      badgeUrl: storeBadgeUrls.appStore,
      badgeAlt: copy.home.appStoreBadgeAlt,
      qrUrl: appStoreQrCodeUrl,
      qrAlt: copy.home.appStoreQrAlt,
      qrDescription: copy.home.appStoreQrDescription,
      description: copy.home.appStoreDescription,
      buttonText: copy.home.downloadAppStore
    },
    {
      key: "google-play",
      title: copy.home.googlePlayCardTitle,
      url: playStoreUrl,
      badgeUrl: storeBadgeUrls.googlePlay,
      badgeAlt: copy.home.googlePlayBadgeAlt,
      qrUrl: googlePlayQrCodeUrl,
      qrAlt: copy.home.googlePlayQrAlt,
      qrDescription: copy.home.googlePlayQrDescription,
      description: copy.home.googlePlayDescription,
      buttonText: copy.home.downloadGooglePlay
    }
  ];
  const showcaseCards = copy.home.showcaseCards.map((card) => ({
    ...card,
    imageUrl: getFeatureShowcaseImageUrl(language, card.key)
  }));

  usePageMetadata(copy.metadata.homeTitle, copy.metadata.homeDescription);

  useEffect(() => {
    if (new URLSearchParams(search).get("download") === "1") {
      window.setTimeout(() => {
        document.getElementById("download-sakawi")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, [search]);

  return (
    <Layout>
      <Container className="page-container home-page">
        <section className="home-hero about-introduction-section" aria-labelledby="home-title">
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
            </div>
          </div>
          <div className="formula-section about-formula" aria-labelledby="formula-title">
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
          </div>
        </section>

        <section className="feature-section" aria-labelledby="features-title">
          <h2 id="features-title">{copy.home.featuresTitle}</h2>
          <div className="feature-showcase-grid">
            {showcaseCards.map((feature) => (
              <article className="feature-showcase-card" key={feature.key}>
                <img
                  className="feature-showcase-image"
                  src={feature.imageUrl}
                  alt={feature.imageAlt}
                  width="1200"
                  height="900"
                />
                <div className="sr-only">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="download-section" id="download-sakawi" aria-labelledby="download-sakawi-title">
          <div className="download-section-heading">
            <img className="hero-app-icon" src={appIconUrl} alt={copy.accessibility.appIconAlt} width="96" height="96" />
            <div>
              <h2 id="download-sakawi-title">{copy.home.downloadPanelTitle}</h2>
              <p>{copy.home.downloadPanelText}</p>
            </div>
          </div>
          <div className="app-download-grid">
            {downloadCards.map((card) => (
              <article className="app-download-card" key={card.key}>
                <h3>{card.title}</h3>
                <a
                  className="store-badge-link"
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={card.badgeAlt}
                >
                  <img
                    className={`store-badge store-badge-${card.key}`}
                    src={card.badgeUrl}
                    alt={card.badgeAlt}
                  />
                </a>
                <a
                  className="qr-card"
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={card.qrAlt}
                >
                  <img src={card.qrUrl} alt={card.qrAlt} width="160" height="160" />
                </a>
                <p className="qr-description">{card.qrDescription}</p>
                <p className="store-description">{card.description}</p>
                <a className="download-button store-download-button" href={card.url} target="_blank" rel="noopener noreferrer">
                  {card.buttonText}
                </a>
              </article>
            ))}
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

        {renderPrivacySections(copy.privacy.sections)}
      </Container>
    </Layout>
  );
};

export const ChamKeyboardPrivacyPage = () => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);

  usePageMetadata(
    copy.metadata.chamKeyboardPrivacyTitle,
    copy.metadata.chamKeyboardPrivacyDescription,
    "https://www.sakawi.com/cham-keyboard/privacy"
  );

  return (
    <Layout>
      <Container className="page-container public-page">
        <Breadcrumb current={copy.chamKeyboardPrivacy.title} />
        <p className="page-eyebrow">Cham Keyboard</p>
        <h1>{copy.chamKeyboardPrivacy.title}</h1>
        <p className="page-lede">{copy.chamKeyboardPrivacy.lede}</p>
        <p className="page-meta">{copy.chamKeyboardPrivacy.productLabel}</p>
        <p className="page-meta">{copy.chamKeyboardPrivacy.packageLabel}</p>
        <p className="page-meta">{copy.chamKeyboardPrivacy.updated}</p>

        {renderPrivacySections(copy.chamKeyboardPrivacy.sections)}
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
          <p>{copy.support.contactLabel}: <a href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
        </div>

        <section>
          <h2>{copy.support.installTitle}</h2>
          <p>{copy.support.installBody}</p>
          <div className="public-link-row">
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">{copy.shared.appStore}</a>
            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">{copy.shared.googlePlay}</a>
          </div>
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
