import { TestBed } from '@angular/core/testing';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AllFoundTodos, Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';
import { fromTodoActions } from '../state';

import { TodoEffects } from './todo.effects';

const fakeTodo: Todo = {
  completed: false,
  id: 1234,
  todo: 'Take car to mainteinance',
  userId: 4321,
};
const fakeAllFoundTodos: AllFoundTodos = {
  limit: 30,
  skip: 0,
  total: 100,
  todos: [fakeTodo],
};

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
          useValue: { findAll: () => of(fakeAllFoundTodos) },
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
});
