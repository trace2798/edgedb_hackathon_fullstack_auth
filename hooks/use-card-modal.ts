import { Card } from "@/types";
import { create } from "zustand";

type CardModalStore = {
  id?: string;
  data?: Card,
  isOpen: boolean;
  onOpen: (id: string, data: Card) => void;
  onClose: () => void;
};

export  const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  data: undefined,
  isOpen: false,
  onOpen: (id: string, data: Card) => set({ isOpen: true, id, data }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));