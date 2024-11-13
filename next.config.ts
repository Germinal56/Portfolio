import { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
/*
const nextConfig: NextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enable the analyzer only when ANALYZE=true
})({
  // Other Next.js configurations can go here
  reactStrictMode: true, // Example configuration
});
*/

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
