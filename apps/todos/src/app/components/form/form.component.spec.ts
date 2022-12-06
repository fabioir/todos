import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fromTodoActions } from '../../state';
import { ButtonComponent } from '../button/button.component';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, ButtonComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore;

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Actions', () => {
    let dispatchSpy: jest.SpyInstance;

    beforeEach(() => (dispatchSpy = jest.spyOn(mockStore, 'dispatch')));

    afterEach(() => dispatchSpy.mockRestore());

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
