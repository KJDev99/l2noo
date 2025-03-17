import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import FormikSelect from "components/Formik/FormikSelect";
import FormikInput from "components/Formik/FormikInput";
import CheckboxGroup from "components/Formik/CheckboxGroup";
import FormikDate from "components/Formik/FormikDate";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function AddWorldForm({ chronicleOptions, labelOptions }) {
  const initialValues = {
    link: "",
    chronicle: "",
    labels: [],
    rate: "",
    date: null,
  };

  const validationSchema = Yup.object({
    link: Yup.string()
      .url("To‘g‘ri URL kiriting")
      .required("Loyiha URL manzilini kiriting"),
    chronicle: Yup.string()
      .uuid("Noto‘g‘ri UUID format")
      .required("Xronikani tanlang"),
    labels: Yup.array(),
    rate: Yup.string().required("Loyiha reytingini kiriting"),
    date: Yup.date("Noto‘g‘ri sana formati").required(
      "Ochilish sanasini tanlang"
    ),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/worlds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.status === 204) {
        alert("Server moderatsiyaga yuborildi!");
      } else {
        const body = await res.json();
        alert(body.message);
      }
    } catch (err) {
      alert("Xatolik yuz berdi: " + err.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Box pb={2}>
                <FormikInput
                  type="url"
                  name="link"
                  label="Loyiha havolasi"
                  helperText="Ichki sahifalar va UTM teglarini ishlatish mumkin"
                />
              </Box>
              <Box pb={2}>
                <FormikSelect
                  label="Xronikalar"
                  name="chronicle"
                  options={chronicleOptions}
                />
              </Box>
              <Box pb={2}>
                <FormikInput type="text" name="rate" label="Reyting" />
              </Box>
              <Box py={2}>
                <CheckboxGroup
                  name="labels"
                  label="Loyiha xususiyatlari"
                  options={labelOptions}
                />
              </Box>
            </Grid>
            <Grid item sm={4}>
              <FormikDate name="date" label="Ochilish sanasi" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default AddWorldForm;

AddWorldForm.propTypes = {
  chronicleOptions: PropTypes.array.isRequired,
  labelOptions: PropTypes.array.isRequired,
};
