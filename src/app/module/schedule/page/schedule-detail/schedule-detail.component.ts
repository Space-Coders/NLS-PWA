import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ResizeService } from '@app/service/resize.service';
import { SweetAlertService } from '@app/service/sweet-alert.service';
import { ScheduleService } from '@data/service/schedule/schedule.service';

import { ISchedule } from '@data/schema/schedule';
import { ScheduleStatus } from '@data/enum/scheduleStatus';

import { SCREEN_SIZE } from '@data/enum/screenSize';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-schedule-detail',
    templateUrl: './schedule-detail.component.html',
    styleUrls: ['./schedule-detail.component.scss'],
})
export class ScheduleDetailComponent implements OnInit {
    schedule: ISchedule;
    scheduleStatus = ScheduleStatus;
    screenSize: SCREEN_SIZE = 3;

    softwareForm: FormGroup;
    isFormProcessing = false;

    constructor(
        private route: ActivatedRoute,
        private resizeService: ResizeService,
        private scheduleService: ScheduleService,
        private sweetAlertService: SweetAlertService,
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
    ) {
        this.initializeForm();

        this.resizeService.onResize$.pipe(delay(0)).subscribe((size) => {
            this.screenSize = size;

            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.schedule = data.schedule;
        });
    }

    updateScheduleStatus(status: ScheduleStatus) {
        this.scheduleService.patchScheduleStatus(this.schedule.id, status).subscribe(
            (schedule) => {
                this.schedule.status = status;
                this.sweetAlertService.success('Successfully updated the schedule status');
            },
            (error) => {
                console.error(error);
            },
        );
    }

    private initializeForm(): void {
        this.softwareForm = this.formBuilder.group({
            software: ['', Validators.required],
            adHoc: [false],
        });
    }

    get f() {
        return this.softwareForm.controls;
    }

    requestSoftware() {}
}
