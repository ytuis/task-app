import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  params: {
    taskId: string
  },
  searchParams: {}
}

const Task: FC<Props> = ({ params }) => {
  const { taskId } = params;
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <Link href={"/workspace/task"}>←一覧へ</Link>
      <h1 className="text-2xl p-10">task {taskId}</h1>
    </div>
  );
}
export default Task
