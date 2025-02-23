import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookie = await cookies()
  const token = cookie.get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    redirect("/login");
  }

  // Pass session data to the client component
  return <DashboardClient session={decoded} />;
}
