import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@app/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isFormProcessing = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.initializeForm();

        // redirect to home if already logged in
        // if (this.authService.userValue) {
        //     this.router.navigate(['/dashboard']);
        // }
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

        this.returnUrl = this.returnUrl === '/' ? '/dashboard' : this.returnUrl;
    }

    private initializeForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false],
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    login() {
        this.isFormProcessing = true;

        this.authService.login(this.loginForm.value).subscribe(
            (response) => {
                this.router.navigateByUrl(this.returnUrl);
                this.isFormProcessing = false;
            },
            (error) => {
                this.isFormProcessing = false;
                console.log(error);
            },
        );
    }
}
