// core modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers

// components
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NotFoundComponent } from './page/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        runGuardsAndResolvers: 'always',
        component: DashboardComponent,
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
