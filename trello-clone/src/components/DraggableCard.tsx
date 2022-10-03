import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { memo } from "react";
import { IToDo } from "../atoms";

interface IDraggableCardProps {
  toDo: IToDo;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#f0932b" : props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDo.id} draggableId={toDo.id + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
