import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormikInput from "src/Formik/FormikInput";
import FormikSelect from "src/Formik/FormikSelect";
import CheckboxGroup from "src/Formik/CheckboxGroup";
import FormikDate from "src/Formik/FormikDate";

function StepWorldForm({ chronicleOptions, labelOptions }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm>
        <Box pb={2}>
          <FormikInput
            type="url"
            name="link"
            label="Ссылка на проект"
            helperText="Можно использовать UTM метки и ссылки на внутренние страницы"
          />
        </Box>

        <Box pb={2}>
          <FormikSelect
            label="Хроники"
            name="chronicle"
            options={chronicleOptions}
          />
        </Box>

        <Box pb={2}>
          <FormikInput type="text" name="rate" label="Рейты" />
        </Box>

        <Box py={2}>
          <CheckboxGroup
            name="labels"
            label="Особенности проекта"
            options={labelOptions}
          />
        </Box>
      </Grid>

      <Grid item>
        <FormikDate
          name="date"
          label="Дата открытия"
          variant="static"
          disableToolbar
        />
      </Grid>
    </Grid>
  );
}

export default StepWorldForm;

StepWorldForm.propTypes = {
  chronicleOptions: PropTypes.array.isRequired,
  labelOptions: PropTypes.array.isRequired,
};
