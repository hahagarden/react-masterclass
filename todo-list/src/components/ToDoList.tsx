import { useRecoilValue, useRecoilState } from "recoil";
import { categoryAtom, toDosSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import AddToDo from "./AddToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const onInput = (selectedCategory: React.FormEvent<HTMLSelectElement>) => {
    setCategory(selectedCategory.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <AddToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
