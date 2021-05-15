import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { environment } from '@env';

import { SweetAlertService } from '@app/service/sweet-alert.service';
import { NotificationService } from '@data/service/notification/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    readonly VAPID_PUBLIC_KEY = environment.vapidPublicKey;

    constructor(
        private swPush: SwPush,
        private sweetAlertService: SweetAlertService,
        private notificationService: NotificationService,
    ) {}

    ngOnInit() {}

    // notification handler
    subscribeToNotifications() {
        this.swPush
            .requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY,
            })
            .then(async (sub) => {
                const subscription = sub.toJSON();
                console.log(subscription);

                try {
                    await this.notificationService
                        .createNotification({
                            endpoint: subscription.endpoint,
                            expiration: subscription.expirationTime,
                            auth: subscription.keys?.auth,
                            p256dh: subscription.keys?.p256dh,
                        })
                        .toPromise();

                    this.sweetAlertService.success('Successfully subscribed to notifications');
                } catch (error) {
                    this.sweetAlertService.error('Could not subscribe to notifications');
                }
            })
            .catch((err) => {
                console.error('Could not subscribe to notifications', err);
                this.sweetAlertService.error('Could not subscribe to notifications');
            });
    }
}
