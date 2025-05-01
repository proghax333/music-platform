import { createHttpError } from "../../lib/http.js";
import { resolver } from "../../lib/graphql.js";

export class TaskResolver {
  /** @type {import("mongoose").Model} */
  Task;

  constructor() {}

  static get deps() {
    return ["Task"];
  }

  createTask = resolver(async (parent, args, context, info) => {
    const { input } = args;

    if (!input.title || !input.movie || !input.difficulty) {
      return {
        code: 400,
        success: false,
        message: "Missing required fields.",
        errors: ["title, movie, and difficulty are required."],
        task: null,
      };
    }

    const task = await this.Task.create(input);

    return {
      code: 200,
      success: true,
      message: "Task created successfully.",
      errors: [],
      task,
    };
  });

  updateTask = resolver(async (parent, args, context, info) => {
    const { id, input } = args;

    const task = await this.Task.findByIdAndUpdate(id, input, { new: true });

    if (!task) {
      throw createHttpError(404, "Task not found");
    }

    return {
      code: 200,
      success: true,
      message: "Task updated successfully.",
      errors: [],
      task,
    };
  });

  deleteTask = resolver(async (parent, args, context, info) => {
    const { id } = args;

    const task = await this.Task.findByIdAndDelete(id);

    if (!task) {
      throw createHttpError(404, "Task not found");
    }

    return {
      code: 200,
      success: true,
      message: "Task deleted successfully.",
      errors: [],
    };
  });

  tasks = async (parent, args, context, info) => {
    const tasks = await this.Task.find();
    return tasks;
  };

  task = async (parent, args, context, info) => {
    const { id } = args;

    const task = await this.Task.findById(id);

    if (!task) {
      throw createHttpError(404, "Task not found");
    }

    return task;
  };

  Task_status = async (parent, args, context) => {
    return "Incomplete";
  };

  getResolvers = () => {
    return {
      Query: {
        tasks: this.tasks,
        task: this.task,
      },

      Mutation: {
        createTask: this.createTask,
        updateTask: this.updateTask,
        deleteTask: this.deleteTask,
      },

      Task: {
        status: this.Task_status,
      },
    };
  };
}
