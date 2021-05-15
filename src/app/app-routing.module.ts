// core modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { AuthGuard } from '@app/guard/auth.guard';

// layouts
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from '@layout/content-layout/content-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () => import('@module/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        component: ContentLayoutComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('@module/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
        ],
    },
    // Fallback when no prior routes is matched
    { path: '**', redirectTo: '/dashboard/not-found', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
