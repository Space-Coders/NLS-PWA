// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared modules
import { SharedModule } from '@shared/shared.module';

// resolvers
import { ScheduleListResolver } from '@data/resolver/schedule/schedule-list.resolver';
import { ScheduleDetailResolver } from '@data/resolver/schedule/schedule-detail.resolver';

// components
import { ScheduleComponent } from './page/schedule/schedule.component';
import { ScheduleDetailComponent } from './page/schedule-detail/schedule-detail.component';

// routing
import { ScheduleRoutingModule } from './schedule.routing';

@NgModule({
    imports: [CommonModule, SharedModule, ScheduleRoutingModule],
    declarations: [ScheduleComponent, ScheduleDetailComponent],
    providers: [ScheduleListResolver, ScheduleDetailResolver],
})
export class ScheduleModule {}
