import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { SplashScreen } from '../screens/SplashScreen';
import { ResultScreen } from '../screens/ResultScreen';
// import AnalysisScreen from '../screens/AnalysisScreen'; // keeping existing imports for reference if needed later

export type RootStackParamList = {
    Splash: undefined;
    Main: undefined;
    Result: undefined;
    Analysis: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
                <Stack.Screen name="Main" component={TabNavigator} />
                {/* Add other screens that should be pushed on top of tabs here */}
                <Stack.Screen name="Result" component={ResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
