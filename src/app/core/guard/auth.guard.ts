import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            map((user) => {
                if (user) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }
                this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }),
        );
    }
}
