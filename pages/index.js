import Head from 'next/head';
import { useState } from 'react';
import HitListing from '@components/HitListing';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { getProductList } from 'netlify/functions/utils/getProductList.js';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';
import searchClient from '../algolia';

function Hit({ hit }) {
  return <HitListing hit={hit} />;
}

export default function Home({ products }) {
  const [searchState, setSearchState] = useState({});

  const handleSearchStateChange = (newSearchState) => {
    setSearchState(newSearchState);
  };

  return (
    <>
      <Head>
        <title>Life Fitness Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <InstantSearch
          searchClient={searchClient}
          indexName={'algolia-index'}
          searchState={searchState}
          onSearchStateChange={handleSearchStateChange}
        >
          <div className="ais-SearchBox">
            <SearchBox />
          </div>
          <Hits hitComponent={Hit} />
        </InstantSearch>
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
