import Head from 'next/head';
import ProductListing from '@components/ProductListing';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { getProductList } from 'netlify/functions/utils/getProductList.js';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

console.log(
  '🚀 ~ file: index.js:11 ~ process.env.ALGOLIA_APP_ID:',
  process.env.ALGOLIA_APP_ID
);
console.log(
  '🚀 ~ file: index.js:13 ~ process.env.ALGOLIA_SEARCH_API_KEY:',
  process.env.ALGOLIA_SEARCH_API_KEY
);
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_API_KEY
);
const index = searchClient.initIndex(process.env.ALGOLIA_SEARCH_INDEX);
console.log('🚀 ~ file: index.js:14 ~ index:', index);

function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p>
    </article>
  );
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Cheese and Meat Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <InstantSearch searchClient={searchClient} indexName={index}>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
        <ul className="product-grid">
          {products.map((p, index) => {
            return <ProductListing key={`product${index}`} product={p.node} />;
          })}
        </ul>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const products = await getProductList();

  return {
    props: {
      products,
    },
  };
}
