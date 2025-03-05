import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  basePath: "/clarifi",
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages
  trailingSlash: true,
};

export default config;
