import { useRecoilValue } from "recoil";
import { toDosAtom, toDosSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import AddToDo from "./AddToDo";

function ToDoList() {
  const [toDos, doings, dones] = useRecoilValue(toDosSelector);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <h1>ToDos</h1>
      <ul>
        {toDos.map((toDo) => (
          <AddToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h1>Doings</h1>
      <ul>
        {doings.map((doing) => (
          <AddToDo key={doing.id} {...doing} />
        ))}
      </ul>
      <h1>Dones</h1>
      <ul>
        {dones.map((done) => (
          <AddToDo key={done.id} {...done} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
