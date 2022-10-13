import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDosAtom } from "../atoms";

const Form = styled.form`
  margin: 20px;
`;

interface IForm {
  addBoard: string;
}

const Input = styled.input``;

function AddBoard() {
  const { register, handleSubmit } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDosAtom);
  const handleValid = (data: IForm) => {
    setToDos((current) => ({ ...current, [data.addBoard]: [] }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleValid)}>
        <input {...register("addBoard")} />
        <button>add Board</button>
      </Form>
    </>
  );
}

export default AddBoard;
