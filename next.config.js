require('dotenv').config();

module.exports = {
  env: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    SHOPIFY_API_ENDPOINT: process.env.SHOPIFY_API_ENDPOINT,
    ALGOLIA_SEARCH_INDEX: process.env.ALGOLIA_SEARCH_INDEX,
    REACT_APP_OPEN_AI_API_KEY: process.env.REACT_APP_OPEN_AI_API_KEY,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
};
