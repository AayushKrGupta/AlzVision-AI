import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
    FadeIn,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Brain } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "Splash">;

export const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000 });
        scale.value = withSpring(1, { damping: 10, stiffness: 100 });

        const timeout = setTimeout(() => {
            // Exit animation could be added here
            navigation.replace("Home");
        }, 2500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center">
            <LinearGradient
                colors={["#E5F1FF", "#FFFFFF"]}
                style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Animated.View style={animatedStyle} className="items-center">
                <View className="bg-white p-6 rounded-3xl shadow-xl shadow-blue-200 mb-6">
                    <Brain size={80} color="#007AFF" strokeWidth={1.5} />
                </View>
                <Text className="text-3xl font-bold text-gray-900 tracking-tight">
                    NeuroScan AI
                </Text>
                <Text className="text-gray-500 mt-2 text-lg tracking-wide">
                    Advanced Alzheimer's Detection
                </Text>
            </Animated.View>
        </View>
    );
};
