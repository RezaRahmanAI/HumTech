import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label class="flex flex-col gap-2 text-sm font-medium text-secondary-700">
      <span>{{ label }}</span>
      <ng-container [ngSwitch]="type">
        <textarea
          *ngSwitchCase="'textarea'"
          [formControl]="control"
          [rows]="rows"
          class="rounded-lg border border-secondary-200 bg-accent px-4 py-3 text-sm text-secondary-800 placeholder:text-secondary-400 focus:border-primary focus:outline-none focus:ring focus:ring-primary-200"
          [attr.placeholder]="placeholder"
        ></textarea>
        <select
          *ngSwitchCase="'select'"
          [formControl]="control"
          class="rounded-lg border border-secondary-200 bg-accent px-4 py-3 text-sm text-secondary-800 focus:border-primary focus:outline-none focus:ring focus:ring-primary-200"
        >
          <option value="" disabled selected hidden>{{ placeholder }}</option>
          <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
        </select>
        <input
          *ngSwitchDefault
          [formControl]="control"
          [attr.type]="type"
          class="rounded-lg border border-secondary-200 bg-accent px-4 py-3 text-sm text-secondary-800 placeholder:text-secondary-400 focus:border-primary focus:outline-none focus:ring focus:ring-primary-200"
          [attr.placeholder]="placeholder"
        />
      </ng-container>
      <span *ngIf="showError" class="text-xs font-normal text-primary">{{ errorMessage }}</span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label = '';
  @Input() type: 'text' | 'email' | 'textarea' | 'select' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() options: Array<{ label: string; value: string }> = [];
  @Input() rows = 4;

  get showError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errorMessage(): string | null {
    if (!this.control.errors) {
      return null;
    }
    if (this.control.errors['required']) {
      return 'This field is required.';
    }
    if (this.control.errors['email']) {
      return 'Please enter a valid email address.';
    }
    if (this.control.errors['minlength']) {
      return `Minimum length is ${this.control.errors['minlength'].requiredLength} characters.`;
    }
    return 'Please review this field.';
  }
}
