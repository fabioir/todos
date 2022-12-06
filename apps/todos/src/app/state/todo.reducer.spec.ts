import { Action } from '@ngrx/store';
import {
  activateCreateTodoMode,
  clearSelectedTodo,
  deactivateCreateTodoMode,
  selectTodo,
} from './todo.actions';
import { initialState, reducer } from './todo.reducer';

describe('Todo Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Todo Selection', () => {
    it('should set selectedTodoId', () => {
      const id = 1234;
      const result = reducer(initialState, selectTodo({ id }));

      expect(result).toEqual({ ...initialState, selectedTodoId: id });
    });

    it('should set selectedTodoId', () => {
      const id = 1234;
      const result = reducer(
        { ...initialState, selectedTodoId: id },
        clearSelectedTodo()
      );

      expect(result).toEqual({ ...initialState, selectedTodoId: null });
    });
  });

  describe('Create Todo Mode', () => {
    it('should activate', () =>
      expect(reducer(initialState, activateCreateTodoMode())).toEqual({
        ...initialState,
        createTodoMode: true,
      }));

    it('should deactivate', () => {
      reducer(initialState, activateCreateTodoMode());
      expect(reducer(initialState, deactivateCreateTodoMode())).toEqual({
        ...initialState,
        createTodoMode: false,
      });
    });
  });
});
