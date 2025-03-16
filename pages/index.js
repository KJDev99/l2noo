// pages/index.js
import { NextSeo } from "next-seo";
import fetch from "isomorphic-unfetch";
import WorldsList from "@/components/WorldsList";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import queryString, { stringify } from "query-string";
import useSWR from "swr";
import SidebarLayout from "@/layout/Sidebar";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderTop: "1px solid #ECF5F8",
  borderRadius: 0,
}));

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const Index = ({ query, worlds, title, description, content }) => {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const { data } = useSWR(
    `${NEXT_PUBLIC_API_URL}/worlds?${queryString.stringify(query, {
      skipEmptyString: true,
    })}`,
    fetcher,
    { fallbackData: worlds, revalidateOnMount: true }
  );

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <WorldsList worlds={data} />
      {content && (
        <StyledPaper elevation={0}>
          <Box m={3} dangerouslySetInnerHTML={{ __html: content }} />
        </StyledPaper>
      )}
    </>
  );
};

Index.Layout = SidebarLayout;

export async function getStaticProps() {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const res = await fetch(`https://api.l2noo.ru/worlds`);
  const worldsData = await res.json();

  return {
    props: {
      title: "Worlds Page",
      description: "Explore different worlds",
      content: null,
      query: {},
      worlds: worldsData,
    },
    revalidate: 20,
  };
}

export default Index;
