// core
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

// services
import { ScheduleService } from '@data/service/schedule/schedule.service';

// schemas
import { ISchedule } from '@data/schema/schedule';
import { ScheduleStatus } from '@data/enum/scheduleStatus';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

    schedules: ISchedule[];

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    acceptLecture: boolean;

    rejectLecture: boolean;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];

    // activeDayIsOpen: boolean = true;
    activeDayIsOpen: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private scheduleService: ScheduleService) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.schedules = data.schedules;

            const ev = this.schedules.map((schedule) => ({
                start: new Date(schedule.scheduledDate),
                end: new Date(schedule.endDate),
                title: `${schedule.module} - ${schedule.batch} - ${schedule.hall}`,
                color: colors.yellow,
                actions: this.actions,
                meta: {
                    scheduleId: schedule.id,
                    ScheduleStatus: schedule.status,
                },
            }));

            this.events = [...this.events, ...ev];
        });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.router.navigate(['/schedules/', event.meta.scheduleId]);
        // this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    acceptSchedule(event: CalendarEvent) {
        console.log('lecture accepted', event);
        this.scheduleService.updateSchedule(event.meta.scheduleId, ScheduleStatus.ACCEPTED).subscribe(() => {
            console.log('success');
            //     this.scheduleService.getSchedule(event.meta.schedule).subscribe((data) => {

            //         ScheduleStatus.ACCEPTED;

            //    }),
            (error) => console.log(error);
        });
    }

    rejectSchedule(event: CalendarEvent) {
        console.log('lecture rejected');
        this.scheduleService.updateSchedule(event.meta.scheduleId, ScheduleStatus.REJECTED).subscribe(
            () => console.log('success'),
            (error) => console.log(error),
        );
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
}
