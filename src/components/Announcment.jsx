import styled from "styled-components";

const Span = styled.span`
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #373b00;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Announcment(){
  return(
    <Span>
      Супер скидка! Купуй більше ніж 2 одиниць товару і отримай безкоштовну доставку!
    </Span>
  );
}
