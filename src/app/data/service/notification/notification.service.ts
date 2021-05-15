import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { INotification } from '@data/schema/notification';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    baseUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    createNotification(notification: INotification) {
        return this.http.post(this.baseUrl + '/notifications', notification);
    }
}
