import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AllFoundTodos } from '../models/todo.model';
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
}
