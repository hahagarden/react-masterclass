import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IDroppableBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard toDo={toDo} index={index} />
          ))}
          {magic.placeholder}
        </Board>
      )}
    </Droppable>
  );
}

export default DroppableBoard;
