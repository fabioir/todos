import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'todos-item',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input() todo!: Todo;
  @Input() selected = false;
}
