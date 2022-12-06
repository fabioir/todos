import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import {
  fromTodoActions,
  fromTodoReducer,
  fromTodoSelectors,
} from '../../state';

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

  updateTodo(updatedTodo: Todo): void {
    this.store.dispatch(
      fromTodoActions.updateTodo({
        todo: updatedTodo,
      })
    );
  }

  selectTodo(selectedTodo: Todo): void {
    this.store.dispatch(
      fromTodoActions.selectTodo({
        id: selectedTodo.id,
      })
    );
  }
}
