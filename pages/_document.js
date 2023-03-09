import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css"
          />
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                ${
                  typeof window === 'undefined'
                    ? `
                      algoliasearchNetlify({
                        appId: '30UDJGPUBP',
                        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
                        siteId: '9f739a59-c001-4005-8110-306032c23340',
                        branch: process.env.HEAD,
                        selector: 'div#search',
                      });
                    `
                    : ''
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
