import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromTodoReducer, fromTodoSelectors } from '../../state';

@Component({
  selector: 'todos-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  public todos$ = this.store.pipe(select(fromTodoSelectors.selectTodos));
  public selectedTodo$ = this.store.pipe(
    select(fromTodoSelectors.selectSelectedTodo)
  );

  constructor(private store: Store<fromTodoReducer.State>) {}
}
