export const TaskType = {
  UNPLANNED: "UNPLANNED",
  PLANNED: "PLANNED",
  ASKED: "ASKED",
  SHOPPING: "SHOPPING",
};

export type TaskType = (typeof TaskType)[keyof typeof TaskType];
