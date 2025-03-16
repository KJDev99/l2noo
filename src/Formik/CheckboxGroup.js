import React from "react";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CheckboxGroup({ label, name, options, ...rest }) {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const handleChange = (optionValue) => {
    if (value.includes(optionValue)) {
      setValue(value.filter((item) => item !== optionValue));
    } else {
      setValue([...value, optionValue]);
    }
  };

  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={meta.touched && Boolean(meta.error)}
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                id={option.value}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
                {...rest}
              />
            }
            label={option.key}
          />
        ))}
      </FormGroup>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CheckboxGroup;

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};
