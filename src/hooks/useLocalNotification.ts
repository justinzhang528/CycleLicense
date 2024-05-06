import {LocalNotifications, Weekday} from "@capacitor/local-notifications";

const scheduleNotificationEveryDay = async (everydayAt: number, holidayAt: number, title: string, body: string) => {
    // Set the date and time for the notification
    const everydayNotificationTime = new Date();
    everydayNotificationTime.setHours(everydayAt);
    const holidayNotificationTime = new Date();
    holidayNotificationTime.setHours(holidayAt);

    // Schedule the notification
    await LocalNotifications.schedule({
        notifications: [
            {
                title: title,
                body: body,
                id: 1,
                schedule: { at: everydayNotificationTime, repeats: true},
            }
        ]
    });
}

export default function scheduleNotification (title: string, body: string) {
    LocalNotifications.requestPermissions().then(permission => {
        if (permission) {
            scheduleNotificationEveryDay(22, 10, title, body);
        }
    });
}