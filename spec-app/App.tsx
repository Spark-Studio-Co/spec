import React, { useEffect, useRef, useState } from 'react';
import WebViewScreen from "./app/index";
import { registerForPushNotificationsAsync, onMessageReceived, onNotificationOpened, checkInitialNotification } from './firebase';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    const messageListener = useRef<any>();
    const notificationOpenedListener = useRef<any>();

    useEffect(() => {
        // Register for push notifications and get token
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token);
                console.log('Push token:', token);
            }
        });

        // Check if app was opened from a notification
        checkInitialNotification().then(notification => {
            if (notification) {
                // Handle the notification data if needed
                console.log('App opened from notification:', notification);
            }
        });

        // Set up listeners for notifications
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification response:', response);
        });

        // Set up Firebase message listeners
        if (Platform.OS !== 'web') {
            // Listen for foreground messages
            messageListener.current = onMessageReceived();
            
            // Listen for notification opened events
            notificationOpenedListener.current = onNotificationOpened();
        }

        // Clean up listeners on unmount
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            
            if (messageListener.current) {
                messageListener.current();
            }
            
            if (notificationOpenedListener.current) {
                notificationOpenedListener.current();
            }
        };
    }, []);

    return (
        <WebViewScreen />
    );
}