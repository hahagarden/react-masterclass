import { atom } from "recoil";

export interface ItoDos {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDosAtom = atom<ItoDos[]>({ key: "toDos", default: [] });
