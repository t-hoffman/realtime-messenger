/** @type {import('next').NextConfig} */
const nextConfig = {
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
