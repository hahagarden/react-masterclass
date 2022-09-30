import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDosAtom } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDosAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleSubmitValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...prevToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitValid)}>
      <input
        {...register("toDo", {
          required: "plaese write a to-do",
        })}
        placeholder="write a to-do"
      ></input>
      <button>submit</button>
    </form>
  );
}

export default CreateToDo;
