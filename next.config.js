const { PHASE_DEVELOPMENT_SERVER } = require('next/dist/shared/lib/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const env = {
    END_POINT_URL: isDev
      ? 'http://localhost:3001/api'
      : 'https://nice-blue-gosling-kit.cyclic.app/api',
  };

  return {
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    env,
  };
};
