"use client";

import { useEffect, useState } from "react";
import { IssueModal } from "../modals/issue-modal";
import { WorkspaceModal } from "../modals/workspaces-modal";
import {AddBoardModal} from "../modals/add-board-modal";
import { CardModal } from "../modals/card-modal";
import { AddCardModal } from "../modals/add-card-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <WorkspaceModal />
      <IssueModal />
      <AddBoardModal/>
      <CardModal/>
      <AddCardModal/>
    </>
  );
};
