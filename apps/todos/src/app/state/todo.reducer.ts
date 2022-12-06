import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as fromTodoActions from './todo.actions';

export const todoFeatureKey = 'todo';

export interface State extends EntityState<Todo> {
  selectedTodoId: number | null;
  userId: number;
}

const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  selectedTodoId: null,
  userId: 5, // hardcoded until authentication is introduced
});

export const reducer = createReducer(
  initialState,
  on(fromTodoActions.addTodo, (state, action) =>
    adapter.addOne(action.todo, state)
  ),
  on(fromTodoActions.persistUpdatedTodo, (state, action) =>
    adapter.updateOne(action.todo, state)
  ),
  on(fromTodoActions.persistDeletedTodo, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(fromTodoActions.loadTodos, (state, action) =>
    adapter.setAll(action.todos, state)
  ),
  on(fromTodoActions.selectTodo, (state, action) => ({
    ...state,
    selectedTodoId: action.id,
  })),
  on(fromTodoActions.clearSelectedTodo, (state) => ({
    ...state,
    selectedTodoId: null,
  }))
);

export const { selectAll: _selectAllTodos } = adapter.getSelectors();
