import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { fromTodoSelectors } from './state';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockStore: MockStore;
  let selectSelectedTodo: MemoizedSelector<unknown, unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        ListComponent,
        ItemComponent,
        FormComponent,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(Store) as MockStore;
    selectSelectedTodo = mockStore.overrideSelector(
      fromTodoSelectors.selectSelectedTodo,
      null
    ) as unknown as MemoizedSelector<unknown, unknown>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form', () => {
    it('should not show todos form if no selected todo', () =>
      expect(
        fixture.debugElement.query(By.directive(FormComponent))
      ).toBeNull());

    it('should show todos form if selected todo', () => {
      selectSelectedTodo.setResult({});
      mockStore.refreshState();
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.directive(FormComponent))
      ).toBeTruthy();
    });
  });
});
