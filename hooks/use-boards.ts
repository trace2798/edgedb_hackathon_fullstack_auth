import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import { create } from "zustand";

type BoardsStore = {
  members?: Member[];
  isOpen: boolean;
  onOpen: (members: Member[]) => void;
  onClose: () => void;
};

export const useBoards = create<BoardsStore>((set) => ({
  members: [],
  isOpen: false,
  defaultStatus: "",
  onOpen: (members: Member[]) =>
    set({ isOpen: true, members }),
  onClose: () => set({ isOpen: false }),
}));
