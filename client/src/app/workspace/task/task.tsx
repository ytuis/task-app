"use client"

import useSWR from 'swr'

interface Task {
  id: number
  title: string
  comments?: Comment[]
}

interface Comment {
  id: number
  content: string
}

const endpoint = 'http://localhost:8000/task/'

const fetcher = (url: string): Promise<Task[]> => fetch(url).then(res => res.json());

export const Task = () => {
  const { data: tasks, mutate } = useSWR(endpoint, fetcher, {
    suspense: true,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    refreshInterval: 60000
  })

  console.log(tasks)
  console.log("hoge")

  const deleteTask = async (task_id: number) => {
    mutate(async tasks => {
      const url = `${endpoint}${task_id}`
      const params = {
        method: "DELETE",
        headers: {
          'accept': 'application/json',
        }
      }
      await fetch(url, params)

      return tasks?.filter(task => task.id !== task_id)
    }, { revalidate: false })
  }

  return (
    <>
      {
        tasks?.map(task => (
          <li key={task.id} className={`flex justify-between py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}>
            <p>{task.title}</p>
            <div className="gap-2">
              <span>{task.comments?.length}</span>
              <button onClick={() => deleteTask(task.id)} className="btn p-2">-</button>
            </div>
          </li>
        ))
      }
    </>
  )
}

