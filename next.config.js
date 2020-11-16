const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'serverless',
  images: {
    path: isProd ? process.env.NEXT_PUBLIC_ASSET_ROOT : '/images',
  }
};
