import type { Grade } from "./enums/grade";
import type { Room } from "./enums/room";
import type { TaskRecurenceUnit } from "./enums/taskRecurenceUnit";
import type { TaskType } from "./enums/taskType";
import type { User } from "./user";

export interface UnplannedTask {
  daysUntilNextExecution: number;
}

export interface PlannedTask {
  nextUser: User;
  recurence: TaskRecurenceUnit;
  recurenceInterval: number;
  executionLimitDays: number;
}

export interface AskedTask {
  askedBy: User;
}

export interface ShoppingTask {
  askedBy: User;
}

export interface Task {
  publicId: string;
  title: string;
  content?: string;
  room?: Room;
  grade: Grade;

  type: TaskType;
  unplannedTask?: UnplannedTask;
  plannedTask?: PlannedTask;
  askedTask?: AskedTask;
  shoppingTask?: ShoppingTask;
}
