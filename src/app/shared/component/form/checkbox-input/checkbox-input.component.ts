import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { IFormCustomClass } from '@data/schema/generic/form';

@Component({
    selector: 'app-checkbox-input',
    templateUrl: './checkbox-input.component.html',
    styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() checked: boolean = false;
    @Input() customClasses: IFormCustomClass = {
        formGroup: 'form-group',
        label: 'text-muted small',
        input: 'form-control',
    };
    type = 'checkbox';

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    writeValue(obj: any): void {
        this.setChecked(!!obj);
    }

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    private setChecked(checked: boolean) {
        if (checked === this.checked) {
            return;
        }
        this.checked = checked;
    }

    handleCheckboxChange(event) {
        this.setChecked(event.target.checked);
        this.ngControl.control.setValue(this.checked);
    }
}
