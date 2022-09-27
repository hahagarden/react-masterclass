import { useState } from "react";
import { useForm } from "react-hook-form";
/* 
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) setToDoError("To Do should be longer");
    else console.log(toDo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} placeholder="write a todo" />
        {toDoError !== "" ? toDoError : null}
        <button>submit</button>
      </form>
    </div>
  );
}
 */

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="write a todo" />
        <button>submit</button>
      </form>
    </div>
  );
}
export default ToDoList;
