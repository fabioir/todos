import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fromTodoActions, fromTodoSelectors } from '../../state';
import { ButtonComponent } from '../button/button.component';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let selectCreationModeActiveSpy: MemoizedSelector<unknown, unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent, ButtonComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore;
    selectCreationModeActiveSpy = mockStore.overrideSelector(
      fromTodoSelectors.selectCreationModeActive,
      false
    ) as unknown as MemoizedSelector<unknown, unknown>;

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => (dispatchSpy = jest.spyOn(mockStore, 'dispatch')));

  afterEach(() => dispatchSpy.mockClear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show app title', () => {
    const title = fixture.debugElement.query(By.css('#app-title'));
    expect(title.nativeElement?.textContent.trim()).toBe('Todos app');
  });

  describe('createButton', () => {
    it('should dispatch creation mode action', () => {
      const createButton = fixture.debugElement.query(
        By.css('#createButton > button')
      );
      createButton.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        fromTodoActions.activateCreateTodoMode()
      );
    });

    it('should hide creation button when creation mode is active', () => {
      selectCreationModeActiveSpy.setResult(true);
      mockStore.refreshState();
      fixture.detectChanges();

      const createButton = fixture.debugElement.query(
        By.css('#createButton > button')
      );
      expect(createButton).toBeNull();
    });
  });
});
