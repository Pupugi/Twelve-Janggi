import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ team: string }>`
  width: 60%;
  height: ${(props) => (props.role === "" ? "1px" : "10vh")};
  opacity: ${(props) => (props.role === "" ? 0 : 1)};
  background-color: ${(props) => (props.role !== "" ? "#cbb17b" : "inherit")};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 45px;
    color: ${(props) =>
      props.team === "red" ? props.theme.redTeam : props.theme.greenTeam};
  }
`;

interface TokenProps {
  role: string;
  draggableId: string;
  index: number;
  team: string;
}

const Token = ({ team, role, draggableId, index }: TokenProps) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          role={role}
          team={team}
        >
          <span>{role}</span>
        </Card>
      )}
    </Draggable>
  );
};

export default Token;
