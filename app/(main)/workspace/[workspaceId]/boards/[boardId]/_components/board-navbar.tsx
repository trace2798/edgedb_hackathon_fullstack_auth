// import { Board } from "@prisma/client";

// import { BoardTitleForm } from "./board-title-form";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
  data: any;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  // console.log(data);
  return (
    <div className="w-full  h-14 z-[40] bg-black/30 fixed top-14 lg:top-0 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
    </div>
  );
};
