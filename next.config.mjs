import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      layout: path.join(__dirname, "layout"),
      components: path.join(__dirname, "components"),
      contexts: path.join(__dirname, "contexts"),
      public: path.join(__dirname, "public"),
    };
    return config;
  },
  async redirects() {
    return [
      { source: "/chronicle/c4", destination: "/c4", permanent: true },
      {
        source: "/chronicle/classic",
        destination: "/classic",
        permanent: true,
      },
      {
        source: "/chronicle/epilogue",
        destination: "/epilogue",
        permanent: true,
      },
      {
        source: "/chronicle/ertheia",
        destination: "/ertheia",
        permanent: true,
      },
      { source: "/chronicle/final", destination: "/final", permanent: true },
      { source: "/chronicle/freya", destination: "/freya", permanent: true },
      {
        source: "/chronicle/g-crusade",
        destination: "/g-crusade",
        permanent: true,
      },
      { source: "/chronicle/god", destination: "/god", permanent: true },
      { source: "/chronicle/helios", destination: "/helios", permanent: true },
      {
        source: "/chronicle/high-five",
        destination: "/high-five",
        permanent: true,
      },
      {
        source: "/chronicle/interlude",
        destination: "/interlude",
        permanent: true,
      },
      {
        source: "/chronicle/interludeplus",
        destination: "/interlude/plus",
        permanent: true,
      },
      {
        source: "/chronicle/lindvior",
        destination: "/lindvior",
        permanent: true,
      },
      {
        source: "/chronicle/odyssey",
        destination: "/odyssey",
        permanent: true,
      },
      {
        source: "/chronicle/salvation",
        destination: "/salvation",
        permanent: true,
      },
      { source: "/top", destination: "/l2top", permanent: true },
      { source: "/add-vip", destination: "/add-world", permanent: true },
    ];
  },
};
