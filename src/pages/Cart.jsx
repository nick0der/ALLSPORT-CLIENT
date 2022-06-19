import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DeleteOutlined, ArrowBackIos } from "@material-ui/icons";
import { tablet, smallTablet, mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux";

const Container = styled.div`
`;

const Main = styled.main`
  padding: 20px;
  ${mobile({ padding: "7px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  ${mobile({ margin: "10px 0px" })}
`;

const GoBackContainer = styled.div`
   display: flex;
   align-items: center;
   margin-left: 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${smallTablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
`;

const CartContent = styled.ol`
  flex: 3;
  list-style: none;
`;

const Product = styled.li`
  border-bottom: solid lightgray 1px;
  margin-right: 3px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", justifyContent: "center", alignItems:"center" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center"})}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-right: 50px;
  ${tablet({ marginRight: "10px", flex: "0.1"  })}
  ${smallTablet({ marginRight: "10px", flex: "0.1"  })}
  ${mobile({ flexDirection: "row-reverse", margin: "0px 0px 10px 0px", justifyContent: "center", alignItems: "center" })}
`;

const ProductImg = styled.img`
  width: 200px;
  ${mobile({ marginTop: "15px" })}
`;

const ProductInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 18px;
  ${mobile({ width: "90%", padding: "0", margin: "0", fontSize: "18px"})}
`;

const ProductName = styled.span`
  width: 475px;
  ${tablet({ width: "auto" })}
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
  font-size: 27px;
  font-weight: 100;
  margin-top: 50px;
  margin-bottom: 5px;
  width: 90px;
  text-align: center;
  ${mobile({ margin: "0" })}
`;

const Summary = styled.section`
  flex: 1;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 20px;
  height: 400px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
`;

const SummaryItemPrice = styled.span`
`;

const SummaryButton = styled.button`
  width: 100%;
  border: none;
  padding: 11px 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: solid gray 3px;
  font-size: 17px;
  font-weight: bold;
  color: #333333;
  cursor: pointer;
`;

export default function Cart(){

  const cart = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = (index) => {

    const newDiv = document.createElement("div");
    newDiv.setAttribute("aria-live", "assertive");
    newDiv.innerHTML = "Видалено з корзини ✗";
    newDiv.style.cssText = "position: fixed;left: 0;bottom: 0;font-weight: bold;transition: opacity 1s;z-index: 1000;width: 100%;font-size: 21px;height: 50px;  background-color: #5c0e11; display: flex; align-items: center; justify-content: center; opacity: 1; color: #e6e6e6; text-shadow: 0 0 2px black; filter: progid:DXImageTransform.Microsoft.Glow(Color=#ffffff,Strength=1);";
    document.body.appendChild(newDiv);
    setTimeout(() => newDiv.style.opacity = "0", 2500);

    const quantity = cart.products[index].quantity;
    const price = cart.products[index].price;
    dispatch(removeProduct({ index, price, quantity }));
  }

  return(
    <Container>
      <Header/>
      <Main>
        <Title>{"Корзина (" + cart.quantity + ")"}</Title>
        <GoBackContainer>
          <ArrowBackIos style={{width: 12, height: 12}}/>
          <Link to="/products/all" style={{color: "black"}} class="hoverable focusable">Продовжити покупки</Link>
        </GoBackContainer>
        <Bottom>
          <CartContent aria-label="Товари">
            {cart.products.map((product, index)=>(
              <Product role="article" aria-label={product.title}>
                <ProductDetails>
                  <ProductImg src={product.img} alt={product.alt}/>
                  <ProductInfo>
                    <ProductName>
                      <b>Товар:&nbsp;</b>
                      <Link
                        to={`/product/${product._id}`}
                        className="hoverable focusable"
                        style={{color: "black"}}>
                        { product.title }
                      </Link>
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
                  <DeleteItem
                    onClick={() => removeFromCart(index)}
                    title="Видалити"
                    className="hoverable focusable activable">
                    <DeleteOutlined
                      style={{ width: 35, height: 35, cursor: "pointer" }}/>
                  </DeleteItem>
                  <ProductPrice>
                    {(product.price * product.quantity).toString()+ " грн."}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </CartContent>
          <Summary aria-label="Підсумок замовлення">
            <SummaryTitle>
              Підсумок замовлення
            </SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Сума</SummaryItemText>
              <SummaryItemPrice>
                {cart.total + " грн."}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                Орієнтовна доставка
              </SummaryItemText>
              <SummaryItemPrice>
                71 грн.
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                Знижка на доставку
              </SummaryItemText>
              <SummaryItemPrice>
                71 грн.
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Усього</SummaryItemText>
              <SummaryItemPrice>
                {cart.total + " грн."}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryButton
              className="hoverable focusable"
              aria-label="Оформити замовлення"
              onClick={()=>navigate("/checkout")}>
              Оформити замовлення
            </SummaryButton>
          </Summary>
        </Bottom>
      </Main>
      <Footer/>
    </Container>
  );
}
