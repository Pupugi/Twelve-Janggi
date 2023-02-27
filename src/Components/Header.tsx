import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiMoon, BiSun } from "react-icons/bi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15vh;
  top: 0;
  margin-top: 28px;
  font-size: 14px;
  padding: 20px;
  a {
    margin: auto;
    font-size: 36px;
  }
  position: relative;
`;

const ToggleBox = styled.button`
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  padding: 0px 10px;
  align-items: center;
  background-color: ${(props) => props.theme.toggleBoxColor};
  border: none;
  border-radius: 18px;
  position: absolute;
  right: 10%;
  top: 2%;
  cursor: pointer;
`;

const ToggleCircle = styled.div<{ isDark: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.toggleCircleColor};
  height: 22px;
  width: 22px;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    !props.isDark &&
    `
      transform: translate(40px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const Header = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <Nav>
        <Link to="/">십 이 장 기</Link>
      </Nav>
      <ToggleBox onClick={toggleDarkAtom}>
        <ToggleCircle isDark={isDark}>
          {isDark ? <BiMoon /> : <BiSun />}
        </ToggleCircle>
      </ToggleBox>
    </>
  );
};

export default Header;
