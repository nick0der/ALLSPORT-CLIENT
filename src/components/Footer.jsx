import styled from "styled-components";
import {
  Facebook,
  Instagram,
  Twitter,
  Telegram,
  Room,
  Phone,
  MailOutline,
  Accessibility
} from "@material-ui/icons";
import { tablet, smallTablet, mobile, smallMobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.footer`
  display: flex;
  border-top: solid gray 1px;
  margin-top: 30px;
  background-color: #f7f7f0;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${tablet({ padding: "10px" })}
  ${smallTablet({ padding: "10px" })}
`;

const LogoWrapper = styled.div`
  flex: 1;
  margin-right: auto;
  height: 10px;
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;

const Logo = styled.h1`
    font-size: 33px;
`;

const Description = styled.p`
  margin: 20px 0px;
  ${smallMobile({ fontSize: "13px" })}
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.section`
  flex: 1;
  padding: 20px;
  ${tablet({ padding: "10px" })}
  ${smallTablet({ padding: "10px" })}
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 30px;
  ${mobile({ textAlign: "center" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  ${tablet({ fontSize: "15px" })}
  ${smallTablet({ fontSize: "15px" })}
  ${smallMobile({ fontSize: "13px" })}
`;

const Right = styled.section`
  flex: 1;
  padding: 20px;
  ${tablet({ padding: "10px" })}
  ${smallTablet({ padding: "10px" })}
`;

const ContactItem = styled.article`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${tablet({ fontSize: "15px" })}
  ${smallTablet({ fontSize: "15px" })}
  ${smallMobile({ fontSize: "13px" })}
`;

const Payment = styled.img`
  width: 100px;
`;

const StyledLink  = styled(Link)`
 margin-right: 15px;
`;

const StyledLinkUseful  = styled(Link)`
 color: black;
 text-decoration: none;
`;

export default function Footer({item}){
  return(
    <Container>
      <Left aria-label="Опис">
        <LogoWrapper>
          <Logo>ALLSPORT.</Logo>
          <Accessibility style={{ width : 37, height: 37}}/>
        </LogoWrapper>
        <Description>
          Ми прагнемо, щоб кожен міг дозволити собі займатися спортом.
        </Description>
        <SocialContainer aria-label="Соціальні мережі">
          <StyledLink
            to="/"
            aria-label="Facebook"
            className="hoverable focusable">
            <SocialIcon color="3B5999">
              <Facebook style={{width: 25, height: 25}}/>
            </SocialIcon>
          </StyledLink>
          <StyledLink
            to="/"
            aria-label="Instagram"
            className="hoverable focusable">
            <SocialIcon color="E4405F">
              <Instagram style={{width: 25, height: 25}}/>
            </SocialIcon>
          </StyledLink>
          <StyledLink
            to="/"
            aria-label="Twitter"
            className="hoverable focusable">
            <SocialIcon color="55ACEE">
              <Twitter style={{width: 25, height: 25}}/>
            </SocialIcon>
          </StyledLink>
          <StyledLink
            to="/"
            aria-label="Telegram"
            className="hoverable focusable">
            <SocialIcon color="0088CC">
              <Telegram style={{width: 25, height: 25}}/>
            </SocialIcon>
          </StyledLink>
        </SocialContainer>
      </Left>
      <Center aria-label="Корисні посилання">
        <Title>
          Корисні посилання
        </Title>
        <List aria-label="Корисні посилання">
          <ListItem component={StyledLinkUseful} to="/">
            <StyledLinkUseful
              to="/"
              className="hoverable focusable">Головна</StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/cart"
              className="hoverable focusable">Корзина</StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/fitness"
              className="hoverable focusable">Фітнес</StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/cycling"
              className="hoverable focusable">Велоспорт</StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/gym"
              className="hoverable focusable">Спортзал</StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/sportwear"
              className="hoverable focusable">Спортивний одяг</StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/exercise machines"
              className="hoverable focusable">
              Тренажери
            </StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/winter sports"
              className="hoverable focusable">
              Зимовий спорт
            </StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/sports nutrition"
              className="hoverable focusable">
              Спортивне харчування
            </StyledLinkUseful>
          </ListItem>
          <ListItem>
            <StyledLinkUseful
              to="/products/accessories"
              className="hoverable focusable">Аксесуари</StyledLinkUseful>
          </ListItem>
        </List>
      </Center>
      <Right aria-label="Зворотній зв'язок">
        <Title>Зворотній зв'язок</Title>
        <ContactItem>
          <Room style={{width: 25, height: 25, marginRight: "10px"}}/>
          Чернівці, вул. Головна 55, 779082
        </ContactItem>
        <ContactItem title="Phone">
          <Phone style={{width: 25, height: 25, marginRight: "10px"}}/>
          +380 96 840 2310
        </ContactItem>
        <ContactItem>
          <MailOutline
            style={{width: 25, height: 25, marginRight: "10px"}}/>
          contact@allsport.com
        </ContactItem>
        <Payment
          src="img/visamastercard.png"
          alt="Visa Mastercard"/>
      </Right>
    </Container>
  );
}
