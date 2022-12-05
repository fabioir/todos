import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeTodoFactory } from '../../utils/todo.fakes';

import { ItemComponent } from './item.component';

const fakeTodo = fakeTodoFactory();

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.todo = fakeTodo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
