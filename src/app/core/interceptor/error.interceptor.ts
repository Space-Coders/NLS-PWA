import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { SweetAlertService } from '@app/service/sweet-alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private sweetAlertService: SweetAlertService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error) {
                    switch (error.status) {
                        case 400:
                            if (error.error.errors) {
                                const modalStateErrors = [];
                                for (const key in error.error.errors) {
                                    if (error.error.errors[key]) {
                                        modalStateErrors.push(error.error.errors[key]);
                                    }
                                }
                                this.sweetAlertService.error(modalStateErrors.flat().toString());
                                throw modalStateErrors.flat();
                            } else if (typeof error.error === 'object') {
                                this.sweetAlertService.error(error.error.message);
                            } else {
                                this.sweetAlertService.error(error.error);
                            }
                            break;
                        case 401:
                            this.sweetAlertService.unauthorized(
                                'Unauthorized. Please login again to continue',
                                'Back to sign in',
                            );
                            break;
                        case 404:
                            this.router.navigateByUrl('/not-found');
                            break;
                        case 500:
                            // const navigationExtras: NavigationExtras = { state: { error: error.error } };
                            // this.router.navigateByUrl('/server-error', navigationExtras);
                            this.sweetAlertService.error(error.error.message);
                            break;
                        default:
                            this.sweetAlertService.error('Something went wrong');
                            console.log(error);
                            break;
                    }
                }
                return throwError(error);
            }),
        );
    }
}
