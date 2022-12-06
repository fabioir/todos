import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

type ColorType = 'primary' | 'warn';

@Component({
  selector: 'todos-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() color: ColorType = 'primary';

  @Output() clicked = new EventEmitter();
}
