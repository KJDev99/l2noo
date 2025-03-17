"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import FormikFeature from "src/Formik/FormikFeature";

function StepFeatureForm({ featureOptions }) {
  const { values } = useFormikContext();

  return (
    <>
      <Grid>
        <Typography variant="body2" paragraph>
          Выберите желаемый тип размещения. Все VIPы закрепляются над всеми
          серверами и более заметны для игроков. Помимо этого, VIPы размещаются
          сразу после оплаты, а модерация обычного размещения может занять сутки
          и более.
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormikFeature name="feature" label="" options={featureOptions} />
        </Grid>
        <Grid item xs={12} sm={6}>
          {featureOptions.map((option) =>
            option.value === values.feature ? (
              <React.Fragment key={option.value}>
                <Advantages advantages={option.advantages} />
                <Disadvantages disadvantages={option.disadvantages} />
              </React.Fragment>
            ) : null
          )}
        </Grid>
      </Grid>
    </>
  );
}

function Advantages({ advantages }) {
  if (!advantages.length) return null;

  return (
    <>
      <Typography variant="subtitle1">Преимущества:</Typography>
      <ul>
        {advantages.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
    </>
  );
}

function Disadvantages({ disadvantages }) {
  if (!disadvantages.length) return null;

  return (
    <>
      <Typography variant="subtitle1">Недостатки:</Typography>
      <ul>
        {disadvantages.map((disadvantage, index) => (
          <li key={index}>{disadvantage}</li>
        ))}
      </ul>
    </>
  );
}

export default StepFeatureForm;

StepFeatureForm.propTypes = {
  featureOptions: PropTypes.array.isRequired,
};
