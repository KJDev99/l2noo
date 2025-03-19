import React, { useState } from "react";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaymentIcon from "@mui/icons-material/Payment";
import Typography from "@mui/material/Typography";
import Link from "next/link";

function WorldAddForm({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const isLastStep = () => step === childrenArray.length - 1;
  const currentChild = childrenArray[step];

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/worlds`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }
            );

            const data = await res.json();
            if (res.ok) {
              if (data.paymentUrl) {
                setRedirectUrl(data.paymentUrl);
                window.open(data.paymentUrl, "_blank");
              }
              setCompleted(true);
            } else {
              alert(data.message);
            }
          } catch (error) {
            alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
          }
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper activeStep={step}>
            {Array.isArray(childrenArray) &&
              childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
          </Stepper>

          {completed ? (
            <>
              {redirectUrl ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" paragraph>
                      Оплата VIP статуса
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" paragraph>
                      Нажмите на кнопку ниже, если страница с формой оплаты не
                      открылась автоматически.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link
                      href={redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PaymentIcon />}
                      >
                        Оплатить
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" paragraph>
                      Проект отправлен на модерацию
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" paragraph>
                      Ваш проект отправлен на модерацию и будет проверен в
                      течение 24 часов.
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </>
          ) : (
            <>
              {currentChild}

              <Grid container spacing={2}>
                {step > 0 && (
                  <Grid item>
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      onClick={() => setStep((s) => s - 1)}
                      startIcon={<ArrowBackIcon />}
                    >
                      Назад
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    endIcon={
                      !isSubmitting && !isLastStep() ? (
                        <ArrowForwardIcon />
                      ) : null
                    }
                  >
                    {isSubmitting
                      ? "Отправка..."
                      : isLastStep()
                      ? "Подтвердить"
                      : "Далее"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default WorldAddForm;

WorldAddForm.propTypes = {
  chronicleOptions: PropTypes.array,
  labelOptions: PropTypes.array,
};
