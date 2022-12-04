import { Action } from '@ngrx/store';
import { clearSelectedTodo, selectTodo } from './todo.actions';
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
});
