import { atom } from "recoil";

interface IToDosAtom {
  [key: string]: string[];
}

export const toDosAtom = atom<IToDosAtom>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d"],
    Done: ["e", "f"],
  },
});
