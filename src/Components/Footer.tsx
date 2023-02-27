import styled from "styled-components";

const Myfooter = styled.footer`
  text-align: center;
  opacity: 0.3;
  padding-bottom: 30px;
  width: 100%;
  margin: auto;
  bottom: 20px;
`;

function Footer() {
  return <Myfooter>&copy; Twelve-Janggi</Myfooter>;
}
export default Footer;
