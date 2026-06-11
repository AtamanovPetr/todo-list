export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  completedDate?: string | null;
}
export type FilterType = "all" | "active" | "completed";
