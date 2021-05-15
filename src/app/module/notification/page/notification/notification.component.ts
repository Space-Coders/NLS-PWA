import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '@env';
import { SweetAlertService } from '@app/service/sweet-alert.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    readonly VAPID_PUBLIC_KEY = environment.vapidPublicKey;

    constructor(private swPush: SwPush, private sweetAlertService: SweetAlertService) {}

    ngOnInit() {}

    // notification handler
    subscribeToNotifications() {
        this.swPush
            .requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY,
            })
            .then((sub) => {
                console.log(sub.toJSON());
            })
            .catch((err) => {
                console.error('Could not subscribe to notifications', err);
                this.sweetAlertService.error('Could not subscribe to notifications');
            });
    }
}
