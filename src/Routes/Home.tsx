import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 75vh;
  margin: 0 auto;
  padding: 20px 50px 100px 50px;
  font-size: 24px;
`;

const ButtonLike = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.btLikeBgColor};
  color: ${(props) => props.theme.btLikeTextColor};
  text-align: center;
  border-radius: 15px;
  padding: 5px;
  a {
    display: block;
  }
`;

function Home() {
  return (
    <Wrapper>
      <ButtonLike>
        <Link to="/play">μ μ</Link>
      </ButtonLike>
      <ButtonLike>
        <Link to="/rule">κ· μΉ</Link>
      </ButtonLike>
    </Wrapper>
  );
}
export default Home;
