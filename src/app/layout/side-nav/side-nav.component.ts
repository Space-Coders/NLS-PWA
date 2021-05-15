import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/service/auth.service';
import { LayoutService } from '@app/service/layout.service';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
    sideMenuCollapse = {
        allocations: true,
        orders: true,
        stocks: true,
        products: true,
        entities: true,
        settings: true,
    };

    isSidebarExpanded = true;

    constructor(public authService: AuthService, private layoutService: LayoutService) {}

    ngOnInit() {}

    handleOnCollapseClick(menuItem: string) {
        this.sideMenuCollapse[menuItem] = !this.sideMenuCollapse[menuItem];
    }

    toggleSidebarExpand() {
        this.isSidebarExpanded = !this.isSidebarExpanded;
        this.layoutService.toggleSidebarExpandedState(this.isSidebarExpanded);
    }
}
