import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products/all?search=:search" element={<ProductList/>} />
        <Route exact path="/products/:category" element={<ProductList/>} />
        <Route exact path="/product/:id" element={<Product/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/logout" element={<Logout/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/products/wishlist" element={<Wishlist/>} />
      </Routes>
    </Router>
  );
}
