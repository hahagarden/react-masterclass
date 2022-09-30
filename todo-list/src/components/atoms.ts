import { atom, selector } from "recoil";

export interface ItoDos {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDosAtom = atom<ItoDos[]>({ key: "toDos", default: [] });

export const categoryAtom = atom({ key: "category", default: "TO_DO" });

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    const category = get(categoryAtom);

    if (category === "TO_DO")
      return toDos.filter((toDo) => toDo.category === "TO_DO");
    if (category === "DOING")
      return toDos.filter((toDo) => toDo.category === "DOING");
    if (category === "DONE")
      return toDos.filter((toDo) => toDo.category === "DONE");
  },
});
