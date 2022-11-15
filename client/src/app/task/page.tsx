import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { Task } from "./task";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions)
  const { user } = session!
  return (
    <Suspense>
      <Task userId={user.id} />
    </Suspense>
  )
}
