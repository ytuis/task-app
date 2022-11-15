"use client"

import type { Comment as IComment, Task as ITask } from "@prisma/client";
import axios from 'axios';
import { ComponentPropsWithoutRef, FC, forwardRef } from "react";
import { Control, FieldErrorsImpl, useFieldArray, useForm, UseFormRegister } from "react-hook-form";
import useSWR from 'swr';


const url = 'http://localhost:3000/api/task/'

interface TaskWithComment extends ITask {
  comments: IComment[]
}

const fetcher = (url: string): Promise<TaskWithComment[]> => fetch(url).then(res => res.json());

interface Props {
  userId: string;
}

interface IForm {
  title: string;
  description: string;
  comments: {
    content: string;
  }[]
}

export const Task: FC<Props> = ({ userId }) => {
  const { data: tasks, mutate } = useSWR(url, fetcher, {
    suspense: true,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    refreshInterval: 0
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      comments: [{
        content: "1"
      }]
    }
  });

  const onSubmit = async ({ title, description, comments }: IForm) => {
    let data: any = {
      title: title,
      createrId: userId
    }
    if (description) {
      data = { ...data, content: description }
    }
    if (comments) {
      data = { ...data, comments: comments.map(c => ({ ...c, createrId: userId })) }
    }

    console.log(data);


    const newTask = await axios.post(url, { data: data })
    console.log(newTask)
  }

  const deleteTask = async (task_id: number) => {
    mutate(async tasks => {
      await axios.delete(`${url}${task_id}`)

      return tasks?.filter(task => task.id !== task_id)
    }, { revalidate: false })
  }

  return (
    <div className="flex flex-col justify-center items-center m-auto">

      <nav id="header" className="bg-white fixed w-full z-10 top-0 shadow">

        <div className="w-full container mx-auto flex flex-wrap items-center justify-between my-4">

          <div className="pl-4 md:pl-0">
            <a className="flex items-center text-yellow-600 text-base xl:text-xl no-underline hover:no-underline font-extrabold font-sans" href="#">
              <svg className="fill-current h-6 inline-block text-yellow-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16 2h4v15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V0h16v2zm0 2v13a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4h-2zM2 2v15a1 1 0 0 0 1 1h11.17a2.98 2.98 0 0 1-.17-1V2H2zm2 8h8v2H4v-2zm0 4h8v2H4v-2zM4 4h8v4H4V4z" />
              </svg> Task Create
            </a>
          </div>

        </div>
      </nav>
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
          <div className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" style={{ top: "6em" }} id="menu-content">
            <ul className="list-reset py-2 md:py-0">
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-yellow-600">
                <a href='#section1' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                  <span className="pb-1 md:pb-0 text-sm">Section 1</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a href='#section2' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                  <span className="pb-1 md:pb-0 text-sm">Section 2</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a href='#section3' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                  <span className="pb-1 md:pb-0 text-sm">Section 3</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a href='#section4' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                  <span className="pb-1 md:pb-0 text-sm">Section 4</span>
                </a>
              </li>

              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a href='#section5' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                  <span className="pb-1 md:pb-0 text-sm">Section 5</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section className="w-full lg:w-4/5">

          <form onSubmit={handleSubmit(onSubmit)}>

            <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">タスク詳細</h2>

            <div id='section3' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="title">
                    Title
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="form-input block w-full border border-gray-200 focus:bg-white"
                    id="title"
                    type="text"
                    {...register('title', {
                      required: {
                        value: true,
                        message: '入力が必須の項目です。',
                      },
                      maxLength: {
                        value: 191,
                        message: "Too Long"
                      }
                    })} />
                  {errors.title?.type === 'required' && (
                    <div>入力が必須の項目です。</div>
                  )}
                  {errors.title?.type === 'maxLength' && (
                    <div>{errors.title?.message}</div>
                  )}
                </div>
              </div>

              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="description">
                    Description
                  </label>
                </div>
                <div className="md:w-2/3">
                  <textarea
                    className="form-textarea block w-full border border-gray-200 focus:bg-white"
                    id="description"
                    rows={8}
                    {...register('description')}
                  >
                  </textarea>
                </div>
              </div>
            </div>

            <hr className="bg-gray-300 my-12" />

            <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">コメント</h2>

            <div id='section4' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">

              <Comments control={control} register={register} errors={errors} />
            </div>

            <div className="pt-8">

              <button className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4" type="submit">
                Save
              </button>

            </div>

          </form>

          <div className="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success alert!</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type CommentsProps = {
  control: Control<IForm, object>;
  register: UseFormRegister<IForm>;
  errors: Partial<FieldErrorsImpl<{
    title: string;
    description: string;
    comments: {
      content: string;
    }[];
  }>>
};

const Comments: React.FC<CommentsProps> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'comments',
    keyName: "key"
  });

  return (
    <div className="mb-4">
      {fields.map((field, index) => (
        <div key={field.key} className="mb-4">
          <Textarea
            label={`テキスト：${index + 1}`}
            id={`comments.${index}.content`}
            {...register(`comments.${index}.content`, {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
            })} />
          {errors?.["comments"]?.[index]?.["content"]?.type === "required" && (
            <p className="py-2 text-sm text-red-600 text-end">入力が必須の項目です。</p>
          )}
          <button type="button" className="m-2" onClick={() => remove(index)} >
            del
          </button>
        </div>
      ))}
      <div className="flex justify-end p-2">
        <button type="button" className="m-2" onClick={() => append({ content: "" })}>
          + 行を追加
        </button>
      </div>
    </div>
  );
};

export type TextareaProps = {
  label: string;
  id: string;
  placeholder?: string;
} & ComponentPropsWithoutRef<'textarea'>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, id, placeholder, ...props }, ref) => {
  return (
    <div className="md:flex mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <textarea
          className="form-textarea block w-full border border-gray-200 focus:bg-white"
          id={id}
          rows={4}
          placeholder={placeholder}
          {...props}
          ref={ref}
        >
        </textarea>
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';