import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { TextField, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";

function FormikDate({ label, name, ...rest }) {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
          label={label}
          value={field.value || null}
          onChange={(val) => setValue(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
          {...rest}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default FormikDate;

FormikDate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
