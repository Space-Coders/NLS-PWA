import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '@app/guard/auth.guard';
import { throwIfAlreadyLoaded } from '@app/guard/module-import.guard';

import { TokenInterceptor } from '@app/interceptor/token.interceptor';
import { ErrorInterceptor } from '@app/interceptor/error.interceptor';
import { appInitializer } from '@app/helper/app.initializer';

import { AuthService } from '@app/service/auth.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        AuthGuard,
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
