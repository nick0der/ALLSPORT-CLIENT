import styled from "styled-components";
import { mobile, tablet, smallMobile, smallTablet } from "../responsive";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/apis";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 30px;
  background-color: white;
  border: solid gray 3px;
  border-radius: 7px;

  ${smallTablet({ width: "60%" })}
  ${mobile({ width: "70%" })}
  ${smallMobile({ width: "80%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 7px;
  font-weight: 300;
  text-align: center;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  ${smallTablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column", padding: "0" })}
`;

const Input = styled.input`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 3px solid gray;
  padding: 12px;
  font-size: 16px;
  ${smallTablet({ margin: "3px 0px !important", padding: "9px"})}
  ${mobile({ margin: "5px 0px !important", padding: "12px"})}
`;

const StyledLink  = styled(Link)`
  margin-top: 15px;
  margin-left: 10px;
  margin-right: auto;

  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-top: 9px;
  padding-left: 10px;
  padding-right: 10px;
  ${smallTablet({ paddingRight: "0" })}
  ${mobile({ padding: "0" })}
`;

const Button = styled.button`
  padding: 10px 0px;

  width: 100%;

  background-color: white;
  cursor: pointer;
  border: solid gray 3px;
  font-size: 17px;
  font-weight: bold;
  color: #333333;

  &:disabled{
    cursor: not-allowed;
  }

  ${smallTablet({ margin: "5px 0px !important", paddingLeft: "10px", paddingRight: "10px"})}
  ${mobile({ margin: "5px 0px !important", paddingLeft: "10px", paddingRight: "10px"})}
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const CartContent = styled.ol`
  list-style: none;
`;

const Product = styled.li`
  margin-left: -41px;
  border-bottom: solid lightgray 1px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", justifyContent: "center", alignItems:"center" })}
`;

const ProductDetails = styled.div`

  display: flex;
  ${mobile({ flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center"})}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${smallTablet({ marginRight: "10px", flex: "0.1"  })}
  ${mobile({ flexDirection: "row-reverse", margin: "0px 0px 10px 0px", justifyContent: "center", alignItems: "center" })}
`;

const ProductImg = styled.img`
  width: 100px;
  ${mobile({ marginTop: "15px" })}
`;

const ProductInfo = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 16px;
  ${mobile({ width: "90%", padding: "0", margin: "0", fontSize: "18px"})}
`;

const ProductName = styled.span`
  width: 475px;

  ${smallTablet({ width: "auto" })}
  ${mobile({ width: "auto", marginTop: "10px"})}
`;

const ProductProp = styled.span`
  ${mobile({marginTop: "10px"})}
`;

const DeleteItem = styled.button`
  padding: 5px 5px;
	border: none;
  font-size: 14px;
  cursor: pointer;
  background-color: white;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 100;

  text-align: center;
  ${mobile({ marginTop: "15px" })}
  ${smallTablet({ width: "60px" })}
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 10px ;
  ${mobile({ padding: "20px" })}
`;

const TotalTitle = styled.h2`
  font-size: 23px;
  font-weight: 600;
`;

const TotalPrice = styled.h2`
  font-size: 23px;
  font-weight: 600;
`;

export default function Checkout(){

  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);
  const quantity = useSelector(state => state.cart.quantity);
  const products = useSelector(state => state.cart.products);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f3eb";
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    createOrder({ name, lastName, phone, products, total, address });
    navigate("/", {
      state:{isOrdered: true}
    });
  };

  return(
    <Container>
      <Main>
        <Title>Підтвердження замовлення</Title>
          <CartContent aria-label="Products">
            {products.map((product, index)=>(
              <Product role="article" aria-label={product.title}>
                <ProductDetails>
                  <ProductImg src={product.img} alt={product.alt}/>
                  <ProductInfo>
                    <ProductName>
                      <b>Товар:&nbsp;</b>
                      { product.title }
                    </ProductName>
                    <ProductProp>
                      <b>Кількість:&nbsp;</b>
                      { product.quantity }
                    </ProductProp>
                    <ProductProp>
                      <b>Колір:&nbsp;</b>
                      {product.color}
                    </ProductProp>
                  </ProductInfo>
                </ProductDetails>
                <PriceDetail>
                  <ProductPrice>
                    {(product.price * product.quantity).toString() + " грн."}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </CartContent>
        <Form>
        <Total>
          <TotalTitle>Усього:</TotalTitle>
          <TotalPrice>{total.toString() + " грн."}</TotalPrice>
        </Total>
        <NameContainer>
          <Input
            type="text"
            placeholder="Ім'я"
            aria-label="Ім'я"
            className="focusable"
            onChange={(e) => setName(e.target.value)}
            style={{marginRight: "10px"}}
          />
          <Input
            type="text"
            placeholder="Прізвище"
            aria-label="Прізвище"
            className="focusable"
            onChange={(e) => setLastName(e.target.value)}
            style={{marginRight: "10px"}}
          />
        </NameContainer>
        <NameContainer>
          <Input
            type="text"
            placeholder="Мобільний телефон"
            aria-label="Мобільний телефон"
            className="focusable"
            onChange={(e) => setPhone(e.target.value)}
            style={{marginRight: "10px"}}
          />
          <Input
            type="text"
            placeholder="Адреса"
            aria-label="Адреса"
            className="focusable"
            onChange={(e) => setAddress(e.target.value)}
            style={{marginRight: "10px"}}
          />
        </NameContainer>
        <ButtonContainer>
        <Button
          onClick={handleClick}
          className="hoverable focusable">
          Підтвердити
        </Button>
        </ButtonContainer>
          <StyledLink className="hoverable focusable" to="/cart">
            Повернутись назад до корзини
          </StyledLink>
        </Form>
      </Main>
    </Container>
  );
}
