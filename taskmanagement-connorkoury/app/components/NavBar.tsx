"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-gray-800">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Lumaa App
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {status === "authenticated" && (
            <Link
              href="/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Dashboard
            </Link>
          )}
        </div>
        <div>
          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" 
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}