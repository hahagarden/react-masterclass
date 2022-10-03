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
  padding-top: 15px;
  border-radius: 5px;
  min-height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#f1f2f6"
      : props.isDraggingFrom
      ? "#ced6e0"
      : "transparent"};
  flex-grow: 1;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: background-color 0.3s ease-in-out;
`;

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
  console.log(boardId, "is rendered.");
  return (
    <Board>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Board>
  );
}

export default memo(DroppableBoard);
