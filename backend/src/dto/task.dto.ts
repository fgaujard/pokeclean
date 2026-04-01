import { Task } from "@prisma/client";

export interface TaskDTO extends Task {
  nextUsersId?: string[];
}
