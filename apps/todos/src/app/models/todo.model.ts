export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;

  isDeleted?: boolean;
  deletedOn?: string;
}

export interface AllFoundTodos {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export type DraftTodo = Pick<Todo, 'todo' | 'userId' | 'completed'>;
