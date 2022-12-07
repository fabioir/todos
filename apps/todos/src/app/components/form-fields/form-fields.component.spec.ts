import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormFieldsComponent } from './form-fields.component';

describe('FormFieldsComponent', () => {
  let component: FormFieldsComponent;
  let fixture: ComponentFixture<FormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldsComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldsComponent);
    component = fixture.componentInstance;
    component.todoForm = new FormGroup({
      todo: new FormControl('', Validators.required),
      userId: new FormControl(),
      id: new FormControl(),
      completed: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error hint if form is invalid and dirty', () => {
    component.todoForm.markAsDirty();
    fixture.detectChanges();

    const errorHint = fixture.debugElement.query(By.css('#errorHint'));

    expect(errorHint).toBeTruthy();
  });

  it.each([null, undefined])('should hide id if value is %p', (value) => {
    component.todoForm.controls['id'].setValue(value);
    fixture.detectChanges();

    const idField = fixture.debugElement.query(By.css('#todo-id'));
    expect(idField).toBeNull();
  });
});
