import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import { compose } from "redux";
import { RouteWithSubRoutes } from "../../config/routes";
import { authActions } from "../../state/ducks/auth";
import { NavBar, SideBar } from "./components/";
import "./styles.scss";

class Layout extends Component {
  render() {
    const { t, routes, history, logout } = this.props;
    return (
      <Container fluid className="layout">
        <Row>
          <Col>
            <NavBar t={t} logout={logout} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SideBar history={history} />
          </Col>
          <Col lg={10}>
            <Switch>
              {routes.map((route) => (
                <RouteWithSubRoutes key={`${route.path}`} {...route} />
              ))}
              <Redirect to="dashboard" />
            </Switch>
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
)(Layout);
