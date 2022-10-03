import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDosAtom } from "./atoms";
import DroppableBoard from "./components/DroppableBoard";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDosAtom);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination?.index, 0, draggableId);
        return { ...allBoards, [source.droppableId]: copyBoard };
      });
    } else if (destination?.index !== source.index) {
      setToDos((allBoards) => {
        const copySourceBoard = [...allBoards[source.droppableId]];
        const copyDestinationBoard = [...allBoards[destination?.droppableId]];
        copySourceBoard.splice(source.index, 1);
        copyDestinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: copySourceBoard,
          [destination.droppableId]: copyDestinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <DroppableBoard
              key={boardId}
              toDos={toDos[boardId]}
              boardId={boardId}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
