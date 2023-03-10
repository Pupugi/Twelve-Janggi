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
      // ??????????????? ????????????, ???????????? ???????????? ?????????
      if (
        destination.droppableId === "rda" ||
        destination.droppableId === "gda"
      ) {
        setMessage(`"?????? ???" ??????????????? ????????? ??? ????????????`);
        return;
      }
      if (greenturn) {
        if (source.droppableId === "gda") {
          if (
            destination.droppableId === "oneOne" ||
            destination.droppableId === "oneTwo" ||
            destination.droppableId === "oneThree"
          ) {
            setMessage("?????? ?????? ?????? ????????? ?????? ??? ????????????");
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
            setMessage("?????? ?????? ?????? ????????? ?????? ??? ????????????");
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
      // ???????????? ????????? ????????????
      if (greenturn) {
        if (sourceTeam === "red") {
          setMessage("????????? ???????????????");
          return;
        }
      }
      if (!greenturn) {
        if (sourceTeam === "green") {
          setMessage("????????? ???????????????");
          return;
        }
      }

      if (source.droppableId === "rda" || source.droppableId === "gda") {
        if (boardsTokens[destination.droppableId].role !== "") {
          setMessage("?????? ?????? ?????? ??? ?????? ?????? ??? ????????????.");
          return;
        }
      }

      if (destTeam !== "" && destTeam === sourceTeam) {
        setMessage("????????? ?????? ?????? ??? ????????????");
        return;
      }
      // ?????? ?????????????????? ????????? ????????????
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
        // ???(???) ??????
        if (sourceTeamToken.role === "???") {
          if (sourceTeam === "red") {
            if (destLocation !== sourceLocation + 3) {
              setMessage("???(???)??? ???????????? ????????? ??? ????????????");
              return;
            }
          } else {
            if (destLocation !== sourceLocation - 3) {
              setMessage("???(???)??? ???????????? ????????? ??? ????????????");
              return;
            }
          }
        }
        // ???(???) ??????
        if (sourceTeamToken.role === "???") {
          if (isFirstColumn) {
            if (
              !(
                destLocation === sourceLocation + 1 ||
                destLocation === sourceLocation + 3 ||
                destLocation === sourceLocation - 3
              )
            ) {
              setMessage("???(???)??? ?????????????????? ????????? ??? ????????????");
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
              setMessage("???(???)??? ?????????????????? ????????? ??? ????????????");
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
              setMessage("???(???)??? ?????????????????? ????????? ??? ????????????");
              return;
            }
          }
        }
        // ???(???) ??????
        if (sourceTeamToken.role === "???") {
          if (isFirstColumn) {
            if (
              !(
                destLocation === sourceLocation + 4 ||
                destLocation === sourceLocation - 2
              )
            ) {
              setMessage("???(???)??? ?????????????????? ????????? ??? ????????????");
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
              setMessage("???(???)??? ?????????????????? ????????? ??? ????????????");
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
              setMessage("???(???)??? ?????????????????? ????????? ??? ????????????");
              return;
            }
          }
        }
        // ???(???) ??????
        if (sourceTeamToken.role === "???") {
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
              setMessage("???(???)??? ?????? ???????????? ????????? ?????? ???????????????");
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
              setMessage("???(???)??? ?????? ???????????? ????????? ?????? ???????????????");
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
              setMessage("???(???)??? ?????? ???????????? ????????? ?????? ???????????????");
              return;
            }
          }
        }
        // ???(???) ??????
        if (sourceTeamToken.role === "???") {
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
                setMessage("???(???)??? ????????? ?????? ????????? ??? ????????????");
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
                setMessage("???(???)??? ????????? ?????? ????????? ??? ????????????");
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
                setMessage("???(???)??? ????????? ?????? ????????? ??? ????????????");
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
                setMessage("???(???)??? ????????? ?????? ????????? ??? ????????????");
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
                setMessage("???(???)??? ????????? ?????? ????????? ??? ????????????");
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
                setMessage("???(???)??? ????????? ?????? ????????? ??? ????????????");
                return;
              }
            }
          }
        }
      }

      // ??????, ??????, ????????? ??????
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
      // ?????? ?????? ??????????????? ??????
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
      // ??? ????????? ????????? ????????? ?????? ??????
      if (destTeam !== "" && destTeam !== sourceTeam) {
        setDa((preDa) => {
          let deadToken = boardsTokens[destination.droppableId];
          let deadTokenClone = { ...deadToken };
          if (deadTokenClone.role === "???") {
            deadTokenClone.role = "???";
          }
          if (deadTokenClone.role === "???") {
            if (deadTokenClone.team === "red") {
              alert("?????? ??????");
              window.location.reload();
            }
            if (deadTokenClone.team === "green") {
              alert("?????? ??????");
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
      // ???(???)???(???) ??????
      if (source.droppableId !== "rda" && source.droppableId !== "gda") {
        if (greenturn) {
          const sourceToken = boardsTokens[source.droppableId];
          if (sourceToken.team === "green" && sourceToken.role === "???") {
            if (
              destination.droppableId === "oneOne" ||
              destination.droppableId === "oneTwo" ||
              destination.droppableId === "oneThree"
            ) {
              setBoardsTokens((pre) => {
                let newv = { ...pre };
                let wiiChangeToken = { ...newv[destination.droppableId] };
                console.log(wiiChangeToken);
                wiiChangeToken.role = "???";
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
          if (sourceToken.team === "red" && sourceToken.role === "???") {
            if (
              destination.droppableId === "fourOne" ||
              destination.droppableId === "fourTwo" ||
              destination.droppableId === "fourThree"
            ) {
              setBoardsTokens((pre) => {
                let newv = { ...pre };
                let wiiChangeToken = { ...newv[destination.droppableId] };
                console.log(wiiChangeToken);
                wiiChangeToken.role = "???";
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
      // ????????????, ??????
      if (greenturn) {
        if (
          boardsTokens.fourOne.team === "red" &&
          boardsTokens.fourOne.role === "???"
        ) {
          alert("?????? ??????");
          window.location.reload();
        }
        if (
          boardsTokens.fourTwo.team === "red" &&
          boardsTokens.fourTwo.role === "???"
        ) {
          alert("?????? ??????");
          window.location.reload();
        }
        if (
          boardsTokens.fourThree.team === "red" &&
          boardsTokens.fourThree.role === "???"
        ) {
          alert("?????? ??????");
          window.location.reload();
        }
      }
      if (!greenturn) {
        if (
          boardsTokens.oneOne.team === "green" &&
          boardsTokens.oneOne.role === "???"
        ) {
          alert("?????? ??????");
          window.location.reload();
        }
        if (
          boardsTokens.oneTwo.team === "green" &&
          boardsTokens.oneTwo.role === "???"
        ) {
          alert("?????? ??????");
          window.location.reload();
        }
        if (
          boardsTokens.oneThree.team === "green" &&
          boardsTokens.oneThree.role === "???"
        ) {
          alert("?????? ??????");
          window.location.reload();
        }
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Notice>
        <span>{greenturn ? "????????? ??????" : "????????? ??????"}</span>
        <span>{message}</span>
      </Notice>
      <ResetButton>
        <a href="play">
          <span>??? ??????</span>
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
              <span>?????? ???</span>
            </RedsDeadzone>
          )}
        </Droppable>
        <PlayBoard />
        <Droppable droppableId="gda">
          {(magic) => (
            <Deadzone ref={magic.innerRef} {...magic.droppableProps}>
              <span>?????? ???</span>
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
