import { auth } from "@/edgedb";

export default async function Home() {
  // const session = await auth();
  // // console.log(session);
  const session =  auth.getSession();
  const signedIn = await session.isSignedIn();
  // console.log(signedIn);
  return (
    <>
      {/* <main className=""> */}
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        {/* <a href="/workspace">Workspace</a> */}
        {/* <div className="max-w-7xl w-full">
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div> */}
        {/* <div className="h-screen flex items-center">

        <Button hueValue={0}>Generate Site</Button>
        </div> */}
  
      </main>
    </>
  );
}
