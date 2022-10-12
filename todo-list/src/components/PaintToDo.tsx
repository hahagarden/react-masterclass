import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryListAtom, ItoDos, toDosAtom } from "./atoms";

function PaintToDo({ text, category, id }: ItoDos) {
  const setToDos = useSetRecoilState(toDosAtom);
  const categories = useRecoilValue(categoryListAtom);
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
      {Object.keys(categories).map((each) => {
        return (
          category !== each && (
            <button onClick={() => onClick(each)}>{each}</button>
          )
        );
      })}
    </li>
  );
}

export default PaintToDo;
