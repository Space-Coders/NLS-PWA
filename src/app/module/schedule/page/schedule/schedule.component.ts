// core
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

// schema
import { ISchedule } from '@data/schema/schedule';
import { Subject } from 'rxjs';

import { ScheduleStatus } from '@data/enum/scheduleStatus';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy, AfterViewInit {
    dtOptions: DataTables.Settings = {};
    schedules: ISchedule[] = [];

    dtTrigger: Subject<any> = new Subject<any>();

    scheduleStatus = ScheduleStatus;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.dtOptions = {
            searching: true,
            lengthChange: false,
            paging: true,
            info: true,
            dom: 'ftipr',
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $('td', row).off('click');
                $('td', row).on('click', () => {
                    self.router.navigate(['/schedules/', data[0]]);
                });
                return row;
            },
        };

        this.route.data.subscribe((data) => {
            this.schedules = data.schedules;
            this.dtTrigger.next();
        });
    }

    ngAfterViewInit() {
        this.dtTrigger.next();
    }

    ngOnDestroy() {
        this.dtTrigger.unsubscribe();
    }
}
