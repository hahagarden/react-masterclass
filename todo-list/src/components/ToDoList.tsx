import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface ItoDos {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDosAtom = atom<ItoDos[]>({ key: "toDos", default: [] });

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDosAtom);
  const handleSubmitValid = (data: IForm) => {
    setToDos((prevToDos) => [
      { text: data.toDo, id: 1, category: "TO_DO" },
      ...prevToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleSubmitValid)}>
        <input
          {...register("toDo", {
            required: "plaese write a to-do",
          })}
          placeholder="write a to-do"
        ></input>
        <button>submit</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
