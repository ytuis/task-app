"use client"

import { useForm } from 'react-hook-form';
import type { FC } from "react"

interface Props {
  userId: string;
}

export const TaskInput: FC<Props> = ({ userId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const url = 'http://localhost:8000/task/'
    const postData = {
      title: data.task,
      user_id: userId,
    }
    const params = {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    await fetch(url, params)
  }

  return (
    <div className="flex w-2/3 p-10 pt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">タスク</label>
          <input
            type="text"
            id="task"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('task', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
            })}
          />
          {errors.password?.type === 'required' && (
            <div>入力が必須の項目です。</div>
          )}
        </div>
        <button type="submit">タスクを作成</button>
      </form>
    </div>
  );
}
