import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  fromTodoActions,
  fromTodoReducer,
  fromTodoSelectors,
} from '../../state';

@Component({
  selector: 'todos-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  public creationModeActivated$ = this.store.pipe(
    select(fromTodoSelectors.selectCreationModeActive)
  );

  constructor(private store: Store<fromTodoReducer.State>) {}

  create(): void {
    this.store.dispatch(fromTodoActions.activateCreateTodoMode());
  }
}
