// core modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ScheduleListResolver } from '@data/resolver/schedule/schedule-list.resolver';

// components
import { ScheduleComponent } from './page/schedule/schedule.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
        component: ScheduleComponent,
        resolve: {
            schedules: ScheduleListResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ScheduleRoutingModule {}
