import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select-field',
  template: `
    <span class="title">{{ title }}</span>
    <select [value]="value" (change)="onSelectChange($event)">
      @for(option of options; track option) {
      <option [value]="option">{{ option }}</option>
      }
    </select>
  `,
  styles: `
  .title {
    margin-right: 5px;
  }`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) value: string = '';
  @Input({ required: true }) options: string[] = [];
  @Output() onChange = new EventEmitter<string>();

  onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.onChange.emit(value);
  }
}
