// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared modules
import { SharedModule } from '@shared/shared.module';

// resolvers
import { ScheduleListResolver } from '@data/resolver/schedule/schedule-list.resolver';

// components
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NotFoundComponent } from './page/not-found/not-found.component';

// routing
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
    imports: [CommonModule, SharedModule, DashboardRoutingModule],
    declarations: [DashboardComponent, NotFoundComponent],
    providers: [ScheduleListResolver],
})
export class DashboardModule {}
