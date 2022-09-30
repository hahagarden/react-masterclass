import { useRecoilValue } from "recoil";
import { toDosAtom } from "./atoms";
import CreateToDo from "./CreateToDo";
import AddToDo from "./AddToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDosAtom);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <AddToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
