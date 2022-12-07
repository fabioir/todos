import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DraftTodo, Todo } from '../../models/todo.model';
import {
  fromTodoActions,
  fromTodoReducer,
  fromTodoSelectors,
} from '../../state';

@Component({
  selector: 'todos-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private selectedTodo$ = this.store.pipe(
    select(fromTodoSelectors.selectSelectedTodo)
  );
  private selectCreationModeActive$ = this.store.pipe(
    select(fromTodoSelectors.selectCreationModeActive)
  );

  public todoForm = new FormGroup({
    todo: new FormControl<string>('', Validators.required),
    userId: new FormControl<number>(1, [
      Validators.required,
      Validators.min(1),
    ]),
    id: new FormControl(),
    completed: new FormControl<boolean>(false),
  });
  public showDelete = false;
  public creationMode = false;

  constructor(private store: Store<fromTodoReducer.State>) {}

  ngOnInit(): void {
    this.subscriptions.add(this.subscribeToSelectedTodo());
    this.subscriptions.add(this.subscribeToSelectCreationModeActive());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  delete(): void {
    this.store.dispatch(
      fromTodoActions.deleteTodo({
        id: this.todoForm.controls.id.value as number,
      })
    );
  }

  close(): void {
    this.store.dispatch(fromTodoActions.clearSelectedTodo());
    this.store.dispatch(fromTodoActions.deactivateCreateTodoMode());
  }

  edit(): void {
    this.todoForm.enable();
    this.todoForm.controls.id.disable();
  }

  save(): void {
    this.todoForm.updateValueAndValidity();
    this.todoForm.markAsDirty();
    if (this.todoForm.valid) {
      this.creationMode ? this.dispatchCreate() : this.dispatchUpdate();
      this.todoForm.disable();
    }
  }

  private dispatchUpdate(): void {
    this.store.dispatch(
      fromTodoActions.updateTodo({
        todo: {
          ...this.todoForm.value,
          id: this.todoForm.controls.id.value,
        } as Todo,
      })
    );
  }

  private dispatchCreate(): void {
    this.store.dispatch(
      fromTodoActions.addTodo({
        todo: {
          ...this.todoForm.value,
          id: undefined,
        } as DraftTodo,
      })
    );
    this.close();
  }

  private initializeForm(selectedTodo: Todo | null): void {
    if (selectedTodo) {
      this.todoForm.patchValue(selectedTodo);
      this.todoForm.disable();
    } else {
      this.todoForm.patchValue({
        todo: '',
        id: null,
        userId: 0,
        completed: false,
      });
      this.todoForm.enable();
    }
  }

  private subscribeToSelectedTodo(): Subscription {
    return this.selectedTodo$.subscribe((todo: Todo | null) => {
      this.initializeForm(todo);
      this.showDelete = !!todo;
    });
  }

  private subscribeToSelectCreationModeActive(): Subscription {
    return this.selectCreationModeActive$.subscribe(
      (creationModeActive: boolean) => (this.creationMode = creationModeActive)
    );
  }
}
