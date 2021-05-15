import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private isSidebarExpandedSource = new BehaviorSubject<boolean>(true);
    isSidebarExpanded$ = this.isSidebarExpandedSource.asObservable();

    constructor() {}

    toggleSidebarExpandedState(isExpanded?: boolean) {
        this.isSidebarExpandedSource.next(isExpanded);
    }
}
