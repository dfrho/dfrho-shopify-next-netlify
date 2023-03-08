import { useState, useEffect } from 'react';
import { useAppContext } from '../state';
import CartTable from './CartTable';
import CartTotal from './CartTotal';

export default function Cart() {
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [cost, setCost] = useState({});
  const { cartId, setCartId } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      const localCart = cartId;

      if (localCart === null) {
        setShowProducts(false);
      } else {
        setCartId(localCart);
        const response = await fetch('/.netlify/functions/get-cart', {
          method: 'post',
          body: JSON.stringify({
            cartId: localCart,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        setProducts(json?.cart?.lines.edges);
        setCost(json?.cart?.estimatedCost);
        return json;
      }
    }

    fetchData();
  }, [cartId, setCartId]);

  return (
    <div>
      {showProducts && products?.length > 0 ? (
        <div>
          <CartTable
            cartItems={products}
            cartId={cartId}
            removeItem={setProducts}
          />
          <CartTotal cost={cost} />
        </div>
      ) : (
        <div className="cart-page-message">
          No products to show! Get shopping!
        </div>
      )}
    </div>
  );
}
