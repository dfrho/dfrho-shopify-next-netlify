import Link from 'next/link';
import Image from 'next/image';

export default function HitListing({ hit }) {
  return (
    <article className="product-card">
      <div className="product-card-frame">
        <img className="prodimg" src={image.src} alt={image.altText} />
      </div>
      <div className="product-card-text">
        <h3 className="product-card-title">{hit['Title']}</h3>
        <div dangerouslySetInnerHTML={{ __html: hit['Body (HTML)'] }} />
      </div>
      <Link href={`/product/${hit['Handle']}`}>
        <button>View Item {`>`} </button>
      </Link>
    </article>
  );
}
