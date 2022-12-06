import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
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
  public selectedTodo$ = this.store.pipe(
    select(fromTodoSelectors.selectSelectedTodo)
  );

  constructor(private store: Store<fromTodoReducer.State>) {}

  close(): void {
    this.store.dispatch(fromTodoActions.clearSelectedTodo());
  }
}
