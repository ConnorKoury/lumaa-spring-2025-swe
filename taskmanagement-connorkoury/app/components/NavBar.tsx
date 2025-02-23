"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Session = {
  userId: number;
  username: string;
  exp: number;
};

export default function NavBar() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("api/auth/session");
        const data = await res.json();
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }
    fetchSession();
  }, []);

  async function handleSignOut() {
    await fetch("api/auth/signout", { method: "POST" });
    router.refresh();
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-gray-800">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Lumaa App
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {session && (
            <Link
              href="/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Dashboard
            </Link>
          )}
        </div>
        <div>
          {session ? (
            <button
              onClick={handleSignOut}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
