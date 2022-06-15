import styled from "styled-components";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Remove, Add, ShoppingCartOutlined, ArrowForwardIosOutlined, FavoriteBorder, Favorite } from "@material-ui/icons";
import { tablet, smallTablet, mobile, smallMobile } from "../responsive";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requests";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { updateUserWishlist } from "../redux/apis";
import axios from "axios";

const Container = styled.div`
`;

const Main = styled.main`
  padding: 50px;
  display: flex;
  position: relative;
  ${mobile({ padding: "10px", flexDirection: "column"})}
`;

const Breadcrumbs = styled.ol`
  font-size: 15px;
  display: flex;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-right: 45px;
  position: absolute;
  top: 0;
  left: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const LinkStyled  = styled(Link)`
  color: black;
  margin-right: 5px;
  margin-left: 5px;
`;

const Span  = styled.span`
  color: black;
  margin-right: 5px;
  margin-left: 5px;
`;

const ImageContainer = styled.div`
  flex: 0.8;
  ${smallMobile({ marginTop: "50px" })}
`;

const Image = styled.img`
  width: 100%;
  height: auto;

  &:hover{
    cursor: zoom-in;
  }
`;

const ImageZoom = styled.div`
  flex: 0;
  display: none;
  ${mobile({ display: "none !important"})}
  ${smallTablet({ display: "none !important"})}
  ${tablet({ display: "none !important"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding-left: 50px;
  ${mobile({ padding: "10px"})}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 100;
`;

const Description = styled.p`
  margin: 20px 0px;
  letter-spacing: 1.3px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%"})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.label`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
  width: 125px;
  height: 35px;
  border-radius: 3px;
  margin-left: 20px;
  font-size: 16px;
  -webkit-appearance: menulist-button;
  padding-left: 3px;
`;

const Option = styled.option`
`;

const AddContainer = styled.div`
  width: 53%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%"})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.span`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  font-weight: 700;
  font-size: 18px;
  width: 20px;
`;

const ButtonAdd = styled.button`
  padding: 11px 0px;
  margin-top: 30px;
  width: 250px;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: solid gray 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333333;
  cursor: pointer;
`;

export default function Product(){

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector(state => state.user.currentUser);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [img, setImg] = useState();
  const [alt, setAlt] = useState();
  const [inWishlist, setInWishlist] = useState(false);
  const [camefrom, setCamefrom] = useState();
  const dispatch = useDispatch();

  useEffect(() => {

    setCamefrom(location.state ? location.state.from : null);
    window.scrollTo(0, 0);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/get/" + id);
        setProduct(res.data);
        setColor(res.data.color[0]);
        setImg(res.data.img[0]);
        setAlt(res.data.alt[0]);
      } catch {}
    };
    getProduct();

    const makeAReq = async () => {
      try {
        const res = await publicRequest.get(`/user/wishlist/${user._id}`);
        var list = res.data;
        list.map(item => {
          if (item._id) {
            if (item._id === id) {
              setInWishlist(true);
              return;
            }
          }
        });
      } catch (e) {}
    }
    makeAReq();


  }, [id, location.state]);

  const handleQuantity = (arg) => {
    if (arg === "+") {
      quantity < 99 && setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleClick = () => {

    const newDiv = document.createElement("div");
    newDiv.innerHTML = "Додано у корзину ✓";
    newDiv.style.cssText = newDiv.style.cssText = "position: fixed;left: 0;bottom: 0;font-weight: bold;transition: opacity 1s;z-index: 1000;width: 100%;font-size: 21px;height: 50px;  background-color: #09450d; display: flex; align-items: center; justify-content: center; opacity: 1; color: #e6e6e6; text-shadow: 0 0 2px black; filter: progid:DXImageTransform.Microsoft.Glow(Color=#ffffff,Strength=1);";
    document.body.appendChild(newDiv);
    setTimeout(() => newDiv.style.opacity = "0", 2500);

    dispatch(
      addProduct({ ...product, quantity, color, img, alt})
    );
  };

  const addToWishlist = () => {
    const makeAReq = async () => {
      try {
        const res = await publicRequest.get(`/user/wishlist/${user._id}`);
        var list = res.data;
        list.push(product);
        updateUserWishlist(list, user._id);
      } catch (e) {}
    }
    makeAReq();

    if (inWishlist === true) {
      console.log("Already in wishlist.");
      return;
    }
    setInWishlist(true);
  };

  const removeFromWishList = () => {
    const makeAReq = async () => {
      try {
        const res = await publicRequest.get(`/user/wishlist/${user._id}`);
        var list = res.data;
        list.splice(list.findIndex(function(i){
          return i._id === id;
        }), 1);
        updateUserWishlist(list, user._id);
      } catch (e) {}
    }
    makeAReq();

    if (inWishlist === false) {
      console.log("Not in wishlist. Cannot remove.");
      return;
    }
    setInWishlist(false);
  };

  const zoomIn = (e) => {
    var image = document.getElementById("image-zoom");
    var cont = document.getElementById("image-cont");
    cont.style.pointerEvents = "auto";
    cont.style.position = "fixed";
    cont.style.width = "100%";
    cont.style.height = "100%";
    cont.style.left = "0";
    cont.style.top = "0";
    cont.style.display = "flex";
    cont.style.justifyContent = "center";
    cont.style.alignItems = "center";
    cont.style.background = "rgba(51,51,51,0.7)";
    cont.style.zIndex = "500";
    image.style.width = "auto";
    image.style.height = "100%";
    image.style.display = "block";
    image.style.cursor = "zoom-out";
    image.style.backgroundColor = "white";
  };

  const zoomOut = (e) => {
    var cont = document.getElementById("image-cont");
    cont.style.display = "none";
  };

  return(
    <Container>
      <Header/>
      <Main>
      {camefrom &&
        <Breadcrumbs>
          <ListItem>
            <LinkStyled
              to="/"
              className="hoverable focusable">
              Головна
            </LinkStyled>
          </ListItem>
          {camefrom !== "home" &&
            <ListItem>
              <ArrowForwardIosOutlined style={{width: "12px", height: "12px", marginTop: "2.5px"}}/>
              <LinkStyled
                to={`/products/${camefrom}`}
                className="hoverable focusable">
                {camefrom === "all" ? "Усі" : camefrom === "wishlist" ? "Список Бажань" : camefrom}
              </LinkStyled>
            </ListItem>
          }
          <ArrowForwardIosOutlined style={{width: "12px", height: "12px", marginTop: "2.5px"}}/>
          <ListItem>
            <Span>
              {product.title}
            </Span>
          </ListItem>
        </Breadcrumbs>
        }
        <ImageContainer onClick={(e) => {
            !window.matchMedia("(max-width: 1200px)").matches && zoomIn(e)
          }}>
          <Image src={img} alt={alt}/>
        </ImageContainer>
        <ImageZoom id="image-cont" onClick={(e) => zoomOut(e)}>
          <Image id="image-zoom" src={img} alt={alt}/>
        </ImageZoom>
        <InfoContainer>
          <TitleContainer>
            <Title>{product.title}</Title>
            {user &&
              (inWishlist ?
                <Button
                  aria-label="Видалити зі списку бажань"
                  style={{border: "solid gray 1px", marginLeft: "10px"}}
                  onClick={removeFromWishList}
                  startIcon={
                    <Favorite style={{ width : 25, height: 25, marginLeft: "9px", color: "red"}}/>
                }></Button>
              :
                <Button
                  aria-label="Додати у список бажань"
                  style={{border: "solid gray 1px", marginLeft: "10px" }}
                  onClick={addToWishlist}
                  startIcon={
                    <FavoriteBorder  style={{ width : 25, height: 25, marginLeft: "9px"}}/>
                }></Button>)
            }
          </TitleContainer>
          <Description>{product.desc}</Description>
          <Price>{product.price} грн.</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle for="color-sel">Колір:</FilterTitle>
              <FilterColor id="color-sel" aria-label="Колір" onChange={(e) => {
                  setColor(e.target.value.toLowerCase());
                  setImg(product.img[
                    product.color.indexOf(e.target.value.toLowerCase())
                  ]);
                  setAlt(product.alt[
                    product.color.indexOf(e.target.value.toLowerCase())
                  ]);
                }
              }>
                {product.color?.map((c) => (
                  <Option key={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </Option>
                ))}
              </FilterColor>
          </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Button
                aria-label="Зменшити кількість"
                style={{border: "solid gray 1px"}}
                onClick={() => handleQuantity("-")}
                startIcon={
                  <Remove style={{ width: 25, height: 25, marginLeft: "10px"}}/>
                }>
              </Button>
              <Amount>
                {quantity}
              </Amount>
              <Button
                aria-label="Збільшити кількість"
                style={{border: "solid gray 1px"}}
                onClick={() => handleQuantity("+")}
                startIcon={
                  <Add  style={{ width : 25, height: 25, marginLeft: "9px"}}/>
                }>
              </Button>
            </AmountContainer>
          </AddContainer>
          <ButtonAdd onClick={handleClick}
            className="hoverable focusable"
            aria-label="Додати в корзину">
              Додати у корзину&nbsp;
            <ShoppingCartOutlined style={{ width : 25, height: 25}}/>
          </ButtonAdd>
        </InfoContainer>
      </Main>
      <Feedback/>
      <Footer/>
    </Container>
  );
}
