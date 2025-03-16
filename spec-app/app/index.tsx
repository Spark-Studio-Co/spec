import { WebView } from 'react-native-webview';
import { StyleSheet, StatusBar, View } from 'react-native';

export default function WebViewScreen() {
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
