import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ItemComponent } from '../item/item.component';

import { By } from '@angular/platform-browser';
import { Todo } from '../../models/todo.model';
import { fromTodoReducer, fromTodoSelectors } from '../../state';
import { fakeTodoFactory } from '../../utils/todo.fakes';
import { ListComponent } from './list.component';

const fakeTodo: Todo = fakeTodoFactory();

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockStore: MockStore<fromTodoReducer.State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, ItemComponent],
      providers: [
        provideMockStore({
          initialState: {
            [fromTodoReducer.todoFeatureKey]: fromTodoReducer.initialState,
          },
        }),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore<fromTodoReducer.State>;
    mockStore.overrideSelector(fromTodoSelectors.selectTodos, [fakeTodo]);
    mockStore.overrideSelector(fromTodoSelectors.selectSelectedTodo, fakeTodo);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list item components', () => {
    const items = fixture.debugElement.queryAll(By.directive(ItemComponent));

    expect(items).toBeTruthy();
    expect(items).toHaveLength(1);
    expect(items[0].componentInstance.todo).toBe(fakeTodo);
  });

  it('should mark item as selected', () => {
    const items = fixture.debugElement.queryAll(By.directive(ItemComponent));

    expect(items).toBeTruthy();
    expect(items).toHaveLength(1);
    expect(items[0].componentInstance.selected).toBe(true);
  });
});
