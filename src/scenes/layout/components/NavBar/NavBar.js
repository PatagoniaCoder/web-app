import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import "./styles.scss";

const NavBar = ({ t, logout }) => {
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Navbar.Brand>
        <Container fluid>
          <Row>
            <Col>
              <img
                alt=""
                src="/logo512.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
              />
              {"Template Project"}
            </Col>
          </Row>
        </Container>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Button type="button" onClick={() => logout()}>
          {t("logout")}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
