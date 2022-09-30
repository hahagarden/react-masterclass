import { useSetRecoilState } from "recoil";
import { Categories, ItoDos, toDosAtom } from "./atoms";

function PaintToDo({ text, category, id }: ItoDos) {
  const setToDos = useSetRecoilState(toDosAtom);
  const onClick = (newCategory: ItoDos["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>DOING</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>DONE</button>
      )}
    </li>
  );
}

export default PaintToDo;
