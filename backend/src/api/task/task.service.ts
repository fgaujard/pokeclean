import { Injectable } from "@nestjs/common";

import { AskedTask, Task, TaskHistory, TaskType } from "@prisma/client";

import { EntityService } from "@api/prisma/prisma.service";
import { UserService } from "@api/user/user.service";

import { Page, TaskSearchParams, CreateAskedTaskDto } from "@dto";

@Injectable()
export class TaskService extends EntityService<Task> {
  protected readonly model = this.prisma.task;
  protected readonly userService = new UserService(this.prisma);

  // Tasks methods

  async search(params: TaskSearchParams): Promise<Page<Task>> {
    const { type, grade, ...baseParams } = params;

    // Préparer les filtres personnalisés
    const filters = baseParams.filters || {};

    // Note: type et grade ne sont pas des tableaux, donc on les gère différemment
    // On doit surcharger la méthode pour ces cas spécifiques
    const where: any = {};

    if (baseParams.search) {
      where.OR = [
        {
          title: {
            contains: baseParams.search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: baseParams.search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (grade) {
      where.grade = grade;
    }

    // Appliquer les filtres additionnels du baseParams
    if (baseParams.filters) {
      for (const [key, filter] of Object.entries(baseParams.filters)) {
        if (Array.isArray(filter.values) && filter.values.length > 0) {
          if (filter.mustAllMatch) {
            where[key] = { hasEvery: filter.values };
          } else {
            where[key] = { hasSome: filter.values };
          }
        }
      }
    }

    const page = baseParams.page || 1;
    const limit = baseParams.limit || 1000;

    // Convertir en nombres si ce sont des strings (query params)
    const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : limit;
    const skip = (pageNum - 1) * limitNum;

    const [total, data] = await this.prisma.$transaction([
      this.model.count({ where }),
      this.model.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [baseParams.sortBy || "id"]: baseParams.sortOrder || "desc",
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      items: data,
      meta: {
        totalItems: total,
        currentPage: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
      },
    };
  }

  async createAskedTask(dto: CreateAskedTaskDto): Promise<AskedTask> {
    const { title, content, grade, creatorPublicId } = dto;

    const user = await this.userService.findOne(creatorPublicId);

    if (!user) {
      throw new Error("User not found");
    }

    const task = await this.model.create({
      data: {
        title,
        content,
        grade,
        type: TaskType.ASKED,
        askedTask: {
          create: {
            creatorId: user.id,
          },
        },
      },
      include: {
        askedTask: true,
      },
    });

    if (!task.askedTask) {
      throw new Error("Failed to create asked task");
    }

    return task.askedTask;
  }

  // Tasks history methods

  async findTaskHistory(params: TaskSearchParams): Promise<Page<TaskHistory>> {
    const { type, grade, ...baseParams } = params;

    const page = baseParams.page || 1;
    const limit = baseParams.limit || 1000;

    // Convertir en nombres si ce sont des strings (query params)
    const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : limit;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (baseParams.search) {
      where.task = {
        OR: [
          {
            title: {
              contains: baseParams.search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: baseParams.search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (type) {
      where.task = {
        ...where.task,
        type,
      };
    }

    if (grade) {
      where.task = {
        ...where.task,
        grade,
      };
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.taskHistory.count({ where }),
      this.prisma.taskHistory.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { realizedAt: "desc" },
        include: {
          task: true,
          user: {
            select: {
              publicId: true,
              username: true,
              avatar: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      items: data,
      meta: {
        totalItems: total,
        currentPage: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
      },
    };
  }

  async createTaskHistory(
    taskId: string,
    userId: string
  ): Promise<TaskHistory> {
    const task = await this.model.findUnique({
      where: { publicId: taskId },
    });

    const user = await this.userService.findOne(userId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (!user) {
      throw new Error("User not found");
    }

    return await this.prisma.taskHistory.create({
      data: {
        taskId: task.id,
        userId: user.id,
      },
    });
  }
}
