
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';

// Define styles before they're used
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default function WebViewScreen() {
    const [temporaryKey, setTemporaryKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [keySetConfirmed, setKeySetConfirmed] = useState(false);
    const webViewRef = useRef<WebView>(null);

    useEffect(() => {
        const getTemporaryKey = async () => {
            try {
                const key = await AsyncStorage.getItem('temporaryKey');
                if (key) {
                    setTemporaryKey(key);
                    console.log('🔑 Retrieved temporaryKey for WebView:', key);
                } else {
                    console.warn('⚠️ No temporaryKey found in AsyncStorage');
                }
            } catch (error) {
                console.error('❌ Error retrieving temporaryKey:', error);
            } finally {
                // Even if there's no key, we should still load the WebView
                setIsLoading(false);
            }
        };

        getTemporaryKey();
    }, []);

    const escapeForJS = (value: string) =>
        value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

    const safeKey: string = escapeForJS(temporaryKey || '');

    const injectedJavaScript = `
  (function() {
    try {
      localStorage.setItem('temporaryKey', '${safeKey}');
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'KEY_SET',
        success: true,
        key: '${safeKey}'
      }));
    } catch (e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'KEY_SET',
        success: false,
        error: e.message
      }));
    }
  })();
  true;
`;

    // Handle messages from WebView
    const handleMessage = (event: any) => {
        console.log('📩 WebView says:', event.nativeEvent.data);
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log('📩 Message from WebView:', data);

            if (data.type === 'KEY_SET' && data.success) {
                setKeySetConfirmed(true);
                console.log('✅ temporaryKey successfully set in WebView localStorage');
            } else if (data.type === 'KEY_SET' && !data.success) {
                console.error('❌ Failed to set temporaryKey in WebView:', data.error);
            }
        } catch (error) {
            console.log('📩 Raw message from WebView:', event.nativeEvent.data);
        }
    };

    const verifyKeyIsSet = () => {
        if (!keySetConfirmed && temporaryKey && webViewRef.current) {
            console.log('🔄 Verifying temporaryKey is set in localStorage...');
            webViewRef.current.injectJavaScript(`
                (function() {
                    const storedKey = localStorage.getItem('temporaryKey');
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'KEY_VERIFICATION',
                        keyExists: !!storedKey,
                        storedKey: storedKey
                    }));
                    if (!storedKey) {
                        localStorage.setItem('temporaryKey', '${safeKey}');
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'KEY_SET',
                            success: true,
                            key: '${safeKey}'
                        }));
                    }
                })();
                true;
            `);
        }
    };

    return (
        <View style={styles.container}>
            {
                !isLoading && temporaryKey &&
                <WebView
                    ref={webViewRef}
                    source={{ uri: 'https://kazonline.kz' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    sharedCookiesEnabled={true}
                    thirdPartyCookiesEnabled={true}
                    cacheEnabled={true}
                    injectedJavaScript={injectedJavaScript}
                    onMessage={handleMessage}
                    onLoadEnd={() => {
                        setTimeout(verifyKeyIsSet, 1000);
                    }}
                />}
        </View>
    );
}


