import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { DraftTodo, Todo } from '../models/todo.model';

export const loadTodos = createAction(
  '[Todo/API] Load Todos',
  props<{ todos: Todo[] }>()
);

export const addTodo = createAction(
  '[Todo/API] Add Todo',
  props<{ todo: DraftTodo }>()
);

export const persistAddedTodo = createAction(
  '[Todo/API] Persist Added Todo',
  props<{ todo: Todo }>()
);

export const updateTodo = createAction(
  '[Todo/API] Update Todo',
  props<{ todo: Todo }>()
);

export const persistUpdatedTodo = createAction(
  '[Todo/API] Persist Updated Todo',
  props<{ todo: Update<Todo> }>()
);

export const deleteTodo = createAction(
  '[Todo/API] Delete Todo',
  props<{ id: number }>()
);

export const persistDeletedTodo = createAction(
  '[Todo/API] Persist Deleted Todo',
  props<{ id: number }>()
);

export const selectTodo = createAction(
  '[Todo/API] Select Todo',
  props<{ id: number }>()
);

export const clearSelectedTodo = createAction('[Todo/API] Clear Selected Todo');

export const activateCreateTodoMode = createAction(
  '[Todo/API] Activate Create Todo'
);

export const deactivateCreateTodoMode = createAction(
  '[Todo/API] Deactivate Create Todo'
);
