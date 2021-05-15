// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared modules
import { SharedModule } from '@shared/shared.module';

// resolvers

// components
import { NotificationComponent } from './page/notification/notification.component';

// routing
import { NotificationRoutingModule } from './notification.routing';

@NgModule({
    imports: [CommonModule, SharedModule, NotificationRoutingModule],
    declarations: [NotificationComponent],
    providers: [],
})
export class NotificationModule {}
