import { HallType } from '@data/enum/hallType';
import { ScheduleStatus } from '@data/enum/scheduleStatus';

export interface ISchedule {
    id: number;
    scheduledDate: Date;
    endDate: Date;
    module: string;
    batch: string;
    hall: string;
    hallType: HallType;
    status: ScheduleStatus;
    userId: number;
}
