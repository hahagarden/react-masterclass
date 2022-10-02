import { atom } from "recoil";

interface IToDosAtom {
  [key: string]: string[];
} //[key: string] so that user can add boards.

export const toDosAtom = atom<IToDosAtom>({
  key: "toDo",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d"],
    done: ["e", "f"],
  },
});
