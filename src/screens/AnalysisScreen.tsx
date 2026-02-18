import React, { useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type AnalysisScreenRouteProp = RouteProp<RootStackParamList, "Analysis">;
type AnalysisScreenNavigationProp = StackNavigationProp<RootStackParamList, "Analysis">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const AnalysisScreen = () => {
    const navigation = useNavigation<AnalysisScreenNavigationProp>();
    const route = useRoute<AnalysisScreenRouteProp>();
    const { imageUri } = route.params;

    const translateY = useSharedValue(0);

    useEffect(() => {
        const scanHeight = SCREEN_HEIGHT * 0.6;
        translateY.value = withRepeat(
            withSequence(
                withTiming(scanHeight, { duration: 1500, easing: Easing.linear }),
                withTiming(0, { duration: 1500, easing: Easing.linear })
            ),
            -1,
            true
        );

        const timeout = setTimeout(() => {
            const results: { result: "CN" | "EMCI" | "LMCI" | "AD"; confidence: number }[] = [
                { result: "CN", confidence: 98 },
                { result: "EMCI", confidence: 85 },
                { result: "LMCI", confidence: 92 },
                { result: "AD", confidence: 95 }
            ];
            const randomResult = results[Math.floor(Math.random() * results.length)];

            navigation.replace("Result", {
                result: randomResult.result,
                confidence: randomResult.confidence,
                imageUri
            });
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <View className="flex-1 bg-black">
            <StatusBar style="light" />
            <SafeAreaView className="flex-1">
                <View className="flex-1 relative">
                    <Image
                        source={{ uri: imageUri }}
                        className="absolute w-full h-full opacity-60"
                        resizeMode="cover"
                    />

                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.8)']}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />

                    <View className="flex-1 overflow-hidden">
                        <Animated.View style={[{ height: 4, backgroundColor: '#007AFF', shadowColor: '#007AFF', shadowOpacity: 1, shadowRadius: 20 }, animatedStyle]} />
                    </View>

                    <View className="absolute bottom-20 left-0 right-0 items-center">
                        <Text className="text-white text-2xl font-bold mb-2">Analyzing Scan...</Text>
                        <Text className="text-gray-400">Detecting biomarkers and anomalies</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};
