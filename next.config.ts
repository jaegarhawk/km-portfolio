import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const repoName = '/km-portfolio';

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd ? repoName : "",
  assetPrefix: isProd ? `${repoName}/` : "",
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;
