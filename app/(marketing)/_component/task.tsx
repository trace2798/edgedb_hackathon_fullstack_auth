import { Calendar, CircleCheck, PersonStanding, Trash } from "lucide-react";
import { FC } from "react";

interface TaskProps {}

const Task: FC<TaskProps> = ({}) => {
  return (
    <>
      <div
        className="px-5 w-fill py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer"
      >
        <div className="flex  justify-between items-center">
          <div className="flex space-x-1 mr-5">
            {" "}
            {/* <DeleteTaskButton taskId={task.id as string} /> */}
            <Trash/>
            {/* <CommandMenuPriority
              id={task.id as string}
              currentPriority={task.priority as string}
            /> */}
            <CircleCheck/>
            {/* <CommandMenuStatus
              id={task.id as string}
              currentStatus={task.status as string}
            /> */}
             <CircleCheck/>
          </div>
          {/* <Link href={`tasks/${task.id}`}> */}
            <div className="line-clamp-1">{"Fix Home page"}</div>
          {/* </Link> */}
        </div>
        <div className="space-x-3 hidden lg:flex">
          <div>
            {/* <ChangeDueDate
              id={task.id as string}
              currentDueDate={task.duedate as Date | null}
            /> */}
            <Calendar/>
            {/* {task.duedate ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <h1 className="w-[60px] px-1">
                          {format(new Date(task.duedate), "MMM dd")}
                        </h1>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-fit text-sm py-1 px-2">
                        Due on: {format(new Date(task.duedate), "MMM dd, yyyy")}
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <h1 className="w-[60px] px-1"></h1>
                  )} */}
          </div>
          <div className="hidden lg:flex">
            {/* {task.updated ? (
              <HoverCard>
                <HoverCardTrigger
                  asChild
                  className={buttonVariants({
                    variant: "sidebar",
                    size: "sidebar",
                  })}
                >
                  <h1 className="w-[60px] px-1">
                    {format(parseISO(task?.updated.toString()), "MMM dd")}
                  </h1>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm py-1 px-2">
                  Updated on:{" "}
                  {format(parseISO(task?.updated.toString()), "MMM dd, yyyy")}
                </HoverCardContent>
              </HoverCard>
            ) : (
              <h1 className="w-[60px] px-1"></h1>
            )} */}
          </div>
          <div>
            {/* <ChangeAssignee
              id={task.id as string}
              members={members}
              currentAssigneeId={task.assigneeId as string}
            /> */}
            <PersonStanding/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
