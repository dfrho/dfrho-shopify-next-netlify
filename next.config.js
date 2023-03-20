require('dotenv').config();

module.exports = {
  env: {
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    NEXT_PUBLIC_SHOPIFY_API_ENDPOINT:
      process.env.NEXT_PUBLIC_SHOPIFY_API_ENDPOINT,
    NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX:
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX,
    NEXT_PUBLIC_REACT_APP_OPEN_AI_API_KEY:
      process.env.NEXT_PUBLIC_REACT_APP_OPEN_AI_API_KEY,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
};
