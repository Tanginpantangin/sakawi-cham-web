import { Card, Col, Container, ListGroup, Nav, Navbar, Row } from "react-bootstrap";

interface LayoutProps {
    children: JSX.Element;
}

const footerStyle: React.CSSProperties = {
    background: "#20232a",
    color: "white",
    padding: "15px",
    textAlign: "center",
    justifyContent: "center"
}

export const Layout = (props: LayoutProps) => {
    return (
        <Container fluid>
            {/* Header */}
            <Row>
                <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="#home"><label className="logo">꩜</label><label className="branding-text">SAKAWI</label></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll>
                                <Nav.Link href="#">Trang chủ</Nav.Link>
                                <Nav.Link href="#">Tiện ích</Nav.Link>
                                <Nav.Link href="#">Tài liệu</Nav.Link>
                                <Nav.Link href="#">Blog</Nav.Link>
                                <Nav.Link href="#">Hướng dẫn</Nav.Link>
                                <Nav.Link href="#">Chúng tôi</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <br />
            {/* Body */}
            <Row>
                <Col sm={2}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>Lịch tháng</ListGroup.Item>
                            <ListGroup.Item>Lịch năm</ListGroup.Item>
                            <ListGroup.Item>Sự kiện trong năm</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col sm={10}>
                    {props.children}
                </Col>
            </Row>
            {/* Fotter */}
            <Row>
                <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <p style={footerStyle}>{`© ${new Date().getFullYear()} Sakawi`}</p>
                </Col>
            </Row>
        </Container >
    );
}