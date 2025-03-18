import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyAuCU7pQVaxrn-gShGJ_ZR898L4_0QqUMs",
        authDomain: "spec-612cd.firebaseapp.com",
        projectId: "spec-612cd",
        storageBucket: "spec-612cd.firebasestorage.app",
        messagingSenderId: "696940817856",
        appId: "1:696940817856:android:01b08d64f4b31424ccac25"
    };
    
    firebase.initializeApp(firebaseConfig);
}

// Request permission for Firebase messaging
export async function requestFCMPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('FCM Authorization status:', authStatus);
        return true;
    }
    console.log('FCM permission denied');
    return false;
}

// Get the FCM token
export async function getFCMToken() {
    try {
        // Check if permission is granted
        const permissionGranted = await requestFCMPermission();
        if (!permissionGranted) return null;
        
        // Get the token
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        return token;
    } catch (error) {
        console.log('Error getting FCM token:', error);
        return null;
    }
}

// Register for push notifications using Expo
export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            console.log("Разрешение на уведомления не получено!");
            return null;
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "Default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        // Try to get Firebase token first
        token = await getFCMToken();
        
        // Fallback to Expo token if Firebase token is not available
        if (!token) {
            token = (await Notifications.getExpoPushTokenAsync()).data;
        }
        
        console.log("Push Token:", token);
    } else {
        console.log("Push уведомления не поддерживаются в эмуляторе!");
    }

    return token;
}

// Handle incoming messages when the app is in the foreground
export function onMessageReceived() {
    return messaging().onMessage(async remoteMessage => {
        console.log('Foreground Message received:', remoteMessage);
        
        // Display the notification using Expo Notifications
        await Notifications.scheduleNotificationAsync({
            content: {
                title: remoteMessage.notification?.title || 'Новое уведомление',
                body: remoteMessage.notification?.body || '',
                data: remoteMessage.data,
            },
            trigger: null,
        });
    });
}

// Handle notification opened when app is in background
export function onNotificationOpened() {
    return messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened (background):', remoteMessage);
        // Handle navigation or other actions here
    });
}

// Check if app was opened from a notification
export async function checkInitialNotification() {
    const remoteMessage = await messaging().getInitialNotification();
    
    if (remoteMessage) {
        console.log('App opened from quit state by notification:', remoteMessage);
        // Handle navigation or other actions here
        return remoteMessage;
    }
    
    return null;
}