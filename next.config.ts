/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  // webpack(config, { isServer }) {
  //   // Add a rule to handle HTML files (for example, using raw-loader or file-loader)
  //   config.module.rules.push({
  //     test: /\.html$/,
  //     use: "raw-loader", // or 'file-loader' depending on your use case
  //   });

  //   return config;
  // },
};

export default nextConfig;
