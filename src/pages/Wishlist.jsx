import styled from "styled-components";
import Header from "../components/Header";
import Products from "../components/Products";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { ArrowDropDownCircleOutlined } from "@material-ui/icons"
import { mobile, tablet, smallTablet } from "../responsive"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requests";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../data";
import { useSelector } from "react-redux";

const Container = styled.div`
`;

const Main = styled.main`
`;

const Breadcrumbs = styled.nav`
  font-size: 15px;
  color: black;
  width: 100%;
  height: 21px;
  display: flex;
  padding-top: 10px;

  align-items: center;
  background-color: #f5f3eb;
`;

const LinkStyled  = styled(Link)`
  display: flex;
  align-items: center;
  color: black;
  margin-right: 5px;
  margin-left: 5px;
`;

const Span  = styled.span`
  color: black;
  margin-right: 5px;
  margin-left: 5px;
`;


const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f3eb;
  padding-left: 10px;
  ${smallTablet({ display: "flex", flexDirection: "column", alignItems: "flex-start"})}
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0px 20px"})}
  ${smallTablet({ margin: "7px 20px"})}
  ${tablet({ marginRight: "0px"})}
`;

const FilterText = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ fontSize: "18px", width: "100%"})}
  ${tablet({ fontSize: "19px"})}
`;

const PriceFilterInput = styled.input`
  width: 90px;
  padding-left: 5px;
  margin-right: 10px;
  margin-bottom: 3px;
  border-radius: 5px;
  border: solid gray 1px;
  font-size: 14px;
  height: 32px;
  ${mobile({ width: "100%", boxSizing: "border-box", marginTop: "5px"})}
`;

const Select = styled.select`
  width: 125px;
  height: 35px;
  border-radius: 3px;
  margin-right: 20px;
  font-size: 16px;
  -webkit-appearance: menulist-button;
  padding-left: 3px;
  ${mobile({ width: "100%", marginTop: "5px"})}

  &:focus{
    box-shadow: 0px 0px 7px black;
  }
`;

const Option = styled.option`
  background-color: red;
`;


export default function Wishlist(){

  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);

  const [filters, setFilters] = useState({});
  const [sort, setSorts] = useState("new");
  const [colors, setColors] = useState([]);
  const [searchValue, setSearchValue] = useState(location.search.split("=")[1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getColors = async () => {
      try {
        const res = await publicRequest.get("/products");
        var data = res.data.map(i => i.color);
        data = ([].concat(...data));
        data = [...new Set(data)];
        setColors(data);
      } catch {}
    };
    getColors();
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleSorts = (e) => {
    setSorts(e.target.value)
  };

  const handleSelect = (e) => {
    navigate(`/products/${e.target.value}`);
  };

  return(
      <Container>
        <Header/>
        <Main>
          <Breadcrumbs>
            <LinkStyled to="/" className="hoverable" style={{marginLeft: "30px"}}>
              Home
            </LinkStyled>/
            <Span>
              Wishlist
            </Span>
          </Breadcrumbs>
          <FilterContainer>
            <Filter>
              <FilterText>Filter Products:</FilterText>
              <PriceFilterInput
                name="min"
                placeholder="Min price"
                aria-label="Мінімальна ціна"
                type="number"
                min="0"
                onChange={handleFilters}
                className="focusable"/>
              <PriceFilterInput
                name="max"
                aria-label="Максимальна ціна"
                placeholder="Max price"
                type="number"
                min="0"
                onChange={handleFilters}
                className="focusable"/>
              <Select
                name="color"
                onChange={handleFilters}
                aria-label="Колір"
                className="focusable">
                <Option selected disabled>Color</Option>
                <Option>All</Option>
                {colors?.map((c) => (
                  <Option>{c.charAt(0).toUpperCase() + c.slice(1)}</Option>
                ))}
              </Select>
            </Filter>
            <Filter>
              <FilterText id="sort-label">Sort Products:</FilterText>
              <Select
                aria-label="Сортувати за"
                onChange={handleSorts}
                className="focusable">
                <Option disabled>Sort</Option>
                <Option value="new" selected>Найновіші</Option>
                <Option value="asc">Ціна ⬆</Option>
                <Option value="desc">Ціна ⬇</Option>
              </Select>
            </Filter>
          </FilterContainer>
          <Products
            category={"wishlist"}
            filters={filters}
            sort={sort}/>
        </Main>
        <Feedback/>
        <Footer/>
      </Container>
  );
}
