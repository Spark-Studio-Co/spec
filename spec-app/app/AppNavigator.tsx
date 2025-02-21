import { createStackNavigator } from "@react-navigation/stack";
import { WebViewScreen } from "./WebViewScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            animation: "none",
            headerShown: false,
        }}>
            <Stack.Screen name="WebView" component={WebViewScreen} />
        </Stack.Navigator>
    );
};