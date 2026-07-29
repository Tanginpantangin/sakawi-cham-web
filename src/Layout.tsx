import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SiteLanguage, useLanguage } from "./i18n";
import { appIconUrl, getSiteCopy, playStoreUrl } from "./siteContent";

interface LayoutProps {
    children: JSX.Element;
}

const publicLinks = [
    { to: "/", key: "home" },
    { to: "/documents", key: "documents" },
    { to: "/privacy", key: "privacy" },
    { to: "/support", key: "support" },
    { to: "/releases", key: "releases" },
] as const;

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
    const { language, setLanguage } = useLanguage();
    const copy = getSiteCopy(language);

    const handleSetLanguage = (nextLanguage: SiteLanguage) => {
        setLanguage(nextLanguage);
    };

    return (
        <div className={compact ? "language-switch language-switch-compact" : "language-switch"} role="group" aria-label={copy.nav.languageLabel}>
            <Button
                type="button"
                variant="link"
                className="language-option"
                aria-label={`Tiếng Việt${language === "vi" ? `, ${copy.accessibility.currentLanguage}` : ""}`}
                aria-pressed={language === "vi"}
                onClick={() => handleSetLanguage("vi")}
            >
                VI
            </Button>
            <Button
                type="button"
                variant="link"
                className="language-option"
                aria-label={`English${language === "en" ? `, ${copy.accessibility.currentLanguage}` : ""}`}
                aria-pressed={language === "en"}
                onClick={() => handleSetLanguage("en")}
            >
                EN
            </Button>
        </div>
    );
};

const Brand = ({ compact = false }: { compact?: boolean }) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);

    return (
        <span className={compact ? "brand brand-compact" : "brand"}>
            <span className="brand-mark-wrap">
                <img className="brand-mark" src={appIconUrl} alt="" width="40" height="40" />
            </span>
            <span className="branding-text">{copy.shared.productName}</span>
        </span>
    );
};

const SiteHeader = () => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);

    return (
        <header className="site-header">
            <Navbar bg="light" expand="lg" className="app-navbar" collapseOnSelect>
                <Container className="site-frame">
                    <Navbar.Brand as={NavLink} to="/" end aria-label={copy.shared.homeLabel}>
                        <Brand />
                    </Navbar.Brand>
                    <div className="header-actions-mobile">
                        <LanguageSwitcher compact />
                        <Navbar.Toggle aria-controls="site-navigation" label={copy.nav.menuLabel} />
                    </div>
                    <Navbar.Collapse id="site-navigation">
                        <Nav className="site-nav" aria-label={copy.nav.navLabel}>
                            {publicLinks.map((link) => (
                                <Nav.Link key={link.to} as={NavLink} to={link.to} end={link.to === "/"}>
                                    {copy.nav[link.key]}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <a className="download-button download-button-mobile" href={playStoreUrl} target="_blank" rel="noreferrer">
                            {copy.nav.download}
                        </a>
                        <div className="header-actions">
                            <LanguageSwitcher />
                            <a className="download-button" href={playStoreUrl} target="_blank" rel="noreferrer">
                                {copy.nav.download}
                            </a>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

const SiteFooter = () => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <Container className="site-frame footer-frame">
                <div className="footer-brand">
                    <NavLink to="/" className="footer-brand-link" aria-label={copy.shared.homeLabel}>
                        <Brand compact />
                    </NavLink>
                    <p>{copy.footer.description}</p>
                </div>
                <nav className="footer-nav" aria-label={copy.nav.navLabel}>
                    {publicLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === "/"}>
                            {copy.nav[link.key]}
                        </NavLink>
                    ))}
                    <a href={playStoreUrl} target="_blank" rel="noreferrer">{copy.shared.googlePlay}</a>
                </nav>
                <p className="footer-copyright">{`${copy.footer.copyright} © ${currentYear} ${copy.shared.productName}`}</p>
            </Container>
        </footer>
    );
};

export const Layout = (props: LayoutProps) => {
    return (
        <div className="app-shell">
            <SiteHeader />
            <main className="app-main">
                <div className="site-frame main-frame">
                    {props.children}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
