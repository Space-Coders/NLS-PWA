import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { User } from '@data/schema/user';

interface LoginContextInterface {
    email: string;
    password: string;
    rememberMe?: boolean;
}

interface ForgotPasswordContextInterface {
    email: string;
}

interface ResetPasswordContextInterface {
    email: string;
    token: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl: string;
    // private currentUserSource = new ReplaySubject<User>(1);
    private currentUserSource = new BehaviorSubject<User>(null);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    login(loginContext: LoginContextInterface) {
        return this.http.post(this.baseUrl + '/auth/signin', loginContext).pipe(
            map((response: User) => {
                const user = response;
                if (user) {
                    this.setCurrentUser(user);
                }
            }),
        );
    }

    setCurrentUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }

    logout() {
        // localStorage.removeItem('user');
        localStorage.clear();
        this.currentUserSource.next(null);
        this.stopRefreshTokenTimer();
    }

    refreshToken() {
        return this.http.post<any>(`${this.baseUrl}/auth/refreshtoken`, {}).pipe(
            map((user: User) => {
                this.currentUserSource.next({ ...this.userValue, accessToken: user.accessToken });
                this.startRefreshTokenTimer();
                return user;
            }),
        );
    }

    getDecodedToken(token) {
        return JSON.parse(atob(token.split('.')[1]));
    }

    forgotPassword(forgotPasswordContext: ForgotPasswordContextInterface) {
        return this.http.post(this.baseUrl + '/auth/forgotpassword', forgotPasswordContext);
    }

    resetPassword(resetPasswordContext: ResetPasswordContextInterface) {
        return this.http.post(this.baseUrl + '/auth/resetpassword', resetPasswordContext);
    }

    // refresh token helper methods
    public get userValue(): User {
        return this.currentUserSource.value;
    }

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.userValue.accessToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - 60 * 1000;
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
