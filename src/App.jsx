import { useEffect, useState } from "react";
import "./App.css";
const LIMIT = 8;

function App() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  async function fetchProducts() {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      );

      const data = await response.json();

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>DummyJSON Products</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="grid">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />

                <h2>{product.title}</h2>

                <p>{product.description}</p>

                <h3>${product.price}</h3>

                <p>⭐ {product.rating}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setSkip(skip - LIMIT)} disabled={skip === 0}>
              Previous
            </button>

            <span>
              Page {skip / LIMIT + 1} of {Math.ceil(total / LIMIT)}
            </span>

            <button
              onClick={() => setSkip(skip + LIMIT)}
              disabled={skip + LIMIT >= total}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
