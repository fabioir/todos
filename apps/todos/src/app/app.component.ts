import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { fromTodoReducer, fromTodoSelectors } from './state';

@Component({
  selector: 'todos-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public openForm$: Observable<boolean> = combineLatest({
    todoSelected: this.store.pipe(select(fromTodoSelectors.selectSelectedTodo)),
    creationMode: this.store.pipe(
      select(fromTodoSelectors.selectCreationModeActive)
    ),
  }).pipe(
    map(({ todoSelected, creationMode }) => !!todoSelected || creationMode)
  );

  constructor(private store: Store<fromTodoReducer.State>) {}
}
