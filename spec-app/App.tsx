import messaging from '@react-native-firebase/messaging';
import uuid from 'react-native-uuid';
import notifee from '@notifee/react-native';
import { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import WebViewScreen from './app/index';
import axios from 'axios';

interface CreateFcmDto {
    temporaryKey: string;
    fcmToken: string;
}

const createFcm = async (dto: CreateFcmDto) => {
    try {
        const { temporaryKey, fcmToken } = dto;
        const response = await axios.post('https://spec-backend-production.up.railway.app/api/fcm', { temporaryKey, fcmToken });
        return response.data;
    } catch (error) {
        console.error('❌ Ошибка при создании FCM:', error);
        throw error;
    }
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📥 [Background] Уведомление получено:', remoteMessage);
    await displayNotification(remoteMessage);
});

async function displayNotification(remoteMessage: any) {
    await notifee.requestPermission();

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
    // Use a ref to track if token has been sent in this session
    const tokenSentRef = useRef(false);
    
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

                // Only send token if it hasn't been sent in this session
                if (!tokenSentRef.current) {
                    const fcmToken = await messaging().getToken();
                    console.log('📲 FCM Token:', fcmToken);
                    
                    // Send the token
                    await createFcm({ temporaryKey: uuid.v4(), fcmToken });
                    
                    // Mark as sent for this session
                    tokenSentRef.current = true;
                    console.log('✅ FCM Token sent to server');
                } else {
                    console.log('ℹ️ FCM Token already sent in this session');
                }
                
                // Set up token refresh listener - only triggers when token actually changes
                // This ensures we only send when needed in the future
                messaging().onTokenRefresh(async newToken => {
                    console.log('🔄 FCM Token refreshed:', newToken);
                    await createFcm({ temporaryKey: uuid.v4(), fcmToken: newToken });
                });
            } catch (error) {
                console.error('❌ Ошибка при получении FCM токена:', error);
            }
        };

        if (Platform.OS === 'android') {
            getToken();
        }

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('🟢 [Foreground] Уведомление получено:', remoteMessage);
            await displayNotification(remoteMessage);
        });

        return unsubscribe;
    }, []);

    return <WebViewScreen />;
}