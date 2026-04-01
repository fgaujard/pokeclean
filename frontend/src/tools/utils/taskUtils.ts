import { Grade, Room, TaskType } from "@models/enums";

export const getGradeColor = (grade: Grade): string => {
  switch (grade) {
    case Grade.S:
      return "#e53935";
    case Grade.A:
      return "#fb8c00";
    case Grade.B:
      return "#1e88e5";
    case Grade.C:
      return "#43a047";
    default:
      return "#666";
  }
};

export const getGradeReward = (grade: Grade): number => {
  switch (grade) {
    case Grade.S:
      return 50;
    case Grade.A:
      return 30;
    case Grade.B:
      return 20;
    case Grade.C:
      return 10;
    default:
      return 0;
  }
};

export const getTaskTypeLabel = (type: TaskType): string => {
  switch (type) {
    case TaskType.PLANNED:
      return "Planifiée";
    case TaskType.UNPLANNED:
      return "Non planifiée";
    case TaskType.ASKED:
      return "Demandée";
    case TaskType.SHOPPING:
      return "Courses";
    default:
      return "";
  }
};

export const getTaskTypeColor = (type: TaskType): string => {
  switch (type) {
    case TaskType.PLANNED:
      return "#2a75bb";
    case TaskType.UNPLANNED:
      return "#9c27b0";
    case TaskType.ASKED:
      return "#ff9800";
    case TaskType.SHOPPING:
      return "#00897b";
    default:
      return "#666";
  }
};

export const getRoomLabel = (room: Room): string => {
  switch (room) {
    case Room.ALL_HOUSE:
      return "Toute la maison";
    case Room.KITCHEN:
      return "Cuisine";
    case Room.BATHROOM:
      return "Salle de bain";
    case Room.TOILETS:
      return "Toilettes";
    case Room.CORRIDOR:
      return "Couloir";
    case Room.BALCONY:
      return "Balcon";
    default:
      return "";
  }
};
