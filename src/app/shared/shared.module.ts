// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// external module
//import { NgScrollbarModule } from 'ngx-scrollbar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DataTablesModule } from 'angular-datatables';

// bootstrap module
import { BootstrapModule } from './bootstrap.module';

// components
import { TextInputComponent } from './component/form/text-input/text-input.component';
import { SizeDetectorComponent } from './component/size-detector/size-detector.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        //NgScrollbarModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        DataTablesModule,
        BootstrapModule,
    ],
    declarations: [TextInputComponent, SizeDetectorComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // NgScrollbarModule,
        DataTablesModule,
        CalendarModule,
        BootstrapModule,
        TextInputComponent,
        SizeDetectorComponent,
    ],
})
export class SharedModule {}
