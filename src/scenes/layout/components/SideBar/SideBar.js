import React from "react";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import "./styles.scss";
import { ItemMenu } from "./ItemMenu/ItemMenu";

const SideBar = ({ history }) => {
  return (
    <Container className="sidebar">
      <Row>
        <Col>
          <Accordion>
            {ItemMenu.map((item, k) => {
              return (
                <Card key={k} lg={12}>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      onClick={() => history.push(item.link)}
                      variant="link"
                      eventKey={item.id}
                    >
                      {item.title}
                    </Accordion.Toggle>
                  </Card.Header>
                  {item.sub_menu && (
                    <Accordion.Collapse
                      onClick={() => history.push(item.link)}
                      eventKey={item.id}
                    >
                      <Card.Body>{item.sub_menu.title}</Card.Body>
                    </Accordion.Collapse>
                  )}
                </Card>
              );
            })}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;
