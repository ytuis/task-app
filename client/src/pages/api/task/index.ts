import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      const tasks = await prisma.task.findMany()
      res.status(200).json(tasks);
      break;
    case "POST":
      const { data } = JSON.parse(req.body);

      let newTask
      if (data.comments) {
        const comments = data.comments
        delete data.comments
        newTask = await prisma.task.create({
          data: {
            ...data,
            comments: {
              createMany: {
                data: comments
              }
            }
          }
        });
      } else {
        newTask = await prisma.task.create({
          data: {
            ...data,
          }
        });
      }
      res.status(200).json(newTask);
      break;
    default:
      res.status(404).end();
      break;
  }
}
