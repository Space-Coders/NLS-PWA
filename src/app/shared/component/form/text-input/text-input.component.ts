import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { IFormCustomClass } from '@data/schema/generic/form';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() placeholder: string;
    @Input() type = 'text';
    @Input() inputGroupAppendEnabled = false;
    @Input() inputGroupAppendText = '%';
    @Input() customClasses: IFormCustomClass = {
        formGroup: 'form-group',
        label: 'font-weight-bold text-muted small mb-0',
        input: 'form-control',
    };

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    writeValue(obj: any): void {}

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}
}
