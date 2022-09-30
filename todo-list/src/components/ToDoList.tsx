import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, categoryAtom, toDosSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import PaintToDo from "./PaintToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(Number(event.currentTarget.value));
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <PaintToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
