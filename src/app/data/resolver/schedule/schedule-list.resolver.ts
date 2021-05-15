import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SweetAlertService } from '@app/service/sweet-alert.service';
import { ScheduleService } from '@data/service/schedule/schedule.service';

import { ISchedule } from '@data/schema/schedule';

@Injectable()
export class ScheduleListResolver implements Resolve<ISchedule[]> {
    constructor(
        private scheduleService: ScheduleService,
        private router: Router,
        private sweetAlertService: SweetAlertService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ISchedule[]> {
        return this.scheduleService.getSchedules().pipe(
            catchError((error) => {
                console.error(error);
                // this.router.navigate(['/home']);
                return of(null);
            }),
        );
    }
}
