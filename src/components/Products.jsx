import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import { smallMobile } from "../responsive";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserWishlist } from "../redux/apis";
import { publicRequest } from "../requests";

const List = styled.ol`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f5f3eb;
  list-style: none;
  ${smallMobile({ padding: "0px"})}
`;

export default function Products(array){

  const user = useSelector(state => state.user.currentUser);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  var color = array.filters.color;
  const [category, min, max, sort, searchValue] = [
    array.category,
    array.filters.min,
    array.filters.max,
    array.sort,
    array.searchValue
  ];

  useEffect(()=>{
    const limit = array.limit ? array.limit : false ;

    const getProducts = async () => {
      try {
        if (category !== "wishlist") {
          const q = (category !== "all")
            ? `/products?category=${category}`
            : "/products";
          const res = await publicRequest.get(!limit ? q : q.concat("?new=true"));
          if (searchValue) {
            setProducts(
              res.data.filter(item => item.title.toLowerCase()
                .includes(searchValue.toLowerCase()))
                .sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            );
          } else {
            setProducts(res.data.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));
          }
        } else {
          const getWishlist = async () => {
            try {
              const res = await publicRequest.get(`/user/wishlist/${user._id}`);
              setProducts(res.data);
            } catch (e) {}
          }
          getWishlist();
        }
      } catch (e) {}
    }
    getProducts();
  }, [category, searchValue]);

  useEffect(() => {

    category && setFilteredProducts(
      products.filter(item => {
        if (!color || color === "All") {
          return item.price >= (min ? min : 0) && item.price <= (max ? max : 99999)
        } else {
          return item.color.includes(color.toLowerCase()) && item.price >= (min ? min : 0) && item.price <= (max ? max : 99999)
        }
      }));
  }, [products, category, color, min, max]);

  useEffect(() => {
    if (sort === "new") {
       setFilteredProducts(prev =>
         [...prev].sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
       );
    } else if (sort === "asc") {
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => b.price - a.price)
      );
    }
  }, [sort]);

  return(
      <List aria-label="Товари">
      {filteredProducts.map(item => (
        <ProductItem item={item} key={item.id}/>
      ))}
      </List>
  );
}
