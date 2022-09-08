import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Logo</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/products" >
            Products
          </NavLink>
          <NavLink to="/cart">
            Cart
          </NavLink>
          <NavLink to="/add-product">
            Add Product
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
