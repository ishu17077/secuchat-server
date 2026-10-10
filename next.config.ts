import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: [
        "192.168.0.153", 
        "192.168.1.153",
        "localhost",
    ],
};

export default nextConfig;
