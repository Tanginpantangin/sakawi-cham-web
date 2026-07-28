import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

interface LayoutProps {
    children: JSX.Element;
}

export const Layout = (props: LayoutProps) => {
    return (
        <Container fluid className="app-shell">
            {/* Header */}
            <Row>
                <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <Navbar bg="dark" variant="dark" expand="lg" className="app-navbar">
                        <Container>
                            <Navbar.Brand href="/"><label className="logo">꩜</label><label className="branding-text">SAKAWI</label></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
                                    <Nav.Link href="#/months">Lịch tháng</Nav.Link>
                                    <Nav.Link href="#/events">Lịch sự kiện</Nav.Link>
                                    <Nav.Link href="#/docs">Tài liệu</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
            {/* Body */}
            <Row className="app-main">
                <Col sm={12} md={12} lg={12}>
                    {props.children}
                </Col>
            </Row>
            {/* Footer */}
            <Row>
                <Col className="app-footer">
                    {`© ${new Date().getFullYear()} Sakawi - Lịch Cham`}
                    <br />
                    <a href="/privacy">Chính sách quyền riêng tư</a>
                    {' | '}
                    <a href="/support">Hỗ trợ</a>
                    {' | '}
                    <a href="https://play.google.com/store/apps/details?id=com.sakawi.cham" target="_blank" rel="noreferrer">Google Play</a>
                </Col>
            </Row>
        </Container>
    );
}
