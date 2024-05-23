import { auth } from "@/edgedb";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function Home() {
  // const session = await auth();
  // // console.log(session);
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  // console.log(signedIn);
  return (
    <>
      {/* <main className=""> */}
      <main className="relative pt-32 h-screen flex justify-start items-center flex-col overflow-hidden mx-auto sm:px-10 px-5  bg-gradient-to-b from-zinc-950 to-zinc-950 via-slate-900">
        <div className=" max-w-3xl text-center">
          <h1 className="text-7xl">
            Efficiently manage your tasks with{" "}
            <span className="tracking-wide bg-gradient-to-r bg-clip-text text-transparent from-indigo-500  to-indigo-300 via-indigo-600 hover:cursor-pointer animate-text">
              Productivus
            </span>
          </h1>
          <h2 className="text-2xl mt-5 text-muted-foreground">
            Productivus is my submission for EdgeDB hackathon
          </h2>
        </div>
        <div className="max-w-7xl mt-10">
          <h1>Create Tasks</h1>
          <Image
            src={
              "https://img.playbook.com/SoWuQnbj4XKAmljmxuuQagS9SdXymeyc5l6DAQ5Yb0A/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2RhMzViMGIz/LTExMjktNDgwMi1h/Zjc0LTNkYmM4ZjVm/YmM1MA"
            }
            width={2050}
            height={2050}
            alt="tasks"
            className="overflow-none"
          />
        </div>
      </main>
    </>
  );
}
