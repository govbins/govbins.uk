const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'serverless',
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_ROOT : '',
};
