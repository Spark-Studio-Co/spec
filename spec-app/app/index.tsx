import { WebView } from 'react-native-webview';
import { StyleSheet, StatusBar, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getFCMToken } from '../firebase';

export default function WebViewScreen() {
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    
    useEffect(() => {
        // Get FCM token for web app
        const getToken = async () => {
            const token = await getFCMToken();
            if (token) {
                setFcmToken(token);
            }
        };
        
        getToken();
    }, []);
    
    // JavaScript to inject into WebView to pass the FCM token
    const injectJavaScript = `
        window.ReactNativeWebView.onMessage = function(data) {
            // Handle messages from the web app if needed
            console.log('Message from web app:', data);
        };
        
        // Store FCM token in localStorage for the web app to use
        if (${fcmToken ? `'${fcmToken}'` : 'null'}) {
            localStorage.setItem('fcmToken', '${fcmToken}');
            console.log('FCM token stored in localStorage');
            
            // Notify the web app that the token is available
            if (window.notifyFCMTokenAvailable) {
                window.notifyFCMTokenAvailable('${fcmToken}');
            }
        }
        true;
    `;
    
    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                source={{ uri: 'https://kazonline.kz' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                sharedCookiesEnabled={true}
                thirdPartyCookiesEnabled={true}
                cacheEnabled={true}
                injectedJavaScript={injectJavaScript}
                onMessage={(event) => {
                    console.log('Message from WebView:', event.nativeEvent.data);
                    // Handle messages from the web app
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    webview: {
        flex: 1,
    },
});
