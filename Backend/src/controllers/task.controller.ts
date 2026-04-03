import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { createTaskSchema } from "../validators/task.validator";

// export const createTask = async (req: Request, res: Response) => {

//   try {

//     const parsed = createTaskSchema.safeParse(req.body);

//     if (!parsed.success) {
//       return res.status(400).json(parsed.error);
//     }

//     const { title, description } = parsed.data;

//     const userId = (req as any).userId;

//     const task = await prisma.task.create({
//       data: {
//         title,
//         description,
//         userId
//       }
//     });

//     res.status(201).json(task);

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error"
//     });

//   }

// };

// export const getTasks = async (req: Request, res: Response) => {

//   try {

//     const userId = (req as any).userId;

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const completed = req.query.completed;
//     const search = req.query.search as string;

//     const where: any = {
//       userId
//     };

//     // filtering by completed status
//     if (completed !== undefined) {
//       where.completed = completed === "true";
//     }

//     // search by title
//     if (search) {
//       where.title = {
//         contains: search,
//         mode: "insensitive"
//       };
//     }

//     const tasks = await prisma.task.findMany({
//       where,
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: {
//         id: "desc"
//       }
//     });

//     const totalTasks = await prisma.task.count({ where });

//     res.json({
//       page,
//       limit,
//       totalTasks,
//       tasks
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error"
//     });

//   }

// };

// export const getTasks = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const search = req.query.search as string;
//     const status = req.query.status as string; // Change from 'completed' to 'status'

//     const where: any = {
//       userId
//     };

//     // Correctly handle the 'status' filter
//     if (status === "completed") {
//       where.completed = true;
//     } else if (status === "pending") {
//       where.completed = false;
//     }
//     // If status is "all" or undefined, we don't add anything to 'where', showing all tasks.

//     if (search) {
//       where.title = {
//         contains: search,
//         mode: "insensitive"
//       };
//     }

//     const tasks = await prisma.task.findMany({
//       where,
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: {
//         id: "desc"
//       }
//     });

//     const totalTasks = await prisma.task.count({ where });

//     res.json({
//       page,
//       limit,
//       totalTasks,
//       tasks
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getTasks = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;

//     // 1. Get page from query, default to 1. Force limit to 8.
//     const page = Number(req.query.page) || 1;
//     const limit = 9; 
    
//     const search = req.query.search as string;
//     const status = req.query.status as string;

//     const where: any = { userId };

//     if (status === "completed") where.completed = true;
//     if (status === "pending") where.completed = false;

//     if (search) {
//       where.title = { contains: search, mode: "insensitive" };
//     }

//     // 2. Calculate how many tasks to skip
//     // Page 1: (1-1) * 8 = 0 offset
//     // Page 2: (2-1) * 8 = 8 offset
//     const tasks = await prisma.task.findMany({
//       where,
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: { createdAt: "desc" }
//     });

//     const totalTasks = await prisma.task.count({ where });
//     const totalPages = Math.ceil(totalTasks / limit);

//     res.json({
//       page,
//       limit,
//       totalTasks,
//       totalPages, // Sending this helps the frontend disable the "Next" button
//       tasks
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// backend/src/controllers/taskController.ts

export const createTask = async (req: Request, res: Response) => {
  try {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const { title, description } = parsed.data;

    // FIX: Ensure userId is a Number if your schema expects an Int
    const userId = Number((req as any).userId); 

    const task = await prisma.task.create({
      data: {
        title,
        description: description || "", // Ensure description isn't null if not allowed
        userId,
        // createdAt will be added automatically by the @default(now()) in schema
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE_TASK_ERROR:", error); // Check your terminal for this!
    res.status(500).json({ message: "Server error" });
  }
};
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const page = Number(req.query.page) || 1;
    const limit = 9;
    const search = req.query.search as string;
    const status = req.query.status as string;

    const where: any = { userId };
    if (status === "completed") where.completed = true;
    else if (status === "pending") where.completed = false;

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    // 1. Fetch the Tasks for the current view
    const tasks = await prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: "desc" }
    });

    // 2. Fetch Global Stats for the Summary Cards
    const totalTasks = await prisma.task.count({ where: { userId } });
    const completedCount = await prisma.task.count({ where: { userId, completed: true } });
    const pendingCount = await prisma.task.count({ where: { userId, completed: false } });

    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      page,
      limit,
      totalTasks,    // Total count for current filter
      totalPages,
      tasks,
      stats: {       // New global stats object
        total: totalTasks,
        completed: completedCount,
        pending: pendingCount,
        progress: totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getTaskById = async (req: Request, res: Response) => {

  try {

    const userId = (req as any).userId;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId
      }
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const updateTask = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        description
      }
    });

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const deleteTask = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;

    const task = await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const toggleTask = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        completed: !task?.completed
      }
    });

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};