import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BoardsTokensState } from "../atoms";
import Token from "./Token";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 15vh);
  gap: 3px;
  padding: 3px;
  background-color: black;
  width: 600px;
`;

interface IArea {
  area?: string;
  team: string;
  draggingOverWith: boolean;
}

const BoardSquare = styled.div<IArea>`
  background-color: ${(props) => (props) =>
    props.draggingOverWith
      ? props.theme.accentColor
      : props.area === "red"
      ? props.theme.redTeam
      : props.area === "green"
      ? props.theme.greenTeam
      : props.theme.btLikeBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.btLikeTextColor};
  span {
    transform: ${(props) =>
      props.team === "red" ? `rotate(180deg)` : `rotate(0deg)`};
  }
`;

const PlayBoard = () => {
  const boardsTokens = useRecoilValue(BoardsTokensState);
  return (
    <Wrapper>
      {Object.keys(boardsTokens).map((boardId, index) => (
        <Droppable key={boardId} droppableId={boardId}>
          {(magic, snapshot) => (
            <BoardSquare
              area={index < 3 ? "red" : index > 8 ? "green" : ""}
              ref={magic.innerRef}
              {...magic.droppableProps}
              team={boardsTokens[boardId].team}
              draggingOverWith={Boolean(snapshot.draggingOverWith)}
            >
              <Token
                team={boardsTokens[boardId].team}
                draggableId={boardsTokens[boardId].id + ""}
                role={boardsTokens[boardId].role}
                index={index}
                key={boardsTokens[boardId].id + ""}
              />
            </BoardSquare>
          )}
        </Droppable>
      ))}
    </Wrapper>
  );
};

export default React.memo(PlayBoard);
