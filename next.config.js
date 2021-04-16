/* eslint-disable @typescript-eslint/no-var-requires */
/* next.config.js */
const webpack = require('webpack')

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: 'empty',
      }
    }
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }, {})
    config.plugins.push(new webpack.DefinePlugin(env))
    return config
  },
  reactStrictMode: true,
  isServer: true,
  images: {
    domains: [
      'recipeinapod-cf37c.appspot.com',
      'firebasestorage.googleapis.com',
    ],
  },
}
