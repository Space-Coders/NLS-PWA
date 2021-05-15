// core modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers

// components
import { NotificationComponent } from './page/notification/notification.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
        component: NotificationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationRoutingModule {}
