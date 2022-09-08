import CreateProduct from "./createProduct";
import Products from "./products";
import Cart from "./cart";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/add-product">
          <CreateProduct />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/">
          <Products />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
