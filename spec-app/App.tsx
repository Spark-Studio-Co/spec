import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import WebViewScreen from './app/index';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📥 [Background] Уведомление получено:', remoteMessage);
});

export default function App() {
    useEffect(() => {
        const getToken = async () => {
            try {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (!enabled) {
                    Alert.alert('Разрешение на уведомления не получено');
                    return;
                }

                const fcmToken = await messaging().getToken();
                console.log('📲 FCM Token:', fcmToken);
            } catch (error) {
                console.error('❌ Ошибка при получении FCM токена:', error);
            }
        };

        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            getToken();
        }

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('🟢 [Foreground] Уведомление получено:', remoteMessage);
        });

        return unsubscribe;
    }, []);

    return <WebViewScreen />;
}