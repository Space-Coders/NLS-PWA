// core modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ScheduleListResolver } from '@data/resolver/schedule/schedule-list.resolver';
import { ScheduleDetailResolver } from '@data/resolver/schedule/schedule-detail.resolver';

// components
import { ScheduleComponent } from './page/schedule/schedule.component';
import { ScheduleDetailComponent } from './page/schedule-detail/schedule-detail.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                runGuardsAndResolvers: 'always',
                component: ScheduleComponent,
                resolve: {
                    schedules: ScheduleListResolver,
                },
            },
            {
                path: ':id',
                runGuardsAndResolvers: 'always',
                component: ScheduleDetailComponent,
                resolve: {
                    schedule: ScheduleDetailResolver,
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ScheduleRoutingModule {}
