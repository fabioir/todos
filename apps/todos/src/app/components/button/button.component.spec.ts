import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display text', () => {
    component.text = 'button text';
    fixture.detectChanges();

    const textContent = fixture.debugElement.nativeElement.textContent.trim();
    expect(textContent).toBe('button text');
  });

  it('should emit on click', (done) => {
    fixture.detectChanges();

    component.clicked.pipe(take(1)).subscribe(() => {
      done();
    });

    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    button.nativeElement.click();
  });
});
