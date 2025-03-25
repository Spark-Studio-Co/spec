import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import WebViewScreen from './app/index';

export default function App() {
    useEffect(() => {
        const getToken = async () => {
            try {
                // 🔐 Запрашиваем разрешение на уведомления
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (!enabled) {
                    Alert.alert('Разрешение на уведомления не получено');
                    return;
                }

                // ✅ Получаем FCM токен
                const fcmToken = await messaging().getToken();
                console.log('📲 FCM Token:', fcmToken);

                // 📦 Тут можешь отправить токен на сервер или в БД
            } catch (error) {
                console.error('❌ Ошибка при получении FCM токена:', error);
            }
        };

        // Только на физических устройствах
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            getToken();
        }
    }, []);

    return <WebViewScreen />;
}