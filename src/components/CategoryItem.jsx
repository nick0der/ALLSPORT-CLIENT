import styled from "styled-components";
import { mobile, smallMobile } from "../responsive";
import { Link } from "react-router-dom";

const ListItem = styled.li`
  flex: 1;
  margin: 5px;
  height: 450px;
  position: relative;
  min-width: 300px;
  ${mobile({ margin: "6px 0px" })}
  ${smallMobile({ minWidth: "200px" })}

  &:focus-within{
    box-shadow: 0px 0px 7px 4px #0c43ad;
    outline-color: transparent;
    outline-width: 2px;
  }

  &:hover h1{
    font-size: 50px;
    padding: 15px 0px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "250px" })}
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  width: 100%;
  padding: 10px 0px;
  margin: 25px 0px;
  transition: 0.1s;
  text-align: center;
  font-size: 47px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-shadow: 0 0 2px black; /* Firefox 3.5+, Opera 9+, Safari 1+, Chrome, IE10 */
  filter: progid:DXImageTransform.Microsoft.Glow(Color=#ffffff,Strength=1); /* IE<10 */
  ${smallMobile({ fontSize: "30px"})}
`;

export default function CategoryItem({item}){
  return(
    <ListItem role="article">
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} alt={item.description}/>
        <Info>
          <Title>{item.title}</Title>
        </Info>
      </Link>
    </ListItem>
  );
}
