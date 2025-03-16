import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import clsx from "clsx";

const VipVariant = styled(FormControlLabel)(({ theme }) => ({
  margin: "unset",
  backgroundColor: "#ECF5F8",
  borderRadius: 5,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  width: "100%",
}));

const AvatarBox = styled(Box)({
  width: 40,
  height: 40,
  display: "flex",
  position: "relative",
  alignItems: "center",
  flexShrink: 0,
  justifyContent: "center",
});

const BadgeWrapper = styled(Box)(({ type }) => ({
  display: "flex",
  alignItems: "center",
  margin: "10px 0",
  height: 17,
  color: "#2D2D2D",
  ...(type === "BLUE" && {
    background:
      "linear-gradient(to left, rgba(0, 186, 255, 1.0), rgba(0, 103, 194, 1.0))",
    height: 27,
    color: "#ffffff",
    margin: "5px -5px",
    padding: "0 5px",
    borderRadius: 3,
  }),
}));

const Badge = styled("i")(({ type }) => ({
  display: "block",
  height: 17,
  width: 27,
  fontFamily: "'PT Sans', sans-serif",
  fontWeight: "bold",
  fontSize: "12px",
  ...(type === "ORANGE" && {
    background: "#FF721C",
    borderRadius: 3,
    content: "'VIP'",
    color: "#ffffff",
  }),
  ...(type === "OBT" && {
    background: "#ECF5F8",
    borderRadius: 3,
    content: "'ОБТ'",
  }),
}));

function FormikFeature({ label, name, options, ...rest }) {
  const [field, meta] = useField(name);

  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={meta.touched && Boolean(meta.error)}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <RadioGroup name={name} {...field} {...rest}>
        {options.map((option) => (
          <VipVariant
            key={option.value}
            value={option.value}
            control={<Radio />}
            labelPlacement="start"
            label={
              <VariantLabel
                name={option.name}
                type={option.value}
                info={option.info}
              />
            }
          />
        ))}
      </RadioGroup>
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
}

export function VariantLabel({ name, type, info }) {
  return (
    <Grid container wrap="nowrap" spacing={2} alignItems="center">
      <Grid item>
        <AvatarBox>
          <BadgeWrapper type={type}>
            <Badge type={type} />
          </BadgeWrapper>
        </AvatarBox>
      </Grid>
      <Grid item xs>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="caption" color="textSecondary">
          {info}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FormikFeature;

FormikFeature.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
};
