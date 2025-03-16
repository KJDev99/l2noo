import React from "react";
import PropTypes from "prop-types";
import { DefaultSeo } from "next-seo";
import NProgress from "nprogress";
import Router from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";
import withMetrika from "../src/Metrika";

import SEO from "../next-seo.config";

import "nprogress/nprogress.css";
import ContextWrapper from "../components/ContextWrapper";
import MainLayout from "@/layout/Main";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  React.useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeDone);
    Router.events.on("routeChangeError", handleRouteChangeDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeDone);
      Router.events.off("routeChangeError", handleRouteChangeDone);
    };
  }, []);

  return (
    <ContextWrapper>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout {...pageProps}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MainLayout>
      </ThemeProvider>
    </ContextWrapper>
  );
}

export default withMetrika("49770901")(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
