import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AskedTask, Task, TaskHistory } from "@prisma/client";

import { Page, TaskSearchParams, CreateAskedTaskDto } from "@dto";

import { TaskService } from "./task.service";

@ApiTags("Tasks")
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Tasks endpoints

  @Get("tasks/search")
  async search(@Query() params: TaskSearchParams): Promise<Page<Task>> {
    return this.taskService.search(params);
  }

  @Post("tasks/ask")
  async postAskedTask(@Body() dto: CreateAskedTaskDto): Promise<AskedTask> {
    return this.taskService.createAskedTask(dto);
  }

  // Tasks history endpoints

  @Get("tasks/:taskId/history")
  async getTaskHistory(
    @Param("taskId") taskId: string,
    @Query("limit") limit: number
  ): Promise<Page<TaskHistory>> {
    return this.taskService.findTaskHistory({
      page: 1,
      limit: limit || 1000,
    });
  }

  @Post("users/:userId/tasks/:taskId/history")
  async postTaskHistory(
    @Param("userId") userId: string,
    @Param("taskId") taskId: string
  ): Promise<TaskHistory> {
    return this.taskService.createTaskHistory(taskId, userId);
  }
}
