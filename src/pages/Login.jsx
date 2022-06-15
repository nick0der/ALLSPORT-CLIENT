import styled from "styled-components";
import { mobile, tablet, smallMobile, smallTablet } from "../responsive";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/apis";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url(img/sport-congresse.jpeg)
  center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 20px;
  width: 30%;
  background-color: white;
  border: solid gray 3px;
  ${tablet({ width: "40%" })}
  ${smallTablet({ width: "60%" })}
  ${mobile({ width: "70%" })}
  ${smallMobile({ width: "80%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 7px;
  font-weight: 300;
  text-align: center;
`;

const Input = styled.input`
  min-width: 40%;
  margin: 10px 0px;
  border: 3px solid gray;
  padding: 12px;
  font-size: 16px;
`;

const StyledLink  = styled(Link)`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const Button = styled.button`
  min-width: 40%;
  padding: 11px 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  cursor: pointer;
  border: solid gray 3px;
  font-size: 17px;
  font-weight: bold;
  color: #333333;

  &:disabled{
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

export default function Login(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(state => state.user);

  useEffect(()=>{
    logout(dispatch);
  }, [dispatch]);

  const handleClick = async (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return(
    <Container>
      <Main>
        <Title>Вхід</Title>
        <Form>
          <Input
            required
            placeholder="Username"
            className="focusable"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Пароль"
            type="password"
            className="focusable"
            onChange={(e) => setPassword(e.target.value)}
          />
        <Button
          type="submit"
          onClick={handleClick}
          disabled={isFetching}
          className="hoverable focusable">
          Увійти
        </Button>
          { error && <Error>Username або пароль неправильні...</Error> }
          <StyledLink className="hoverable focusable" to="/#contactForm">
            Не пам'ятаєте свій пароль?
          </StyledLink>
          <StyledLink className="hoverable focusable" to="/register">
            Створити новий аккаунт
          </StyledLink>
          <StyledLink className="hoverable focusable" to="/">
            Повернутись на головну
          </StyledLink>
        </Form>
      </Main>
    </Container>
  );
}
