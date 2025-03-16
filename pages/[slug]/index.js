import Index, { getStaticProps } from "../index";
import useSWR from "swr";

export default Index;
export { getStaticProps };

export const getStaticPaths = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const [chroniclesData, labelsData] = await Promise.all([
    fetcher(`${NEXT_PUBLIC_API_URL}/chronicles?filter[generate_page]=1`),
    fetcher(`${NEXT_PUBLIC_API_URL}/labels`),
  ]);

  const paths = [
    ...chroniclesData.map(({ slug }) => ({ params: { slug } })),
    ...labelsData.map(({ slug }) => ({ params: { slug } })),
  ];

  return {
    fallback: "blocking",
    paths,
  };
};
