import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-input-field',
  template: `
    <input
      [value]="value"
      (input)="onInput($event)"
      placeholder="Search phrease"
    />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  @Input({ required: true }) value: string = '';
  @Output() onChange = new EventEmitter<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.onChange.emit(value);
  }
}
