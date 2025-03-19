import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";

function FormikSelect({ label, name, options, ...rest }) {
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        {...field}
        {...rest}
        MenuProps={{
          disableScrollLock: true,
        }}
      >
        {Array.isArray(options) &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>
        {meta.touched && meta.error ? meta.error : ""}
      </FormHelperText>
    </FormControl>
  );
}

export default FormikSelect;

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};
