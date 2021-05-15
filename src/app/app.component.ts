import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { User } from '@data/schema/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'app';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.setCurrentUser();
        this.multiTabLogout();
    }

    setCurrentUser() {
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.authService.setCurrentUser(user);
        } else {
            this.authService.setCurrentUser(null);
        }
    }

    multiTabLogout() {
        window.addEventListener('storage', (event) => {
            if (event.storageArea == localStorage) {
                let user = localStorage.getItem('user');
                if (!user) {
                    this.authService.logout();
                    this.router.navigate(['auth/login']);
                }
            }
        });
    }
}
