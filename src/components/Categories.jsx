import styled from "styled-components";
import CategoryItem from "../components/CategoryItem";
import { categories } from "../data";
import { mobile, smallMobile } from '../responsive';

const Section = styled.section`
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: 600;
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: solid gray 1px;
  color: #222222;
  background-color: #f5f3eb;
  ${mobile({ fontSize: "60px"})}
  ${smallMobile({ fontSize: "37px"})}
`;

const List = styled.ul`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f5f3eb;
  list-style: none;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

export default function Categories(){
  return(
    <Section aria-label="Категорії">
      <Title>Категорії</Title>
      <List aria-label="Усі категорії">
        {categories.map(item => (
          <CategoryItem item={item} key={ item.id }/>
        ))}
      </List>
    </Section>
  );
}
