import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fromTodoActions, fromTodoSelectors } from '../../state';
import { fakeTodoFactory } from '../../utils/todo.fakes';
import { ButtonComponent } from '../button/button.component';

import { FormComponent } from './form.component';

const fakeTodo = fakeTodoFactory();

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, ButtonComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore;
    mockStore.overrideSelector(fromTodoSelectors.selectSelectedTodo, fakeTodo);

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
  });

  describe('Edit', () => {
    it('should enable all but id fields', () => {
      const editButton = fixture.debugElement.query(
        By.css('#editButton > button')
      );
      editButton.nativeElement.click();

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
      const editButton = fixture.debugElement.query(
        By.css('#editButton > button')
      );
      editButton.nativeElement.click();
      editButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.updateTodo({ todo: fakeTodo })
      );
    });

    it('should show error hint and prevent dispatch if form is invalid', () => {
      const editButton = fixture.debugElement.query(
        By.css('#editButton > button')
      );
      editButton.nativeElement.click();

      component.todoForm.controls.todo.setValue('');
      fixture.detectChanges();

      editButton.nativeElement.click();
      const errorHint = fixture.debugElement.query(By.css('#errorHint'));

      expect(errorHint).toBeTruthy();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  describe('Actions', () => {
    it('should clear selected todo', () => {
      const closeButton = fixture.debugElement.query(
        By.css('#closeButton > button')
      );
      closeButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.clearSelectedTodo()
      );
    });
  });
});
