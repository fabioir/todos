import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { AllFoundTodos, Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';
import { fromTodoActions } from '../state';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => this.todosService.findAll()),
      map((allFoundTodos: AllFoundTodos) =>
        fromTodoActions.loadTodos({ todos: allFoundTodos.todos })
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.updateTodo.type),
      switchMap((action: Action & { todo: Todo }) =>
        this.todosService.update(action.todo)
      ),
      map((todo: Todo) =>
        fromTodoActions.persistUpdatedTodo({
          todo: { id: todo.id, changes: todo },
        })
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.deleteTodo.type),
      switchMap((action: Action & { id: number }) =>
        this.todosService.delete(action.id)
      ),
      map((deletedTodo: Todo) =>
        fromTodoActions.persistDeletedTodo({
          id: deletedTodo.id,
        })
      )
    )
  );
}
