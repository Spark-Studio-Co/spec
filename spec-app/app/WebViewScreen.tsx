import React from "react";
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";


export const WebViewScreen = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: "https://spec-six.vercel.app/" }}
                javaScriptEnabled={true}
                startInLoadingState={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});