import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'todos-item',
  templateUrl: './item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnChanges {
  @Input() todo!: Todo;
  @Input() selected = false;

  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoSelected = new EventEmitter<Todo>();

  public completed!: boolean;

  ngOnChanges(): void {
    this.completed = this.todo.completed;
  }

  completedToggled(): void {
    this.todoUpdated.emit({ ...this.todo, completed: this.completed });
  }

  selectTodo(): void {
    this.todoSelected.emit(this.todo);
  }
}
