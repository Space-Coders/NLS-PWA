import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/service/auth.service';

import { first } from 'rxjs/operators';
import { User } from '@data/schema/user';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    currentUser: User;

    isNavMenuCollapsed = true;

    constructor(public authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.currentUser$.pipe(first()).subscribe((user: User) => {
            if (user) {
                this.currentUser = user;
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/');
    }

    onNavbarTogglerClick() {
        this.isNavMenuCollapsed = !this.isNavMenuCollapsed;
    }
}
