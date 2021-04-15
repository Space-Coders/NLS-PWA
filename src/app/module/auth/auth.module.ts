// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared modules
import { SharedModule } from '@shared/shared.module';

// components
import { LoginComponent } from './page/login/login.component';

// routing
import { AuthRoutingModule } from './auth.routing';

@NgModule({
    imports: [CommonModule, AuthRoutingModule, SharedModule],
    declarations: [LoginComponent],
})
export class AuthModule {}
