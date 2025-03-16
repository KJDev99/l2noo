import React from "react";
import { NextSeo } from "next-seo";
import { makeStyles } from "@mui/styles";
import WithoutSidebarLayout from "@/layout/WithoutSidebar";

const statusCodes = {
  400: "Неверный запрос",
  404: "Страница не найдена",
  405: "Метод не поддерживается",
  500: "Внутренняя ошибка сервера",
};

const useStyles = makeStyles(() => ({
  root: {
    color: "#000",
    background: "#fff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    display: "inline-block",
    textAlign: "left",
    lineHeight: "49px",
    height: "49px",
    verticalAlign: "middle",
  },
  h1: {
    display: "inline-block",
    margin: 0,
    padding: "10px 0",
    fontSize: "24px",
    fontWeight: 500,
    verticalAlign: "top",
  },
  h2: {
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "inherit",
    margin: 0,
    padding: 0,
  },
}));

function Error({ statusCode }) {
  const classes = useStyles();

  const title = statusCodes[statusCode] || "An unexpected error has occurred";

  const SEO = {
    title: statusCode + ": " + title,

    openGraph: {
      title: statusCode + ": " + title,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />

      <div className={classes.root}>
        {statusCode && <h1 className={classes.h1}>{statusCode}</h1>}
        <div className={classes.desc}>
          <h2 className={classes.h2}>{title}</h2>
        </div>
      </div>
    </>
  );
}

Error.Layout = WithoutSidebarLayout;

Error.getInitialProps = ({ res, err }) => {
  const statusCode =
    res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
