export interface INotification {
    endpoint: string;
    expiration: number | null;
    auth: string;
    p256dh: string;
}
