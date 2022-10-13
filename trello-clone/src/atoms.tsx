import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
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
  effects_UNSTABLE: [persistAtom],
});
