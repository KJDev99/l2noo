import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { TextField } from "@mui/material";

function FormikInput({ label, name, helperText, ...rest }) {
  const [field, meta] = useField(name);

  return (
    <TextField
      fullWidth
      id={name}
      label={label}
      {...field}
      {...rest}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : helperText}
    />
  );
}

export default FormikInput;

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};
