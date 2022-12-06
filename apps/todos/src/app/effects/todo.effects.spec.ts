import { TestBed } from '@angular/core/testing';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AllFoundTodos, Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';
import { fromTodoActions } from '../state';
import { fakeAllFoundTodosFactory, fakeTodoFactory } from '../utils/todo.fakes';

import { TodoEffects } from './todo.effects';

const fakeTodo: Todo = fakeTodoFactory();
const fakeAllFoundTodos: AllFoundTodos = fakeAllFoundTodosFactory([fakeTodo]);

describe('TodoEffects', () => {
  let actions$ = new Observable<Action<unknown>>();
  let effects: TodoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        {
          provide: TodosService,
          useValue: {
            findAll: () => of(fakeAllFoundTodos),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('init', () => {
    it('should load todos', (done) => {
      actions$ = of({ type: ROOT_EFFECTS_INIT } as unknown as Action<unknown>);

      effects.init$.subscribe((action) => {
        expect(action).toEqual(
          fromTodoActions.loadTodos({ todos: fakeAllFoundTodos.todos })
        );
        done();
      });
    });
  });

  describe('updateTodo', () => {
    it('should update todo and dispatch persist action', (done) => {
      const todosService = TestBed.inject(TodosService);
      const updatedFakeTodo: Todo = { ...fakeTodo, todo: 'Updated TODO' };
      (todosService.update as unknown as jest.SpyInstance).mockReturnValueOnce(
        of(updatedFakeTodo)
      );

      actions$ = of({
        type: fromTodoActions.updateTodo.type,
        todo: updatedFakeTodo,
      } as unknown as Action<unknown>);

      effects.updateTodo$.subscribe((action) => {
        expect(action).toEqual(
          fromTodoActions.persistUpdatedTodo({
            todo: { id: fakeTodo.id, changes: updatedFakeTodo },
          })
        );
        expect(todosService.update).toHaveBeenCalledWith(updatedFakeTodo);
        (todosService.update as unknown as jest.SpyInstance).mockRestore();
        done();
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo and dispatch persist action', (done) => {
      const todosService = TestBed.inject(TodosService);
      (todosService.delete as unknown as jest.SpyInstance).mockReturnValueOnce(
        of(fakeTodo)
      );

      actions$ = of({
        type: fromTodoActions.deleteTodo.type,
        id: fakeTodo.id,
      } as unknown as Action<unknown>);

      effects.deleteTodo$.subscribe((action) => {
        expect(action).toEqual(
          fromTodoActions.persistDeletedTodo({
            id: fakeTodo.id,
          })
        );
        expect(todosService.delete).toHaveBeenCalledWith(fakeTodo.id);
        (todosService.delete as unknown as jest.SpyInstance).mockRestore();
        done();
      });
    });
  });
});
