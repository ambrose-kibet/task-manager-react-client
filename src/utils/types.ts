export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: "ADMIN" | "USER";
};

export type TaskSummary = {
  id: number;
  title: string;
};

export type TasksByDate = {
  date: Date;
  tasks: TaskSummary[];
};
export type TaskPerDay = {
  id: number;
  title: string;
  isCompleted: Date | null;
  createdAt: Date;
};
