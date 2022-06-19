import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Categories from "../components/Categories";
import ProductsHome from "../components/ProductsHome";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home(){

  const location = useLocation();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState();

  useEffect(() => {
    setIsOrdered(location.state ? location.state.isOrdered : null);
    if (isOrdered) {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("aria-live", "assertive");
      newDiv.innerHTML = "Ваше замовлення в обробці ✓";
      newDiv.style.cssText = newDiv.style.cssText = "position: fixed;left: 0;bottom: 0;font-weight: bold;transition: opacity 1s;z-index: 1000;width: 100%;font-size: 21px;height: 50px;  background-color: #09450d; display: flex; align-items: center; justify-content: center; opacity: 1; color: #e6e6e6; text-shadow: 0 0 2px black; filter: progid:DXImageTransform.Microsoft.Glow(Color=#ffffff,Strength=1);";
      document.body.appendChild(newDiv);
      setTimeout(() => newDiv.style.opacity = "0", 5000);
      window.history.replaceState(null, '');
    }
    if (location.pathname.includes("#")) {
      var element = location.pathname.split("#")[1];
      if (element) {
        document.getElementById(element).scrollTo({ behavior: "smooth", top: 0 });
      }
    }
  });

  return(
    <div>
      <Header/>
      <main>
        <Welcome/>
        <Categories/>
        <ProductsHome/>
      </main>
      <Feedback/>
      <Footer/>
    </div>
  );
}
