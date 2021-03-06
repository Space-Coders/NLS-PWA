// core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// shared modules
import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';

// layouts
import { ContentLayoutComponent } from '@layout/content-layout/content-layout.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { NavComponent } from '@layout/nav/nav.component';
import { SideNavComponent } from '@layout/side-nav/side-nav.component';

// components
import { AppComponent } from './app.component';

// routing
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        // components
        AppComponent,

        // layouts
        ContentLayoutComponent,
        AuthLayoutComponent,
        NavComponent,
        SideNavComponent,
    ],
    imports: [
        // core modules
        BrowserModule,
        BrowserAnimationsModule,

        // shared modules
        CoreModule,
        SharedModule,

        // routing
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
