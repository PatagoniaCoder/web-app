import { Button, Col, Row, Container } from "react-bootstrap";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { authActions } from "../../state/ducks/auth";
import "./styles.scss";

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={12}>
            <div style={{ textAlign: "center" }}>
              <h1>Dashboard page</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapDispatchToProps = ({ auth }) => ({ auth });
export default compose(
  connect(mapDispatchToProps, { ...authActions }),
  withTranslation()
)(Dashboard);
