import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { State, todoFeatureKey, _selectAllTodos } from './todo.reducer';

const selectTodoState = createFeatureSelector<State>(todoFeatureKey);

const selectSelectedTodoId = createSelector(
  selectTodoState,
  (state: State) => state.selectedTodoId
);

export const selectCreationModeActive = createSelector(
  selectTodoState,
  (state: State) => state.createTodoMode
);

export const selectUserId = createSelector(
  selectTodoState,
  (state: State) => state.userId
);

export const selectTodos = createSelector(selectTodoState, _selectAllTodos);

export const selectSelectedTodo = createSelector(
  selectSelectedTodoId,
  selectTodos,
  getSelectedTodo
);

function getSelectedTodo(id: number | null, todos: Todo[]): Todo | null {
  return todos.find((todo) => todo.id === id) || null;
}
