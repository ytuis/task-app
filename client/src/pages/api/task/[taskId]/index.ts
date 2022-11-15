import prisma from "@/lib/prisma";
import type { Task } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Task>) {
  const { method } = req;

  switch (method) {
    case "GET":
      const task = await prisma.task.findUnique({
        where: {
          id: Number(req.query.id)
        }
      });
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).end();
      }
      break;
    case "DELETE":
      const { taskId } = req.query
      const deletedTask = await prisma.task.delete({
        where: {
          id: Number(taskId)
        },
      })
      if (deletedTask) {
        res.status(200).json(deletedTask);
      } else {
        res.status(404).end();
      }
      break;
    default:
      res.status(404).end();
      break;
  }
}
