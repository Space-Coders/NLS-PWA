// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// components
import { TextInputComponent } from './component/form/text-input/text-input.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    declarations: [TextInputComponent],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TextInputComponent],
})
export class SharedModule {}
