const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Deshabilitar HMR y WebSocket en desarrollo
      config.devServer = config.devServer || {};
      config.devServer.hot = false;
      config.devServer.webSocketServer = false;
    }
    return config;
  },
  images: {
    domains: [
      "images.unsplash.com",
      "s3.us-west-2.amazonaws.com",
      "dig0ubfhli3b0.cloudfront.net",
    ],
  },
  compiler: {
    styledComponents: false,
  },
  // ...(process.env.NODE_ENV === "production" ? { assetPrefix: "https://superaudio.online" } : {}),
  env: {
    ALGOLIA_APP_ID: "XLHDMY0KME",
    ALGOLIA_API_KEY: "2eef844f139e96fb4b3442d62e8bdbd9",
  },
};

module.exports = nextConfig;