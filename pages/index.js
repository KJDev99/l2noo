import { NextSeo } from "next-seo";
import fetch from "isomorphic-unfetch";
import WorldsList from "components/WorldsList";
import SidebarLayout from "layout/Sidebar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React from "react";
import { styled } from "@mui/system";
import queryString, { stringify } from "query-string";
import useSWR from "swr";

// MUI 5 da makeStyles ni styled bilan almashtiramiz
const PaperStyled = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderTop: "1px solid #ECF5F8",
  borderRadius: "unset",
}));

const fetcher = async function (...args) {
  const res = await fetch(...args);
  return res.json();
};

const Index = ({ query, worlds, title, description, content }) => {
  const SEO = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
    },
  };

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/worlds?${queryString.stringify(query, {
      skipEmptyString: true,
    })}`,
    fetcher,
    { initialData: worlds, revalidateOnMount: true }
  );

  return (
    <>
      <NextSeo {...SEO} />

      <WorldsList worlds={data} />
      {content && (
        <PaperStyled elevation={0}>
          <Box m={3} dangerouslySetInnerHTML={{ __html: content }} />
        </PaperStyled>
      )}
    </>
  );
};

Index.Layout = SidebarLayout;

export async function getStaticProps(ctx) {
  const slug = ctx.params?.slug || "/";
  const clarification = ctx.params?.clarification;

  const [pageData, chroniclesData, labelsData] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages?slug=${
        slug + (clarification ? "/" + clarification : "")
      }`
    ).then((r) => r.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chronicles?filter[show_in_sidebar]=1&sort=sort`
    ).then((r) => r.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/labels`).then((r) => r.json()),
  ]);

  const query = pageData.meta?.query || [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/worlds?${queryString.stringify(query, {
      skipEmptyString: true,
    })}`
  );
  const worldsData = await res.json();

  return {
    props: {
      h1: pageData.name || null,
      title: pageData.title || null,
      description: pageData.description || null,
      content: pageData.content || null,
      query: query || null,
      worlds: worldsData,
      labels: labelsData,
      chronicles: chroniclesData,
    },
    revalidate: 20,
  };
}

export default Index;
