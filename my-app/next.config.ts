import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,   // 🔑 disables Image Optimization
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
                port: "",
                pathname: "/**",
            },
        ],
    },

};

export default nextConfig;
