import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import WebViewScreen from './app/index';

// ✅ Фоновое уведомление (обязательно вне компонента!)
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📥 [Background] Уведомление получено:', remoteMessage);
    await displayNotification(remoteMessage);
});

// ✅ Отображение уведомления вручную
async function displayNotification(remoteMessage: any) {
    await notifee.requestPermission();

    // Создаем канал (только 1 раз)
    await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    await notifee.displayNotification({
        title: remoteMessage.notification?.title || '🔥 Уведомление',
        body: remoteMessage.notification?.body || '',
        android: {
            channelId: 'default',
            pressAction: {
                id: 'default',
            },
        },
    });
}

export default function App() {
    useEffect(() => {
        const getToken = async () => {
            try {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (!enabled) {
                    Alert.alert('❌ Разрешение на уведомления не получено');
                    return;
                }

                const fcmToken = await messaging().getToken();
                console.log('📲 FCM Token:', fcmToken);
            } catch (error) {
                console.error('❌ Ошибка при получении FCM токена:', error);
            }
        };

        if (Platform.OS === 'android') {
            getToken();
        }

        // ✅ Активное приложение — показать пуш
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('🟢 [Foreground] Уведомление получено:', remoteMessage);
            await displayNotification(remoteMessage);
        });

        return unsubscribe;
    }, []);

    return <WebViewScreen />;
}