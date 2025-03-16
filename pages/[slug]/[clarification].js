import Index, { getStaticProps } from "../index";

export default Index;
export { getStaticProps };

export const getStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [{ params: { slug: "interlude", clarification: "plus" } }],
  };
};
