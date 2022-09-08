import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./formInput.css";
import { useHistory, useLocation } from "react-router-dom";

const CreateProduct = () => {
  const productNameRef = useRef();
  const productImgRef = useRef();
  const descriptionRef = useRef();
  const quantityRef = useRef();
  const unitPriceRef = useRef();

  const history = useHistory();
  const location = useLocation();

  const [updateName, setUpdateName] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [updatedescription, setUpdateDescription] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");

  useEffect(() => {
    if (location.state) {
      setUpdateName(location.state.name);
      setUpdateImage(location.state.imageUrl);
      setUpdateDescription(location.state.description);
      setUpdateQuantity(location.state.quantity);
      setUpdatePrice(location.state.unitPrice);
    }
  }, [location.state]);

  const onAddFormHandler = async (e) => {
    e.preventDefault();

    console.log(`inside add form`)
    const productName = productNameRef.current.value;
    const productImg = productImgRef.current.value;
    const productDescription = descriptionRef.current.value;
    const productQuantity = quantityRef.current.value;
    const productUnitPrice = unitPriceRef.current.value;

    try {
      const obj = {
        productName,
        productImg,
        productDescription,
        productQuantity,
        productUnitPrice,
      };

      console.log(obj)
      const response = await axios.post(
        "http://localhost:3000/add-product",
        obj
      );

      console.log(response);
      history.push("/products");
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateFormHandler = async (e) => {
    e.preventDefault();

    const productName = productNameRef.current.value;
    const productImg = productImgRef.current.value;
    const productDescription = descriptionRef.current.value;
    const productQuantity = quantityRef.current.value;
    const productUnitPrice = unitPriceRef.current.value;

    try {
      const obj = {
        id: location.state.id,
        productName,
        productImg,
        productDescription,
        productQuantity,
        productUnitPrice,
      };

      await axios.post("http://localhost:3000/update-cart", obj);

      history.replace("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {location.state ? (
        <form>
          <h1>Update Product</h1>
          <div>
            <label>Name</label>
            {/* <input type="input" ref={productNameRef} value={updateName}></input> */}
            <input
              type="input"
              ref={productNameRef}
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Image</label>
            <input
              type="input"
              ref={productImgRef}
              // placeholder="Product Image"
              value={updateImage}
              onChange={(e) => setUpdateImage(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Description</label>
            <input
              type="input"
              ref={descriptionRef}
              // placeholder="Description"
              value={updatedescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              ref={quantityRef}
              // placeholder="Quantity"
              value={updateQuantity}
              onChange={(e) => setUpdateQuantity(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Unit Price</label>
            <input
              type="number"
              ref={unitPriceRef}
              // placeholder="Unit Price"
              value={updatePrice}
              onChange={(e) => setUpdatePrice(e.target.value)}
            ></input>
          </div>
          <button
            className="btnformsubmit"
            // type="submit"
            onClick={onUpdateFormHandler}
          >
            Update Product
          </button>
        </form>
      ) : (
        <form>
          <h1>Add Product</h1>
          <div>
            <label>Name</label>
            <input
              type="input"
              ref={productNameRef}
              placeholder="Product Name"
            ></input>
          </div>
          <div>
            <label>Image</label>
            <input
              type="input"
              ref={productImgRef}
              placeholder="Product Image"
            ></input>
          </div>
          <div>
            <label>Description</label>
            <input
              type="input"
              ref={descriptionRef}
              placeholder="Description"
            ></input>
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              ref={quantityRef}
              placeholder="Quantity"
            ></input>
          </div>
          <div>
            <label>Unit Price</label>
            <input
              type="number"
              ref={unitPriceRef}
              placeholder="Unit Price"
            ></input>
          </div>
          <button
            className="btnformsubmit"
            // type="submit"
            onClick={onAddFormHandler}
          >
            Add Product
          </button>
        </form>
      )}
    </>
  );
};

export default CreateProduct;
