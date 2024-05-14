export const NotificationTypes = {
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
} as const;

type NotificationType = (typeof NotificationTypes)[keyof typeof NotificationTypes];

export interface NotificationPayload {
    title: string;
    message: string;
    type: NotificationType;
}

export const notificationLifetime = 8_000;

/** Update frequency of the lifetime bar */
export const intervalTime = 10;
