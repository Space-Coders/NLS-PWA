// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared modules
import { SharedModule } from '@shared/shared.module';

// resolvers
import { ScheduleListResolver } from '@data/resolver/schedule/schedule-list.resolver';

// components
import { ScheduleComponent } from './page/schedule/schedule.component';

// routing
import { ScheduleRoutingModule } from './schedule.routing';

@NgModule({
    imports: [CommonModule, SharedModule, ScheduleRoutingModule],
    declarations: [ScheduleComponent],
    providers: [ScheduleListResolver],
})
export class ScheduleModule {}
