import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    declarations: [],
    imports: [
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
    ],
    exports: [BsDropdownModule, CollapseModule, ModalModule, TypeaheadModule, BsDatepickerModule, TabsModule],
})
export class BootstrapModule {}
