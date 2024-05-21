import { auth } from "@/edgedb";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = auth.getSession();
  console.log(session);
  const signedIn = await session.isSignedIn();
  console.log(signedIn);
  return (
    <div>
      <div className="flex flex-1 justify-end space-x-2">
        {!signedIn ? (
          <>
            <Link
              href={auth.getBuiltinUIUrl()}
              className="text-sm font-semibold leading-6 text-gray-800"
            >
              <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
                Sign in
              </button>
            </Link>
            <Link
              href={auth.getBuiltinUISignUpUrl()}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <button className="bg-primary px-4 py-2 rounded-md text-white">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <Link
            href="collection"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            <button>My Collection</button>
          </Link>
        )}
      </div>
    </div>
  );
}
