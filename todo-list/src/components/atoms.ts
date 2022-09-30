import { atom, selector } from "recoil";

export interface ItoDos {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDosAtom = atom<ItoDos[]>({ key: "toDos", default: [] });

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
