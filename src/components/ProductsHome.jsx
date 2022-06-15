import styled from "styled-components";
import Products from "../components/Products";
import { DoubleArrow } from "@material-ui/icons";
import { smallMobile } from "../responsive";
import { Link } from "react-router-dom";

const Title = styled.h1`
  font-size: 70px;
  font-weight: 600;
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: solid gray 1px;
  color: #222222;
  background-color: #f5f3eb;
  ${smallMobile({ fontSize: "40px"})}
`;

const Section = styled.section`
`;

const ButtonContainer = styled.div`
  width: 100vw;
  padding-bottom: 10px;
  background-color: #f5f3eb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkStyled = styled(Link)`
  padding: 10px 50px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  background-color: transparent;
  font-weight: bold;
  color: #333333;
  display: flex;
  align-items: center;
`;

export default function Categories(){
  return(
    <Section aria-label="Товари">
      <Title>Товари</Title>
      <Products category={"all"} filters={""} sort={""} limit={true}/>
      <ButtonContainer>
        <LinkStyled to="/products/all" className="hoverable focusable">Більше товарів<DoubleArrow/></LinkStyled>
      </ButtonContainer>
    </Section>
  );
}
