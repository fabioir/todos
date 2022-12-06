import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Todo } from '../../models/todo.model';
import {
  fromTodoActions,
  fromTodoReducer,
  fromTodoSelectors,
} from '../../state';

@Component({
  selector: 'todos-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public selectedTodo$ = this.store
    .pipe(select(fromTodoSelectors.selectSelectedTodo))
    .pipe(tap(this.initializeForm.bind(this)));

  public todoForm = new FormGroup({
    todo: new FormControl<string>(''),
    userId: new FormControl<number>(0),
    id: new FormControl<number>(0),
    completed: new FormControl<boolean>(false),
  });

  constructor(private store: Store<fromTodoReducer.State>) {}

  close(): void {
    this.store.dispatch(fromTodoActions.clearSelectedTodo());
  }

  private initializeForm(selectedTodo: Todo | null): void {
    if (selectedTodo) {
      this.todoForm.patchValue(selectedTodo);
      this.todoForm.disable();
    }
  }
}
