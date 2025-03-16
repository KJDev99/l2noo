import { useEffect } from "react";
import { useRouter } from "next/router";
import ym, { YMInitializer } from "react-yandex-metrika";
import Head from "next/head";

const YandexMetrika = (code) => (Page) => {
  const WithAnalytics = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV === "production"
      ) {
        const handleRouteChange = (url) => {
          ym("hit", url);
        };

        handleRouteChange(window.location.pathname + window.location.search);
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
          router.events.off("routeChangeComplete", handleRouteChange);
        };
      }
    }, [router.events]);

    return (
      <>
        {process.env.NODE_ENV === "production" && (
          <Head>
            <YMInitializer
              accounts={[parseInt(code)]}
              options={{ webvisor: true, defer: true }}
              version="2"
            />
          </Head>
        )}
        <Page {...props} />
      </>
    );
  };

  if (Page.getInitialProps) {
    WithAnalytics.getInitialProps = Page.getInitialProps;
  }

  return WithAnalytics;
};

export default YandexMetrika;
