// modules
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

// services
import { LayoutService } from '@app/service/layout.service';
import { ResizeService } from '@app/service/resize.service';

// enums
import { SCREEN_SIZE } from '@data/enum/screenSize';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
    isSidebarExpanded = true;
    screenSize: SCREEN_SIZE;

    constructor(private layoutService: LayoutService, private resizeService: ResizeService) {
        this.resizeService.onResize$.pipe(delay(0)).subscribe((size) => {
            this.screenSize = size;

            this.layoutService.toggleSidebarExpandedState(this.screenSize < 2 ? false : true);
        });
    }

    ngOnInit() {
        this.layoutService.isSidebarExpanded$.subscribe((isExpanded) => {
            this.isSidebarExpanded = isExpanded;
        });
    }
}
