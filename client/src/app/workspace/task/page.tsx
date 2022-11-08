import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Suspense } from "react";
import { Skeleton } from "./skelton";
import { Task } from "./task"
import { TaskInput } from "./taskInput"

const Page = async () => {
  const session = await unstable_getServerSession(authOptions)
  const { user } = session!
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <TaskInput userId={user?.id} />
      <h1 className="text-2xl p-10">task list</h1>
      <ul className="w-96 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Suspense fallback={<Skeleton />}>
          <Task />
        </Suspense>
      </ul>
    </div>
  );
}
export default Page
