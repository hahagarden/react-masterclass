import { atom, selector } from "recoil";

export interface ItoDos {
  text: string;
  id: number;
  category: string;
}

export const toDosAtom = atom<ItoDos[]>({ key: "toDos", default: [] });

export const categoryListAtom = atom({
  key: "categoryList",
  default: { TO_DO: [], DOING: [], DONE: [] },
});

export const categoryAtom = atom({
  key: "category",
  default: "TO DO",
});

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    const category = get(categoryAtom);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
