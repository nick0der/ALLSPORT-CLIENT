import styled from "styled-components";
import { blockImg, leftImg } from "../data";
import { mobile, tablet, smallTablet } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  width: 100%;
  height: 500px;
  display: flex;
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
  margin-top: 14px;
  background-image: url("${blockImg}");
  background-size: 100%;
  ${mobile({ height: "auto", width: "auto" })}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "none" })}
`;

const Image = styled.img`
  width: 91%;
  height: 70%;
  ${tablet({ width: "93%", height: "61%" })}
  ${smallTablet({ width: "97%", height: "50%" })}
`;

const InfoContainer = styled.div`
  padding: 50px;
  flex: 1;
  ${mobile({ padding: "15px 40px" })}
`;

const Title = styled.h1`
  font-size: 65px;
  ${tablet({ fontSize: "50px" })}
  ${smallTablet({ fontSize: "50px" })}
  ${mobile({ fontSize: "40px" })}
`;

const Desc = styled.p`
  margin: 25px 0px;
  font-size: 23px;
  font-weight: 500;
  letter-spacing: 2px;
  ${mobile({ margin: "5px 0px 20px 0px", fontSize: "21px" })}
`;

const Button = styled.button`
  padding: 11px 0px;
  width: 190px;
  border: solid gray 3px;
  font-weight: bold;
  color: #333333;
  font-size: 18px;
  background-color: transparent;
  cursor: pointer;
`;

export default function Welcome(){

  const navigate = useNavigate();

  return(
    <Container aria-label="Ласкаво просимо">
      <ImageContainer>
        <Image src={leftImg} alt="Люди спорт"/>
      </ImageContainer>
      <InfoContainer>
        <Title>
          Ласкаво просимо до нашого сайту
        </Title>
        <Desc>
          Ми прагнемо, щоб кожен міг дозволити собі займатися спортом.
        </Desc>
        <Button
          title="All products"
          className="hoverable focusable activable"
          onClick={()=>navigate("/products/all")}>
          Усі товари
        </Button>

      </InfoContainer>
    </Container>
  );
}
