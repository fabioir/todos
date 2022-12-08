import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { fromTodoReducer, fromTodoSelectors } from './state';

@Component({
  selector: 'todos-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('formSection', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, transform: 'translateY(30%)' })),
      ]),
    ]),
  ],
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
