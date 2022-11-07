import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from 'next/navigation';
import { Header } from "./header";


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await unstable_getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin');
  }

  const { user } = session!

  return (
    <main>
      <Header user={user} />
      {children}
    </main>
  )
}
