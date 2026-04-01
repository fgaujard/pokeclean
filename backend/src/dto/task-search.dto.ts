import { TaskType, TaskGrade } from "@prisma/client";
import { SearchParams } from "./search-params.dto";

export interface TaskSearchParams extends SearchParams {
  type?: TaskType;
  grade?: TaskGrade;
}

export interface CreateAskedTaskDto {
  title: string;
  content?: string;
  grade: TaskGrade;
  creatorPublicId: string;
}
