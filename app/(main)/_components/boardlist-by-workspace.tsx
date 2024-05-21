import { FC } from "react";
import AddBoardButton from "./add-board-button";

interface BoardListByWorkspaceProps {
  currentWorkspaceId: string;
}

const BoardListByWorkspace: FC<BoardListByWorkspaceProps> = ({
  currentWorkspaceId,
}) => {
  console.log(currentWorkspaceId);
  return (
    <>
      <div>
        <AddBoardButton currentWorkspaceId={currentWorkspaceId} />
      </div>
    </>
  );
};

export default BoardListByWorkspace;
