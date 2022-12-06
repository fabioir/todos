import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromTodoReducer, fromTodoSelectors } from './state';

@Component({
  selector: 'todos-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public selectedTodo$ = this.store.pipe(
    select(fromTodoSelectors.selectSelectedTodo)
  );

  constructor(private store: Store<fromTodoReducer.State>) {}
}
