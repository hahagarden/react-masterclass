import { ItoDos } from "./atoms";

function AddToDo({ text }: ItoDos) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>DOING</button>
      <button>DONE</button>
    </li>
  );
}

export default AddToDo;
