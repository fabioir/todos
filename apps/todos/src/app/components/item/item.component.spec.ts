import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';
import { fakeTodoFactory } from '../../utils/todo.fakes';

import { ItemComponent } from './item.component';

const fakeTodo = fakeTodoFactory();

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.todo = fakeTodo;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display todo content', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      fakeTodo.todo
    );
  });

  it('should toggle todo completed', (done) => {
    fixture.detectChanges();
    component.todoUpdated.pipe(take(1)).subscribe((updatedTodo) => {
      expect(updatedTodo).toEqual({
        ...fakeTodo,
        completed: !fakeTodo.completed,
      });
      done();
    });

    const checkbox = fixture.debugElement.query(By.css('input[type=checkbox]'));
    checkbox.nativeElement.click();
  });

  describe('Select', () => {
    it('should hide select button when selected', () => {
      component.selected = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#selectButton'))).toBeNull();
    });

    it('should select todo', (done) => {
      fixture.detectChanges();

      component.todoSelected.pipe(take(1)).subscribe((selectedTodo) => {
        expect(selectedTodo).toBe(fakeTodo);
        done();
      });

      const selectButton = fixture.debugElement.query(By.css('#selectButton'));
      selectButton.nativeElement.click();
    });
  });
});
