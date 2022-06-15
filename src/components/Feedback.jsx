import styled from "styled-components";
import { Send } from "@material-ui/icons";
import { smallMobile, mobile } from "../responsive";

const Container = styled.section`
  height: 500px;
  background-color: #f5f3eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  border-top: solid gray 1px;
  ${mobile({ height: "600px"})}
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "50px", paddingLeft: "30px" })}
  ${smallMobile({ fontSize: "40px" })}
`;

const Description = styled.h2`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  ${mobile({ textAligh: "center", paddingLeft: "40px", paddingRight: "40px" })}
  ${smallMobile({ textAlign: "center", fontSize: "17px" })}
`;

const InputContainer = styled.div`
  width: 55vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
  ${mobile({ width: "100%"})}
`;

const InputName = styled.input`
  border: 3px solid gray;
  padding: 12px;
  font-size: 16px;
  width: 50%;
  letter-spacing: 0.5px;
  ${mobile({ width: "100%", boxSizing: "border-box"})}
`;

const InputEmail = styled.input`
  border: 3px solid gray;
  padding: 12px;
  margin-left: 20px;
  font-size: 16px;
  width: 50%;
  letter-spacing: 0.5px;
  ${mobile({
    width: "100%",
    boxSizing: "border-box",
    margin: "10px 0px 0px 0px"
  })}
`;

const InputMessageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 135px;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

const InputMessage = styled.textarea`
  border: 3px solid gray;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

const Submit = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 0px;
  margin-top: 10px;
  border: solid gray 3px;
  font-size: 18px;
  font-weight: bold;
  background-color: white;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid transparent 20px;
  background-color: #c4c4ad;
  color: white;
  z-index: 50;
  ${mobile({ width: "90vw"})}
`;

export default function Feedback({item}){
  return(
    <Container aria-label="Зворотній зв'язок" id="contactForm">
      <Title>
        Зворотній зв'язок
      </Title>
      <Description>Надсилай повідомлення і ми відповімо найближчим часом</Description>
      <ContactForm aria-label="Форма контактної інформації">
        <InputContainer aria-label="Поле ім'я та email">
          <InputName
            placeholder="Ім'я"
            title="Name"
            aria-label="Ім'я"
            className="focusable"/>
          <InputEmail
            placeholder="Email"
            title="Email"
            aria-label="Email"
            className="focusable"/>
        </InputContainer>
        <InputMessageContainer>
          <InputMessage
            placeholder="Повідомлення"
            title="Message"
            aria-label="Повідомлення"
            className="focusable"/>
        </InputMessageContainer>
        <Submit type="submit" className="hoverable focusable">
          Надіслати<Send style={{ width : 25, height: 25, marginLeft: "5px" }}/>
        </Submit>
      </ContactForm>
    </Container>
  );
}
