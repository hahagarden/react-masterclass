import { useRecoilValue, useRecoilState } from "recoil";
import { categoryAtom, categoryListAtom, toDosSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import PaintToDo from "./PaintToDo";
import { useState } from "react";

function ToDoList() {
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [addCategory, setAddCategory] = useState(false);
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useRecoilState(categoryListAtom);
  const onSetCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  const onAddCategory = () => setAddCategory((current) => !current);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setInputText(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCategories((prev) => {
      return { ...prev, [inputText]: [] };
    });
    setAddCategory(false);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onSetCategory}>
        <option value="none" selected>
          ==category==
        </option>
        {Object.keys(categories).map((each, index) => (
          <option key={index} value={each}>
            {each}
          </option>
        ))}
      </select>
      <button onClick={onAddCategory}>
        {addCategory ? "cancel" : "add category"}
      </button>
      {addCategory ? (
        <div style={{ display: "inline-block" }}>
          <form onSubmit={onSubmit}>
            <input
              value={inputText}
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
