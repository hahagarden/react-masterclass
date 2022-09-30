import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}

export interface ItoDos {
  text: string;
  id: number;
  category: Categories;
}

export const toDosAtom = atom<ItoDos[]>({ key: "toDos", default: [] });

export const categoryAtom = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    const category = get(categoryAtom);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
