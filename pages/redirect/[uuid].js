import { NextSeo } from "next-seo";
import MainLayout from "layout/Main";

const Uuid = () => {
  const SEO = {
    title: "Переадресация",
    description: "Страница перенаправляет пользователя на внешний ресурс",
    openGraph: {
      title: "Переадресация",
      description: "Страница перенаправляет пользователя на внешний ресурс",
    },
  };

  return <NextSeo {...SEO} />;
};

Uuid.Layout = MainLayout;

export async function getServerSideProps(context) {
  const { uuid } = context.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/redirect/${uuid}`
  );
  const data = await res.json();

  if (!data?.url) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: data.url,
      permanent: false,
    },
  };
}

export default Uuid;
