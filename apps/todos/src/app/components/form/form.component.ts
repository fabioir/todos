import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
export class FormComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private selectedTodo$ = this.store.pipe(
    select(fromTodoSelectors.selectSelectedTodo)
  );

  public todoForm = new FormGroup({
    todo: new FormControl<string>('', Validators.required),
    userId: new FormControl<number>(0, Validators.required),
    id: new FormControl(),
    completed: new FormControl<boolean>(false),
  });
  public showDelete = false;

  constructor(private store: Store<fromTodoReducer.State>) {}

  ngOnInit(): void {
    this.subscriptions.add(this.subscribeToSelectedTodo());
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
    if (this.todoForm.valid) {
      this.store.dispatch(
        fromTodoActions.updateTodo({
          todo: {
            ...this.todoForm.value,
            id: this.todoForm.controls.id.value,
          } as Todo,
        })
      );
      this.todoForm.disable();
    }
  }

  private initializeForm(selectedTodo: Todo | null): void {
    if (selectedTodo) {
      this.todoForm.patchValue(selectedTodo);
      this.todoForm.disable();
    }
  }

  private canShowDelete(): boolean {
    return ![null, undefined].includes(
      this.todoForm.controls.id.value as null | undefined
    );
  }

  private subscribeToSelectedTodo(): Subscription {
    return this.selectedTodo$.subscribe((todo: Todo | null) => {
      this.initializeForm(todo);
      this.showDelete = this.canShowDelete();
    });
  }
}
