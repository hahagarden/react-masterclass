import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDosAtom {
  [key: string]: IToDo[];
}

export const toDosAtom = atom<IToDosAtom>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
