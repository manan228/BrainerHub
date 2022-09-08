import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");

        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  const onAddToCartHandler = async (prodId) => {
    try {
      await axios.post(`http://localhost:3000/cart/${prodId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        {products.length === 0 ? (
          <div>No Products Found</div>
        ) : (
          products.map((product) => {
            return (
              <div className="container" key={product.id}>
                <div className="cards">
                  <div>{product.name}</div>
                  <img
                    src={product.imageUrl}
                    alt="some random alt text"
                    className="card-img"
                  />
                  <div>{product.description}</div>
                  <div>Quantity: {product.quantity}</div>
                  <div>Price: {product.unitPrice}</div>
                  <div className="card-footer">
                    <button onClick={() => onAddToCartHandler(product.id)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Products;
