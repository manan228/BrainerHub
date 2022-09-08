import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const history = useHistory();

  let totalPrice = 0;

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");

        setCart(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCart();
  }, []);

  const onUpdateCartHandler = (product) => {
    history.push("/add-product", { ...product });
  };
  return (
    <>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div>
          {cart.map((product) => {
            totalPrice += product.quantity * product.unitPrice;

            return (
              <div className="container" key={product.id}>
                <div className="cards">
                  <div>{product.name}</div>
                  <img src={product.imageUrl} alt="some random alt text" />
                  <div>{product.description}</div>
                  <div>Quantity: {product.quantity}</div>
                  <div>Price: {product.unitPrice}</div>
                  <div className="card-footer">
                    <button onClick={() => onUpdateCartHandler(product)}>
                      Edit/Update Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>Total Price: ${totalPrice}</div>
    </>
  );
};

export default Cart;
