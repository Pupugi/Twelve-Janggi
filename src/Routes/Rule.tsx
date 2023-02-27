import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
  h1 {
    font-size: 30px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 400;
  }
  p {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  span {
    margin-top: 15px;
  }
`;

const Rule = () => {
  return (
    <Wrapper>
      <h1>규칙</h1>
      <p>
        <span>1. 4X3 12칸의 게임판에서 각각 4개의 말로 진행합니다.</span>
        <span>2. 각자 자신 바로 앞의 3칸이 자신의 진영이 됩니다.</span>
        <span>3. 각 말은 지정된 위치에 놓인 상태로 시작됩니다.</span>
        <span>
          4. 각 말은 표시된 방향으로만 이동할 수 있으며 게임이 시작되면 선
          플레이어부터 자신의 말 1개를 1칸 이동시킬 수 있습니다.
        </span>
        <span>
          5. 말을 이동시켜 상대방의 말을 잡을경우 해당 말을 포로로 잡게 되며
          포로로 잡은 말은 다음 차례부터 자신의 말로 사용할 수 있습니다. (상대방
          진영에는 배치할 수 없습니다.)
        </span>
        <span>6. 승리조건은 2가지입니다.</span>
        <span>6.1 상대방 왕을 잡은경우</span>
        <span>
          6.2 자신의 왕이 상대방의 진영에 들어가 자신의 턴이 다시 돌아올 때 까지
          한턴을 버틴경우
        </span>
        <span>
          7. 자(子)는 상대 진영에 들어가면 뒤집어서 후(侯)로 사용됩니다.
          후(侯)는 대각선 뒤쪽 방향을 제외한 전 방향으로 이동할 수 있습니다.
        </span>
        <span>
          8. 상대방의 후(侯)를 잡아 자신의 말로 사용할 경우에는 자(子)로
          뒤집어서 사용해야 합니다.
        </span>
        <span></span>
      </p>
    </Wrapper>
  );
};

export default Rule;
