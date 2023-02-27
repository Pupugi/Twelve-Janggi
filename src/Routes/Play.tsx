import styled from "styled-components";
import Token from "../Components/Token";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  BoardsTokensState,
  DaState,
  isGreenturn,
  errorMessage,
} from "../atoms";
import PlayBoard from "../Components/PlayBoard";

const ResetButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    border-radius: 10px;
    background-color: ${(props) => props.theme.btLikeBgColor};
    color: ${(props) => props.theme.btLikeTextColor};
    width: 100px;
    display: flex;
    justify-content: center;
  }
`;

const Deadzone = styled.div`
  width: 150px;
  min-height: 100px;
  background-color: ${(props) => props.theme.btLikeBgColor};
  color: ${(props) => props.theme.btLikeTextColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 5px;
  gap: 10px;
  span {
    justify-content: flex-start;
  }
`;

const RedsDeadzone = styled(Deadzone)`
  span {
    transform: rotate(180deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const DeadTokens = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const Notice = styled.div`
  color: ${(props) => props.theme.accentColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Play = () => {
  const [boardsTokens, setBoardsTokens] = useRecoilState(BoardsTokensState);
  const [da, setDa] = useRecoilState(DaState);
  const [greenturn, setGreenturn] = useRecoilState(isGreenturn);
  const [message, setMessage] = useRecoilState(errorMessage);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    if (destination.droppableId !== source.droppableId) {
      // 데드존으로 이동제한, 살리기는 상대존에 불가능
      if (
        destination.droppableId === "rda" ||
        destination.droppableId === "gda"
      ) {
        setMessage(`"잡은 말" 구역으로는 이동할 수 없습니다`);
        return;
      }
      if (greenturn) {
        if (source.droppableId === "gda") {
          if (
            destination.droppableId === "oneOne" ||
            destination.droppableId === "oneTwo" ||
            destination.droppableId === "oneThree"
          ) {
            setMessage("잡은 말은 상대 구역에 놓을 수 없습니다");
            return;
          }
        }
      }
      if (!greenturn) {
        if (source.droppableId === "rda") {
          if (
            destination.droppableId === "fourOne" ||
            destination.droppableId === "fourTwo" ||
            destination.droppableId === "fourThree"
          ) {
            setMessage("잡은 말은 상대 구역에 놓을 수 없습니다");
            return;
          }
        }
      }

      const destTeam = boardsTokens[destination.droppableId].team;
      const sourceTeam =
        source.droppableId === "gda"
          ? "green"
          : source.droppableId === "rda"
          ? "red"
          : boardsTokens[source.droppableId].team;
      // 자기차례 아닐때 이동제한
      if (greenturn) {
        if (sourceTeam === "red") {
          setMessage("녹색팀 차례입니다");
          return;
        }
      }
      if (!greenturn) {
        if (sourceTeam === "green") {
          setMessage("적색팀 차례입니다");
          return;
        }
      }

      if (source.droppableId === "rda" || source.droppableId === "gda") {
        if (boardsTokens[destination.droppableId].role !== "") {
          setMessage("잡은 말은 다른 말 위에 놓을 수 없습니다.");
          return;
        }
      }

      if (destTeam !== "" && destTeam === sourceTeam) {
        setMessage("같은팀 말은 잡을 수 없습니다");
        return;
      }
      // 말의 이동가능칸이 아니면 이동제한
      if (source.droppableId !== "gda" && source.droppableId !== "rda") {
        const sourceTeamToken = boardsTokens[source.droppableId];
        const sourceLocation = source.index;
        const destLocation = destination.index;
        const isFirstColumn =
          source.index === 0 ||
          source.index === 3 ||
          source.index === 6 ||
          source.index === 9;
        const isSecondColumn =
          source.index === 1 ||
          source.index === 4 ||
          source.index === 7 ||
          source.index === 10;
        const isThirdColumn =
          source.index === 2 ||
          source.index === 5 ||
          source.index === 8 ||
          source.index === 11;
        // 자(子) 이동
        if (sourceTeamToken.role === "子") {
          if (sourceTeam === "red") {
            if (destLocation !== sourceLocation + 3) {
              setMessage("자(子)는 앞으로만 이동할 수 있습니다");
              return;
            }
          } else {
            if (destLocation !== sourceLocation - 3) {
              setMessage("자(子)는 앞으로만 이동할 수 있습니다");
              return;
            }
          }
        }
        // 장(將) 이동
        if (sourceTeamToken.role === "將") {
          if (isFirstColumn) {
            if (
              !(
                destLocation === sourceLocation + 1 ||
                destLocation === sourceLocation + 3 ||
                destLocation === sourceLocation - 3
              )
            ) {
              setMessage("장(將)은 상하좌우로만 이동할 수 있습니다");
              return;
            }
          }
          if (isSecondColumn) {
            if (
              !(
                destLocation === sourceLocation + 1 ||
                destLocation === sourceLocation - 1 ||
                destLocation === sourceLocation + 3 ||
                destLocation === sourceLocation - 3
              )
            ) {
              setMessage("장(將)은 상하좌우로만 이동할 수 있습니다");
              return;
            }
          }
          if (isThirdColumn) {
            if (
              !(
                destLocation === sourceLocation - 1 ||
                destLocation === sourceLocation + 3 ||
                destLocation === sourceLocation - 3
              )
            ) {
              setMessage("장(將)은 상하좌우로만 이동할 수 있습니다");
              return;
            }
          }
        }
        // 상(相) 이동
        if (sourceTeamToken.role === "相") {
          if (isFirstColumn) {
            if (
              !(
                destLocation === sourceLocation + 4 ||
                destLocation === sourceLocation - 2
              )
            ) {
              setMessage("상(相)은 대각선으로만 이동할 수 있습니다");
              return;
            }
          }
          if (isSecondColumn) {
            if (
              !(
                destLocation === sourceLocation + 4 ||
                destLocation === sourceLocation - 2 ||
                destLocation === sourceLocation - 4 ||
                destLocation === sourceLocation + 2
              )
            ) {
              setMessage("상(相)은 대각선으로만 이동할 수 있습니다");
              return;
            }
          }
          if (isThirdColumn) {
            if (
              !(
                destLocation === sourceLocation - 4 ||
                destLocation === sourceLocation + 2
              )
            ) {
              setMessage("상(相)은 대각선으로만 이동할 수 있습니다");
              return;
            }
          }
        }
        // 왕(王) 이동
        if (sourceTeamToken.role === "王") {
          if (isFirstColumn) {
            if (
              !(
                destLocation === sourceLocation + 4 ||
                destLocation === sourceLocation - 2 ||
                destLocation === sourceLocation + 1 ||
                destLocation === sourceLocation + 3 ||
                destLocation === sourceLocation - 3
              )
            ) {
              setMessage("왕(王)은 모든 방향으로 한칸만 이동 가능합니다");
              return;
            }
          }
          if (isSecondColumn) {
            if (
              !(
                destLocation === sourceLocation + 1 ||
                destLocation === sourceLocation - 1 ||
                destLocation === sourceLocation + 2 ||
                destLocation === sourceLocation - 2 ||
                destLocation === sourceLocation + 3 ||
                destLocation === sourceLocation - 3 ||
                destLocation === sourceLocation + 4 ||
                destLocation === sourceLocation - 4
              )
            ) {
              setMessage("왕(王)은 모든 방향으로 한칸만 이동 가능합니다");
              return;
            }
          }
          if (isThirdColumn) {
            if (
              !(
                destLocation === sourceLocation - 4 ||
                destLocation === sourceLocation - 3 ||
                destLocation === sourceLocation - 1 ||
                destLocation === sourceLocation + 2 ||
                destLocation === sourceLocation + 3
              )
            ) {
              setMessage("왕(王)은 모든 방향으로 한칸만 이동 가능합니다");
              return;
            }
          }
        }
        // 후(侯) 이동
        if (sourceTeamToken.role === "侯") {
          if (sourceTeamToken.team === "green") {
            if (isFirstColumn) {
              if (
                !(
                  destLocation === sourceLocation - 3 ||
                  destLocation === sourceLocation - 2 ||
                  destLocation === sourceLocation + 1 ||
                  destLocation === sourceLocation + 3
                )
              ) {
                setMessage("후(侯)는 대각선 뒤로 이동할 수 없습니다");
                return;
              }
            }
            if (isSecondColumn) {
              if (
                !(
                  destLocation === sourceLocation + 1 ||
                  destLocation === sourceLocation - 1 ||
                  destLocation === sourceLocation - 2 ||
                  destLocation === sourceLocation + 3 ||
                  destLocation === sourceLocation - 3 ||
                  destLocation === sourceLocation - 4
                )
              ) {
                setMessage("후(侯)는 대각선 뒤로 이동할 수 없습니다");
                return;
              }
            }
            if (isThirdColumn) {
              if (
                !(
                  destLocation === sourceLocation - 4 ||
                  destLocation === sourceLocation - 3 ||
                  destLocation === sourceLocation - 1 ||
                  destLocation === sourceLocation + 3
                )
              ) {
                setMessage("후(侯)는 대각선 뒤로 이동할 수 없습니다");
                return;
              }
            }
          }
          if (sourceTeamToken.team === "red") {
            if (isFirstColumn) {
              if (
                !(
                  destLocation === sourceLocation - 3 ||
                  destLocation === sourceLocation + 1 ||
                  destLocation === sourceLocation + 3 ||
                  destLocation === sourceLocation + 4
                )
              ) {
                setMessage("후(侯)는 대각선 뒤로 이동할 수 없습니다");
                return;
              }
            }
            if (isSecondColumn) {
              if (
                !(
                  destLocation === sourceLocation + 1 ||
                  destLocation === sourceLocation - 1 ||
                  destLocation === sourceLocation + 2 ||
                  destLocation === sourceLocation + 3 ||
                  destLocation === sourceLocation - 3 ||
                  destLocation === sourceLocation + 4
                )
              ) {
                setMessage("후(侯)는 대각선 뒤로 이동할 수 없습니다");
                return;
              }
            }
            if (isThirdColumn) {
              if (
                !(
                  destLocation === sourceLocation - 3 ||
                  destLocation === sourceLocation - 1 ||
                  destLocation === sourceLocation + 2 ||
                  destLocation === sourceLocation + 3
                )
              ) {
                setMessage("후(侯)는 대각선 뒤로 이동할 수 없습니다");
                return;
              }
            }
          }
        }
      }

      // 이동, 잡기, 살리기 구현
      setBoardsTokens((prev) => {
        const newv = { ...prev };
        let destBoardToken = newv[destination.droppableId];
        let sourceBoardToken = newv[source.droppableId];
        destBoardToken = sourceBoardToken;
        sourceBoardToken = { role: "", team: "", id: Date.now() };
        if (source.droppableId !== "gda" && source.droppableId !== "rda") {
          return {
            ...prev,
            [source.droppableId]: sourceBoardToken,
            [destination.droppableId]: destBoardToken,
          };
        } else {
          const sourceDa = da[source.droppableId];
          const deadIndex = source.index;
          return {
            ...prev,
            [destination.droppableId]: sourceDa[deadIndex],
          };
        }
      });
      // 살린 토큰 데드존에서 제외
      if (source.droppableId === "gda" || source.droppableId === "rda") {
        setDa((prev) => {
          let sourceDa = [...da[source.droppableId]];
          const deadIndex = source.index;
          sourceDa.splice(deadIndex, 1);
          return {
            ...prev,
            [source.droppableId]: sourceDa,
          };
        });
      }
      // 팀 다를때 잡으면 데드존 이동 구현
      if (destTeam !== "" && destTeam !== sourceTeam) {
        setDa((preDa) => {
          let deadToken = boardsTokens[destination.droppableId];
          let deadTokenClone = { ...deadToken };
          if (deadTokenClone.role === "侯") {
            deadTokenClone.role = "子";
          }
          if (deadTokenClone.role === "王") {
            if (deadTokenClone.team === "red") {
              alert("녹색 승리");
              window.location.reload();
            }
            if (deadTokenClone.team === "green") {
              alert("적색 승리");
              window.location.reload();
            }
          }
          if (destTeam === "red") {
            deadTokenClone.team = "green";
            let newGreenDa = [...preDa.gda];
            newGreenDa.splice(0, 0, deadTokenClone);
            return {
              ...preDa,
              gda: newGreenDa,
            };
          } else {
            deadTokenClone.team = "red";
            let newRedDa = [...preDa.rda];
            newRedDa.splice(0, 0, deadTokenClone);
            return {
              ...preDa,
              rda: newRedDa,
            };
          }
        });
      }
      // 자(子)후(侯) 변경
      if (source.droppableId !== "rda" && source.droppableId !== "gda") {
        if (greenturn) {
          const sourceToken = boardsTokens[source.droppableId];
          if (sourceToken.team === "green" && sourceToken.role === "子") {
            if (
              destination.droppableId === "oneOne" ||
              destination.droppableId === "oneTwo" ||
              destination.droppableId === "oneThree"
            ) {
              setBoardsTokens((pre) => {
                let newv = { ...pre };
                let wiiChangeToken = { ...newv[destination.droppableId] };
                console.log(wiiChangeToken);
                wiiChangeToken.role = "侯";
                return {
                  ...pre,
                  [destination.droppableId]: wiiChangeToken,
                };
              });
            }
          }
        }
        if (!greenturn) {
          const sourceToken = boardsTokens[source.droppableId];
          if (sourceToken.team === "red" && sourceToken.role === "子") {
            if (
              destination.droppableId === "fourOne" ||
              destination.droppableId === "fourTwo" ||
              destination.droppableId === "fourThree"
            ) {
              setBoardsTokens((pre) => {
                let newv = { ...pre };
                let wiiChangeToken = { ...newv[destination.droppableId] };
                console.log(wiiChangeToken);
                wiiChangeToken.role = "侯";
                return {
                  ...pre,
                  [destination.droppableId]: wiiChangeToken,
                };
              });
            }
          }
        }
      }

      setGreenturn((pre) => {
        return !pre;
      });
      setMessage("");
      // 승리조건, 알림
      if (greenturn) {
        if (
          boardsTokens.fourOne.team === "red" &&
          boardsTokens.fourOne.role === "王"
        ) {
          alert("적색 승리");
          window.location.reload();
        }
        if (
          boardsTokens.fourTwo.team === "red" &&
          boardsTokens.fourTwo.role === "王"
        ) {
          alert("적색 승리");
          window.location.reload();
        }
        if (
          boardsTokens.fourThree.team === "red" &&
          boardsTokens.fourThree.role === "王"
        ) {
          alert("적색 승리");
          window.location.reload();
        }
      }
      if (!greenturn) {
        if (
          boardsTokens.oneOne.team === "green" &&
          boardsTokens.oneOne.role === "王"
        ) {
          alert("녹색 승리");
          window.location.reload();
        }
        if (
          boardsTokens.oneTwo.team === "green" &&
          boardsTokens.oneTwo.role === "王"
        ) {
          alert("녹색 승리");
          window.location.reload();
        }
        if (
          boardsTokens.oneThree.team === "green" &&
          boardsTokens.oneThree.role === "王"
        ) {
          alert("녹색 승리");
          window.location.reload();
        }
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Notice>
        <span>{greenturn ? "녹색팀 차례" : "적색팀 차례"}</span>
        <span>{message}</span>
      </Notice>
      <ResetButton>
        <a href="play">
          <span>새 게임</span>
        </a>
      </ResetButton>
      <Wrapper>
        <Droppable droppableId="rda">
          {(magic) => (
            <RedsDeadzone ref={magic.innerRef} {...magic.droppableProps}>
              <DeadTokens>
                {da.rda.map((token, index) => (
                  <Token
                    team={token.team}
                    draggableId={token.id + ""}
                    role={token.role}
                    index={index}
                    key={token.id + ""}
                  />
                ))}
                {magic.placeholder}
              </DeadTokens>
              <span>잡은 말</span>
            </RedsDeadzone>
          )}
        </Droppable>
        <PlayBoard />
        <Droppable droppableId="gda">
          {(magic) => (
            <Deadzone ref={magic.innerRef} {...magic.droppableProps}>
              <span>잡은 말</span>
              {da.gda.map((token, index) => (
                <Token
                  team={token.team}
                  draggableId={token.id + ""}
                  role={token.role}
                  index={index}
                  key={token.id + ""}
                />
              ))}
              {magic.placeholder}
            </Deadzone>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default Play;
