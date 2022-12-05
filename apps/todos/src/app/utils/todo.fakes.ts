import { AllFoundTodos, Todo } from '../models/todo.model';

export function fakeTodoFactory(): Todo {
  return {
    completed: false,
    id: 1234,
    todo: 'Create a fake todo',
    userId: 4321,
  };
}

export function fakeAllFoundTodosFactory(fakeTodos: Todo[]): AllFoundTodos {
  return {
    todos: fakeTodos,
    limit: 1,
    skip: 0,
    total: 1000,
  };
}
