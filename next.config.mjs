/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  webpack(config, { isServer }) {
    // Add a rule to handle HTML files (for example, using raw-loader or file-loader)
    config.module.rules.push({
      test: /\.html$/,
      use: "raw-loader", // or 'file-loader' depending on your use case
    });

    return config;
  },
};

export default nextConfig;
