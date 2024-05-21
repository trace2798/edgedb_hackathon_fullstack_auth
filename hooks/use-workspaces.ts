import { create } from "zustand";

type WorkspacesStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useWorkspaces = create<WorkspacesStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));