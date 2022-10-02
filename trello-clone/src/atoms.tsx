import { atom } from "recoil";

export const toDosAtom = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e"],
});
