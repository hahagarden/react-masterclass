import { atom, selector } from "recoil";

export interface ItoDos {
  text: string;
  id: number;
  category: string;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: ItoDos[]) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDosAtom = atom<ItoDos[]>({
  key: "toDos",
  default: [],
  effects: [localStorageEffect("toDos")],
});

export const categoryListAtom = atom({
  key: "categoryList",
  default: { TO_DO: [], DOING: [], DONE: [] },
});

export const categoryAtom = atom({
  key: "category",
  default: "none",
});

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    const category = get(categoryAtom);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
