import styled from "styled-components";
import { ArrowForwardIos } from "@material-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { smallMobile } from "../responsive";

const ListItem = styled.li`
  flex: 1;
  margin: 7px;
  min-width: 300px;
  height: 475px;
  display: flex;
  justify-content: center;
  background-color: #e6e3da;
  position: relative;
  color: black;
  ${smallMobile({  minWidth: "200px"})}
  ${smallMobile({ height: "400px"})}
`;

const Image = styled.img`
  height: 60%;
  z-index: 10;
  margin-top 35px;
  ${smallMobile({ height: "50%"})}
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 300;
  width: 100%;
  top: 71%;
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  letter-spacing: 0.5px;
  ${smallMobile({ top: "65%"})}
`;

const PriceTitle = styled.span`
  font-size: 23px;
  font-weight: 600;
  width: 100%;
  top: 79%;
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  ${smallMobile({ top: "75%"})}
`;

const Info = styled.div`
  border-radius: 5px;
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Button = styled.button`
  width: 70%;
  padding: 11px 0px;
  height: 45px;
  border: solid gray 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 13px 5px;
  color: #333333;
  cursor: pointer;
`;

const ButtonText = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export default function ProductItem({item}){

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    var elements = document.getElementsByTagName("a");
    var imgs = document.getElementsByTagName("img");
    [].forEach.call(imgs, (item) => {
      item.style.cursor="default"
    });

    [].forEach.call(elements, (element) => {
      element.addEventListener("click", (e) => {
        if ((e.target.tagName === "IMG")
        || (e.target.tagName === "H2")
        || (e.target.tagName === "path")
        || (e.target.tagName === "BUTTON")
        || (e.target.tagName === "svg")) {
          console.log(e.target.tagName);
          e.preventDefault();
        }
      })
    });
  }, []);

  return(
    <ListItem
      role="article"
      aria-label={`Товар ${item.title}`}>
      <Image
        src={item.img[0]}
        alt={item.alt[0]}/>
      <Title>
        {item.title}
      </Title>
      <PriceTitle> {item.price} грн. </PriceTitle>
      <Info>
        <Button
          onClick={ () => {
            navigate(`/product/${item._id}`, {
              state:{from: location.pathname !== "/" ?
                location.pathname.split("/")[2].split("?")[0].replace("%20"," ")
                : "home"}
            });
          }}
          className="hoverable focusable">
          <ButtonText>
            Перейти до товару&nbsp;
          </ButtonText>
          <ArrowForwardIos style={{ width : 19, height: 19}}/>
        </Button>
      </Info>
    </ListItem>
  );
}
