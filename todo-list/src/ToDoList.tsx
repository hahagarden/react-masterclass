import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleSubmitValid = (data: IForm) => {
    console.log(data.toDo, "is submitted");
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitValid)}>
        <input
          {...register("toDo", {
            required: "plaese write a to-do",
          })}
          placeholder="write a to-do"
        ></input>
        <button>submit</button>
      </form>
    </div>
  );
}

export default ToDoList;
