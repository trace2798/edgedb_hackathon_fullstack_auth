import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import { create } from "zustand";

type BoardsStore = {

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useBoards = create<BoardsStore>((set) => ({
 
  isOpen: false,
  defaultStatus: "",
  onOpen: () =>
    set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
