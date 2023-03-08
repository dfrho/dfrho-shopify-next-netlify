import Link from 'next/link';

export default function Header() {
  return (
    <header className="app-header">
      <h1>
        <Link href="/">
          <a>Life Fitness</a>
        </Link>
      </h1>
      <nav className="main-nav">
        <ul>
          <li className="main-nav-item">
            <Link href="/">
              <a>All Products</a>
            </Link>
          </li>
          <li className="main-nav-item">
            <Link href="/cart">
              <a className="cart cartLink">Shopping Cart</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
