import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'todos-form-fields',
  templateUrl: './form-fields.component.html',
})
export class FormFieldsComponent {
  @Input() todoForm!: FormGroup;
}
