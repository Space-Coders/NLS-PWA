import { AuthService } from '@app/service/auth.service';

export function appInitializer(authService: AuthService) {
    return () =>
        new Promise((resolve) => {
            resolve(true);
        });
}
