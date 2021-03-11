import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { authActions } from "../../../../state/ducks/auth/";
import "./styles.scss";
import {
  TextInput,
  PasswordInput,
  LoaderSpinner,
  AlertMessage,
} from "../../../../components";
const initialValues = {
  password: "",
  email: "",
};

const FormLogin = ({ t, login, history, auth, clear }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    clear()
  }, []);
  const SigninSchema = Yup.object().shape({
    password: Yup.string().required(t("loginScreen.enterYourPassword")),
    email: Yup.string()
      .email(t("loginScreen.wrongEmailFormat"))
      .required(t("loginScreen.enterYourEmail")),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      login({
        data: values,
        callback: (success, error) => {
          if (success) {
            history.push("/dashboard");
          } else {
            setErrorMessage(error);
            setShowErrorMessage(true);
          }
        },
      });
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <TextInput
          name="email"
          inputType="email"
          className="textInput"
          placeholder={t("loginScreen.email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formikClasses={getInputClasses("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <Row>
            <Col className="formikError">
              <small>{formik.errors.email}</small>
            </Col>
          </Row>
        ) : null}
        <PasswordInput
          name="password"
          showPassword={showPassword}
          placeholder={t("loginScreen.password")}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formikClasses={getInputClasses("password")}
          setShowPassword={setShowPassword}
        />

        {formik.touched.password && formik.errors.password ? (
          <Row>
            <Col className="formikError">
              <small>{formik.errors.password}</small>
            </Col>
          </Row>
        ) : null}
        <Link to="/password-recovery">
          <p> {t("loginScreen.forgotPassword")} </p>
        </Link>
        <Container fluid>
          <Row>
            <Col>
              <div className="w-50 p-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={auth.loading}
                >
                  {t("login")} {auth.loading && <LoaderSpinner />}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/register" className="w-50 p-2">
                <Button type="button" variant="secondary" className="w-100">
                  {t("signin")}
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Form>
      <AlertMessage
        show={showErrorMessage}
        message={errorMessage}
        messagetitle={"Hubo un error al intentar ingresar"}
        header={"Error"}
        onHide={() => setShowErrorMessage(false)}
      />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default compose(
  connect(mapStateToProps, { ...authActions }),
  withTranslation()
)(FormLogin);
