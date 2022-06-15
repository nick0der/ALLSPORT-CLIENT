import styled from "styled-components";
import { tablet, smallTablet, mobile, smallMobile } from "../responsive";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, logout } from "../redux/apis";
import { Link, useNavigate } from "react-router-dom";

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
  width: 40%;
  background-color: white;
  border: solid gray 3px;
  ${tablet({ width: "55%" })}
  ${smallTablet({ width: "65%" })}
  ${mobile({ width: "70%" })}
  ${smallMobile({ width: "80%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Input = styled.input`
  width: 43%;
  margin-top: 8px;
  border: 3px solid gray;
  padding: 12px;
  font-size: 16px;
  ${mobile({ width: "100%", boxSizing: "border-box" })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  ${mobile({ width: "100%", boxSizing: "border-box" })}
`;

const StyledLink  = styled(Link)`
  margin: 7px 190px 7px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({ marginRight: "0px" })}
`;

const Button = styled.button`
  width: 100%;
  padding: 11px 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  cursor: pointer;
  border: solid gray 3px;
  font-size: 17px;
  font-weight: bold;
  color: #333333;
  ${mobile({ width: "100%", boxSizing: "border-box" })}

  &:disabled{
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

export default function Register(){

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);
  const { isFetching, error } = useSelector(state => state.user);

  useEffect(()=>{
    logout(dispatch);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    register(dispatch, { name, lastName, username, email, password });
  };

  return(
    <Container>
      <Main aria-label="Створення аккаунту">
        <Title>Створення аккаунту</Title>
        <Form>
          <Input
            required
            type="text"
            name="name"
            placeholder="Ім'я"
            className="focusable"
            onChange={(e) => setName(e.target.value)}/>
          <Input
            required
            type="text"
            name="last name"
            placeholder="Прізвище"
            className="focusable"
            onChange={(e) => setLastName(e.target.value)}/>
          <Input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="focusable"
            onChange={(e) => setEmail(e.target.value)}/>
          <Input
            required
            type="text"
            name="username"
            placeholder="Username"
            className="focusable"
            onChange={(e) => setUsername(e.target.value)}/>
          <Input
            required
            type="password"
            name="password"
            placeholder="Пароль"
            className="focusable"
            onChange={(e) => setPassword(e.target.value)}/>
          <Input
            required
            type="password"
            name="confirm password"
            placeholder="Підтвердіть пароль"
            className="focusable"
            onChange={(e) => setConfirmPassword(e.target.value)}/>
          <Agreement>
            Створюючи обліковий запис, я даю згоду на обробку моїх персональних даних відповідно до <b>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</b>
          </Agreement>
          <Button className="focusable hoverable" onClick={handleClick}>Створити</Button>
          { error && <Error>Щось пішло не так...</Error> }
          <StyledLink to="/login" className="focusable hoverable">
            Вже є аккаунт?
          </StyledLink>
          <StyledLink to="/" className="focusable hoverable">
            Повернутись на головну
          </StyledLink>
        </Form>
      </Main>
    </Container>
  );
}
