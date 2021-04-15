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

// components
import { AppComponent } from './app.component';

// routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        // components
        AppComponent,

        // layouts
        ContentLayoutComponent,
        AuthLayoutComponent,
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
