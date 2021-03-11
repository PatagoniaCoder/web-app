import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import Form from "react-bootstrap/Form";

import "./styles.scss";

const TextInput = ({
  label,
  controlId,
  name,
  onChange,
  inputType,
  isAmount,
  placeholder,
  additionalInfo,
  value,
  readOnly,
  formikClasses,
  onBlur,
}) => {
  return (
    <>
      <Form.Group className="textInput" controlId={controlId}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          onChange={onChange}
          autoComplete="off"
          type={inputType ? inputType : "text"}
          placeholder={placeholder ? placeholder : ""}
          className={`textInput ${formikClasses} ${isAmount && "text-right"}`}
          value={value}
          readOnly={readOnly ? true : false}
          name={name}
          onBlur={onBlur}
        />
        {additionalInfo && (
          <Form.Text className="text-muted">{additionalInfo}</Form.Text>
        )}
      </Form.Group>
    </>
  );
};
TextInput.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  additionalInfo: PropTypes.string,
  isAmount: PropTypes.bool,
  formikClasses: PropTypes.string,
};
export default TextInput;
