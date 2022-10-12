import { useRecoilValue, useRecoilState } from "recoil";
import { categoryAtom, categoryListAtom, toDosSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import PaintToDo from "./PaintToDo";
import { useState } from "react";

function ToDoList() {
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  const [categories, setCategories] = useRecoilState(categoryListAtom);
  const onClick = () => setAddCategory((current) => !current);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewCategory(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCategories((prev) => {
      return { ...prev, [newCategory]: [] };
    });
    setAddCategory(false);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="none" selected>
          ==category==
        </option>
        {Object.keys(categories).map((each, index) => (
          <option key={index} value={each}>
            {each}
          </option>
        ))}
      </select>
      <button onClick={onClick}>
        {addCategory ? "cancel" : "add category"}
      </button>
      {addCategory ? (
        <div style={{ display: "inline-block" }}>
          <form onSubmit={onSubmit}>
            <input
              value={newCategory}
              onChange={onChange}
              type="text"
              placeholder="add new category"
              required
            />
            <button>add this category</button>
          </form>
        </div>
      ) : null}
      <CreateToDo />
      {toDos?.map((toDo) => (
        <PaintToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
