import Link from "next/link"
import tasks from "./task.json"

const TaskList = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <h1 className="text-2xl p-10">task list</h1>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {tasks.map(task => (
          <Link href={`/workspace/task/${task.id}`} key={task.id}>
            <li className={`block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}>
              {task.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
export default TaskList
