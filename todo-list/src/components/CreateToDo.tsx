import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryAtom, toDosAtom } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDosAtom);
  const category = useRecoilValue(categoryAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleSubmitValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      { text: toDo, id: Date.now(), category },
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
        disabled={category == "none"}
      ></input>
      <button>submit</button>
    </form>
  );
}

export default CreateToDo;
