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
    return toDos.filter((toDo) => toDo.category === category);
  },
});
