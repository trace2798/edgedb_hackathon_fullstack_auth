import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import { create } from "zustand";

type useAddCardModalStore = {
  members?: Member[];
  listId: string;
  isOpen: boolean;
  onOpen: (members: Member[], listId: string) => void;
//   onClose: (members: Member[], listId: string) => void;
onClose: () => void;
};

export const useAddCardModal = create<useAddCardModalStore>((set) => ({
  members: [],
  isOpen: false,
  listId: "",
  onOpen: (members: Member[], listId: string) =>
    set({ isOpen: true, members, listId }),
  //   onClose: () => set({ isOpen: false }),
  onClose: () => set({ isOpen: false, members: [], listId: "" }),
}));
