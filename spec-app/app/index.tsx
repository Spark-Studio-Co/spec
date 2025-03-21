
import { WebView } from 'react-native-webview';


import { StyleSheet, StatusBar, View } from 'react-native';
import Constants from 'expo-constants';






export default function WebViewScreen() {


    return (
        <View style={styles.container}>
            <WebView
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


        marginTop: Constants.statusBarHeight,


    },


});