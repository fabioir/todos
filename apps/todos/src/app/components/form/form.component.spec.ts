import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DraftTodo } from '../../models/todo.model';
import { fromTodoActions, fromTodoSelectors } from '../../state';
import { fakeTodoFactory } from '../../utils/todo.fakes';
import { ButtonComponent } from '../button/button.component';
import { FormFieldsComponent } from '../form-fields/form-fields.component';

import { FormComponent } from './form.component';

const fakeTodo = fakeTodoFactory();

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let selectSelectedTodoSpy: MemoizedSelector<unknown, unknown>;
  let selectCreationModeActiveSpy: MemoizedSelector<unknown, unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, ButtonComponent, FormFieldsComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore;
    selectSelectedTodoSpy = mockStore.overrideSelector(
      fromTodoSelectors.selectSelectedTodo,
      fakeTodo
    ) as unknown as MemoizedSelector<unknown, unknown>;
    selectCreationModeActiveSpy = mockStore.overrideSelector(
      fromTodoSelectors.selectCreationModeActive,
      false
    ) as unknown as MemoizedSelector<unknown, unknown>;

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => (dispatchSpy = jest.spyOn(mockStore, 'dispatch')));

  afterEach(() => dispatchSpy.mockRestore());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Display', () => {
    it('should display todo properties', () => {
      const userId = fixture.debugElement.query(By.css('#user-id'));
      const id = fixture.debugElement.query(By.css('#todo-id'));
      const completed = fixture.debugElement.query(By.css('#completed'));
      const content = fixture.debugElement.query(By.css('#todo'));

      expect(userId.nativeElement.value).toBe(fakeTodo.userId + '');
      expect(id.nativeElement.value).toBe(fakeTodo.id + '');
      expect(completed.nativeElement.checked).toBe(fakeTodo.completed);
      expect(content.nativeElement.value).toBe(fakeTodo.todo);
    });

    it('should have inputs disabled', () => {
      const userId = fixture.debugElement.query(By.css('#user-id'));
      const id = fixture.debugElement.query(By.css('#todo-id'));
      const completed = fixture.debugElement.query(By.css('#completed'));
      const content = fixture.debugElement.query(By.css('#todo'));

      expect(userId.nativeElement.disabled).toBe(true);
      expect(id.nativeElement.disabled).toBe(true);
      expect(completed.nativeElement.disabled).toBe(true);
      expect(content.nativeElement.disabled).toBe(true);
    });

    it('should display details title', () => {
      const title = fixture.debugElement.query(By.css('.title'));
      expect(title.nativeElement.textContent.trim()).toBe('Details');
    });

    it('should display create title', () => {
      selectCreationModeActiveSpy.setResult(true);
      mockStore.refreshState();
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.title'));
      expect(title.nativeElement.textContent.trim()).toBe('Create');
    });
  });

  describe('Create and Edit', () => {
    it('should enable all but id fields', () => {
      const submitButton = fixture.debugElement.query(
        By.css('#submitButton > button')
      );
      submitButton.nativeElement.click();

      const userId = fixture.debugElement.query(By.css('#user-id'));
      const id = fixture.debugElement.query(By.css('#todo-id'));
      const completed = fixture.debugElement.query(By.css('#completed'));
      const content = fixture.debugElement.query(By.css('#todo'));

      expect(userId.nativeElement.disabled).toBe(false);
      expect(id.nativeElement.disabled).toBe(true);
      expect(completed.nativeElement.disabled).toBe(false);
      expect(content.nativeElement.disabled).toBe(false);
    });

    it('should dispatch update action', () => {
      const submitButton = fixture.debugElement.query(
        By.css('#submitButton > button')
      );
      submitButton.nativeElement.click();
      submitButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.updateTodo({ todo: fakeTodo })
      );
    });

    it('should dispatch add todo action', () => {
      selectSelectedTodoSpy.setResult(null);
      selectCreationModeActiveSpy.setResult(true);
      mockStore.refreshState();
      fixture.detectChanges();

      component.todoForm.setValue({ ...fakeTodo });

      const submitButton = fixture.debugElement.query(
        By.css('#submitButton > button')
      );
      submitButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.addTodo({
          todo: { ...fakeTodo, id: undefined } as DraftTodo,
        })
      );
    });

    it('should not dispatch add todo action if form is invalid', () => {
      selectSelectedTodoSpy.setResult(null);
      selectCreationModeActiveSpy.setResult(true);
      mockStore.refreshState();
      fixture.detectChanges();

      component.todoForm.setValue({ ...fakeTodo, todo: '' });

      const submitButton = fixture.debugElement.query(
        By.css('#submitButton > button')
      );
      submitButton.nativeElement.click();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch edit todo action if form is invalid', () => {
      const submitButton = fixture.debugElement.query(
        By.css('#submitButton > button')
      );
      submitButton.nativeElement.click();

      component.todoForm.controls.todo.setValue('');
      fixture.detectChanges();

      submitButton.nativeElement.click();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  describe('Actions', () => {
    it('should clear selected todo and deactivate create mode on close', () => {
      const closeButton = fixture.debugElement.query(
        By.css('#closeButton > button')
      );
      closeButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.clearSelectedTodo()
      );
      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.deactivateCreateTodoMode()
      );
    });

    it('should dispatch delete action', () => {
      const deleteButton = fixture.debugElement.query(
        By.css('#deleteButton > button')
      );
      deleteButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.deleteTodo({ id: fakeTodo.id })
      );
    });

    it('should remove delete button if there is no todo selected', () => {
      selectSelectedTodoSpy.setResult(null);
      mockStore.refreshState();
      fixture.detectChanges();

      const deleteButton = fixture.debugElement.query(
        By.css('#deleteButton > button')
      );
      expect(deleteButton).toBeNull();
    });
  });
});
