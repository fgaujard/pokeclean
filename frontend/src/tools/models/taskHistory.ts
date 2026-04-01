import type { Task } from "./task";
import type { User } from "./user";

export interface TaskHistory {
  publicId: string;
  task: Task;
  user: User;
  realizedAt: string;
}
