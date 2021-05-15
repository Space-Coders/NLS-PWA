import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '@app/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class SweetAlertService {
    toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
    });

    constructor(private router: Router, private authService: AuthService) {}

    success(message: string) {
        this.toast.fire({
            icon: 'success',
            title: message,
        });
    }

    error(message: string) {
        this.toast.fire({
            icon: 'error',
            title: message,
        });
    }

    warning(message: string) {
        this.toast.fire({
            icon: 'warning',
            title: message,
        });
    }

    message(message: string) {
        this.toast.fire({
            icon: 'info',
            title: message,
        });
    }

    unauthorized(message: string, buttonText: string) {
        this.authService.logout();
        // this.router.navigateByUrl('/');
        console.log(this.router.url);
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: this.router.url } });

        this.toast.fire({
            icon: 'warning',
            title: message,
        });
        // Swal.fire({
        //     toast: true,
        //     position: 'top-end',
        //     title: message,
        //     icon: 'warning',
        //     showConfirmButton: true,
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: buttonText,
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         this.authService.logout();
        //         this.router.navigateByUrl('/');
        //     }
        // });
    }
}
