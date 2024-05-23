import Footer from "@/components/footer";
import { Heading } from "@/components/heading";
import Image from "next/image";
import Task from "./_component/task";

export default async function Home() {
  return (
    <>
      <main className="relative pt-32  flex justify-start items-center flex-col overflow-hidden mx-auto sm:px-10 px-5  bg-gradient-to-b from-zinc-950 to-zinc-950 via-slate-900">
        <div className=" max-w-3xl text-center">
          <h1 className="max-md:text-4xl md:text-6xl lg:text-7xl text-neutral-200">
            Efficiently manage your tasks with{" "}
            <span className="tracking-wide bg-gradient-to-r bg-clip-text text-transparent from-indigo-500  to-indigo-300 via-indigo-600 hover:cursor-pointer animate-text">
              Productivus
            </span>
          </h1>
          <h2 className="max-md:text-lg lg:text-2xl mt-5 text-muted-foreground">
            Productivus is my submission for{" "}
            <a
              href="https://www.edgedb.com/"
              target="_blank"
              className="hover:underline hover:text-indigo-500"
            >
              EdgeDB
            </a>
            <a
              href="https://hackathon.edgedb.com/"
              className="hover:underline hover:text-indigo-500"
            >
              &nbsp;hackathon
            </a>
          </h2>
        </div>
        <div className=" bg-white my-10 ">
        <img width="auto" height="auto" src="/home.png" alt="database diagram" className="hidden lg:block" />
          {/* <Task/> */}
          <Image
            src={
              "https://img.playbook.com/gNLnzGzI3tAOqAgapBR4RrpoUSEGCvElo3CgE36VKg4/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzMxZmU5OTRh/LTQ5NTYtNGRhYS1h/NTFjLThmYjUzYTRh/ZmI5OQ"
            }
            width={500}
            height={500}
            alt="tasks"
            className="overflow-none object-cover lg:hidden"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  my-10">
          <div className="flex flex-col  border border-zinc-800 p-5">
            <div className="flex  ">
              <h1 className="text-2xl font-satoshiBold text-neutral-200">
                What is Productivus?
              </h1>
            </div>
            <div className="max-w-sm flex justify-center text-justify text-muted-foreground items-center  mt-3">
              <h1 className="text-xl">
                Productivus is an web application which can be use to keep{" "}
                <span className="text-indigo-300">track of your tasks</span>{" "}
              </h1>
            </div>
          </div>
          <div className="flex flex-col  border border-zinc-800 p-5">
            <div className="flex">
              <h1 className="text-2xl font-satoshiBold text-neutral-200">
                How does it work?
              </h1>
            </div>
            <div className="max-w-sm flex justify-center text-justify text-muted-foreground items-center  mt-3">
              <h1 className="text-xl">
                Once you login you will have the option to create a
                <span className="text-indigo-300">&nbsp;workspace</span>. Once
                the workspace is created. You can add members, create tasks
                and boards.
              </h1>
            </div>
          </div>
          <div className="flex flex-col border border-zinc-800 p-5">
            <div className="flex">
              <h1 className="text-2xl font-satoshiBold text-neutral-200">
                What is a Workspace?
              </h1>
            </div>
            <div className="max-w-sm flex justify-center text-justify text-muted-foreground items-center  mt-3">
              <h1 className="text-xl">
                Workspace is a
                <span className="text-indigo-300">&nbsp;collaborative</span>{" "}
                space where members can manage their tasks and boards.
              </h1>
            </div>
          </div>
          <div className="flex flex-col p-5 border border-zinc-800">
            <div className="flex">
              <h1 className="text-2xl font-satoshiBold text-neutral-200">
                What is it made with?
              </h1>
            </div>
            <div className="max-w-sm flex justify-center text-justify text-muted-foreground items-center mt-3">
              <h1 className="text-xl">
                Made using Next.js, EdgeDB for both database and auth,
                uploadthing for image upload, tailwind css and shadcn/ui
                {/* <span className="text-indigo-300">
                  track of your tasks
                </span>{" "} */}
              </h1>
            </div>
          </div>
          <div className="flex flex-col p-5 border border-zinc-800">
            <div className="flex">
              <h1 className="text-2xl font-satoshiBold text-neutral-200">
                What is a task?
              </h1>
            </div>
            <div className="max-w-sm flex justify-center text-justify text-muted-foreground items-center mt-3">
              <h1 className="text-xl">
                Task is a fundamental units of work, serving a specific
                purpose towards achieving a larger goal.
                {/* <span className="text-indigo-300">
                  track of your tasks
                </span>{" "} */}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-3xl font-satoshiBold text-neutral-200">
            Database Diagram
          </h2>
          <p className="text-sm font-ranadeLight text-muted-foreground">
            This is an AI generated diagram
          </p>
        </div>
        <div className="max-w-4xl my-10">
          <img width="auto" height="auto" src="/diagram.svg" alt="database diagram" />
        </div>
      </main>
    </>
  );
}
