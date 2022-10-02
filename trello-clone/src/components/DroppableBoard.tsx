import { Droppable } from "react-beautiful-dnd";
import { memo } from "react";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IDroppableBoardProps {
  toDos: string[];
  boardId: string;
}

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 15px 10px;
  border-radius: 5px;
  min-height: 300px;
  width: 300px;
`;

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
  console.log(boardId, "is rendered.");
  return (
    <Board>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Board>
  );
}

export default memo(DroppableBoard);
