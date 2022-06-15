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

const Category = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f3eb;
`;

const SelectCategory = styled.select`
  margin: 20px 30px;
  background-color: #e6e3da;
  font-size: 26px;
  font-weight: 600;
  padding: 5px 10px;
  ${tablet({ fontSize: "24px"})}
  ${smallTablet({ fontSize: "23px"})}
  ${mobile({ width: "100vw", fontSize: "21px"})}

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: solid gray 1px;
  border-top: none;
  border-left: none;
  border-radius: 2px !important;

  background-repeat: no-repeat;
  background-size: 0.5em auto;
  background-position: right 0.25em center;
  padding-right: 1em;

  background-image: url("data:image/svg+xml;charset=utf-8, \
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40'> \
      <polygon points='0,0 60,0 30,40' style='fill:black;'/> \
    </svg>");
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


export default function ProductList({search}){

  const location = useLocation();
  const navigate = useNavigate();
  const category = location.pathname
    .split("/")[2].split("?")[0].replace("%20"," ");

  const [filters, setFilters] = useState({});
  const [sort, setSorts] = useState("new");
  const [colors, setColors] = useState([]);

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

  const getUkrainianCategory = (camefrom) => {
    switch (camefrom) {
      case "fitness":
        return "Фітнес";
        break;
      case "cycling":
        return "Велоспорт";
        break;
      case "gym":
        return "Спортзал";
        break;
      case "sportwear":
        return "Спортивний одяг";
        break;
      case "exercise machines":
        return "Тренажери";
        break;
      case "winter sports":
        return "Зимовий спорт";
        break;
      case "sports nutrition":
        return "Спортивне харчування";
        break;
      case "accessories":
        return "Аксесуари";
        break;
      default:
        return "Усі";
    }
  };

  return(
      <Container>
        <Header/>
        <Main>
          <Breadcrumbs>
            <LinkStyled to="/" className="hoverable" style={{marginLeft: "30px"}}>
              Головна
            </LinkStyled>/
            <Span>
              {getUkrainianCategory(category.charAt(0) + category.slice(1))}
            </Span>
          </Breadcrumbs>
          <Category>
            <SelectCategory
              id="dropCategories"
              aria-label="Категорія"
              className="focusable"
              onChange={handleSelect}>
              <Option disabled>Category</Option>
                {[{title: "Усі", cat: "all"}].concat(categories).map(item => (
                  item.cat === category ? <Option value={item.cat} key={item.id} selected>{item.title}</Option> : <Option value={item.cat} key={item.id}>{item.title}</Option>
                ))}
            </SelectCategory>
          </Category>
          <FilterContainer>
            <Filter>
              <FilterText>Фільтр товарів:</FilterText>
              <PriceFilterInput
                name="min"
                placeholder="Мін ціна"
                aria-label="Мінімальна ціна"
                type="number"
                min="0"
                onChange={handleFilters}
                className="focusable"/>
              <PriceFilterInput
                name="max"
                aria-label="Максимальна ціна"
                placeholder="Макс ціна"
                type="number"
                min="0"
                onChange={handleFilters}
                className="focusable"/>
              <Select
                name="color"
                onChange={handleFilters}
                aria-label="Колір"
                className="focusable">
                <Option selected disabled>Колір</Option>
                <Option value="All">Усі</Option>
                {colors?.map((c) => (
                  <Option>{c.charAt(0).toUpperCase() + c.slice(1)}</Option>
                ))}
              </Select>
            </Filter>
            <Filter>
              <FilterText id="sort-label">Сортування:</FilterText>
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
            category={category}
            filters={filters}
            sort={sort}
            searchValue={location.search.split("=")[1] ? decodeURI(location.search.split("=")[1]) : ""}/>
        </Main>
        <Feedback/>
        <Footer/>
      </Container>
  );
}
