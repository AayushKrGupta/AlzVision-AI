import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from "../screens/SplashScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { UploadScreen } from "../screens/UploadScreen";
import { AnalysisScreen } from "../screens/AnalysisScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { RootStackParamList } from "./types";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS, // iOS style smooth transitions
                    cardStyle: { backgroundColor: "white" },
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Upload" component={UploadScreen} options={{ presentation: 'modal' }} />
                <Stack.Screen name="Analysis" component={AnalysisScreen} />
                <Stack.Screen name="Result" component={ResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
