import { Card, Col, Container, Row, ListGroup, Navbar, Nav, NavDropdown } from "react-bootstrap";

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
            <Col>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#home">SAKAWI CHAM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </Col>
            </Row>
            <br/>
            {/* Body */}
            <Row>
                <Col sm={2}>
                    <Card>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col sm={9}>
                    {props.children}
                </Col>
                <Col sm={1}></Col>
            </Row>
            {/* Fotter */}
            <Row>
                <Col>
                    <p style={footerStyle}>{`© ${new Date().getFullYear()} Sakawi Cham`}</p>
                </Col> 
            </Row>
        </Container>
    );
}