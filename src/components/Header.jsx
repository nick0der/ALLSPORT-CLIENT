import styled from "styled-components";
import { Search, ShoppingCartOutlined, Accessibility } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile, tablet, smallTablet, smallMobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Announcment from "../components/Announcment";
import IconButton from '@material-ui/core/IconButton';
import { useEffect} from "react";

const Container = styled.div`
  height: 70px;
  border-bottom: solid gray 1px;
  background-color: #f5f3eb;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    flexDirection: "column", justifyContent: "center", height: "155px"
  })}
`;

const StyledLink  = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  border: solid transparent 3px;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 35px;
  margin-top: 2px;
  ${tablet({ fontSize: "32px"})}
  ${smallTablet({ fontSize: "28px", marginTop: "4px"})}
  ${mobile({ fontSize: "40px", marginTop: "0px"})}
  ${smallMobile({ fontSize: "30px", marginTop: "4px"})}
`;

const SearchContainer = styled.div`
  width: 320px;
  background-color: white;
  border: 3px solid gray;
  margin-left: 135px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ marginLeft: "auto", marginRight: "10px", width: "300px", height: "23.5px"})}
  ${smallTablet({ marginRight: "5px", marginLeft: "5px", height: "21px"})}
  ${mobile({ margin: "0", width: "90vw", fontSize: "20px", boxSizing: "border-box", padding: "10px"})}
  ${smallMobile({  margin: "5px 0px"})}

  &:focus-within{
    outline: 5px auto -webkit-focus-ring-color;
    border:solid #0c43ad 3px;
    box-shadow: 0px 0px 15px black;
  }
`;

const Input = styled.input`
  border: none;
  font-size: 18px;
  width: 100%;

  &:focus{
    outline: none;
  }
`;

const IconButtonStyled  = styled(IconButton)`
  left: 7px;
  height: 25px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ alignItems: "center", justifyContent: "space-between", width: "90vw"})}
`;

const MenuItem = styled.button`
  width: 145px;
  padding: 10px 0px;
  border: solid gray 3px;
  font-size: 18px;
  cursor: pointer;
  background-color: white;
  font-weight: bold;
  color: #333333;
  margin-right: 25px;
  ${tablet({ marginRight: "10px", width: "137px", fontSize: "17px"})}
  ${smallTablet({ marginRight: "5px", width: "115px", fontSize: "15px"})}
  ${mobile({ margin: "10px 10px 10px 0px", fontSize: "20px", flex: 2})}
  ${smallMobile({ fontSize: "16px" })}
`;

const CartItem = styled.button`
  width: 50px;
  padding: 8px 0px;
  border: solid gray 3px;
  cursor: pointer;
  background-color: white;
  color: black;
  ${tablet({ padding: "7px 0px"})}
  ${smallTablet({ padding: "6px 0px"})}
  ${mobile({ margin: "10px 0px 10px 0px", padding: "9px 0px", flex: 1})}
  ${smallMobile({ margin: "0px", padding: "7px" })}
`;

export default function Header(){

  const quantity = useSelector(state => state.cart.quantity);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  const handleSearch = (e) => {
    const value = document.getElementById("searchbarID").value;
    if (e.key === 'Enter' && value.length > 0) {
      navigate("/products/all?search=" + value);
      navigate(0);
    }
  };

  const handleSearchButton = () => {
    const value = document.getElementById("searchbarID").value;
    if (value.length > 0) {
      navigate("/products/all?search=" + value);
      navigate(0);
    }
  };

  return(
    <header>
      <Announcment/>
      <Container>
        <StyledLink
          to="/"
          aria-label="Перейти на головну"
          title="Перейти на головну"
          className="hoverable focusable">
          <Logo>Allsport.</Logo>
          <Accessibility style={{ width : 35, height: 35, marginTop: "3px"}}/>
        </StyledLink>
        <SearchContainer>
          <Input
            placeholder="Пошук"
            aria-label="Поле пошуку"
            onKeyPress={handleSearch}
            id="searchbarID"/>
          <IconButtonStyled
            title="Magnifier"
            aria-label="Збільшувач"
            onClick={handleSearchButton}>
            <Search style={{ color: "gray", width: 25, height: 25 }}/>
          </IconButtonStyled>
        </SearchContainer>
        <Navigation>
          {!user ?
            <MenuItem
              onClick={()=>navigate("/register")}
              title="Register"
              className="hoverable focusable activable">
              Реєстрація
            </MenuItem>
            :
            <MenuItem
              onClick={()=>navigate("/products/wishlist")}
              title="Wishlist"
              className="hoverable focusable activable">
              Список бажань
            </MenuItem>
          }
          {!user ?
            <MenuItem
              onClick={()=>navigate("/login")}
              title="Sign in"
              className="hoverable focusable activable">
              Вхід
            </MenuItem>
            :
            <MenuItem
              onClick={()=>navigate("/logout")}
              title="Log out"
              className="hoverable focusable activable">
              Logout
            </MenuItem>
          }
          <CartItem
            onClick={()=>navigate("/cart")}
            aria-label="Корзина"
            title="Корзина"
            className="hoverable focusable activable">
            <Badge
              badgeContent={quantity}
              color="primary">
              <ShoppingCartOutlined  style={{ width : 25, height: 25}}/>
            </Badge>
          </CartItem>
        </Navigation>
      </Container>
    </header>
  );
}
