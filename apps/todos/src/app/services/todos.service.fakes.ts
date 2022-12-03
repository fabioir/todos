import { AllFoundTodos, Todo } from '../models/todo.model';

export const fakeTodo: Todo = {
  completed: false,
  id: 1234,
  todo: 'Build the code challenge preparation project',
  userId: 4321,
};

export const fakeAllFoundTodos: AllFoundTodos = {
  todos: [fakeTodo],
  limit: 1,
  skip: 0,
  total: 1000,
};
