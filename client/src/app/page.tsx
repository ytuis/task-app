import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Link from "next/link"

export default async function Page() {
  const session = await unstable_getServerSession(authOptions)

  return (
    <div className="flex flex-col justify-center items-center m-auto">
      <h1 className="text-2xl underline">Auth sample</h1>

      {session ? (
        <Link href={"/workspace/"}>Workspaceへ</Link>
      ) : (
        <Link href={"/api/auth/signin"}>Sign in ページへ</Link>
      )}

    </div>
  )
}
