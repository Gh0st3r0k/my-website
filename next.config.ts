import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  // Keep type checking in-process; CLI output is unavailable in some cloud runners.
  experimental: { useTypeScriptCli: false },
};
export default nextConfig;
