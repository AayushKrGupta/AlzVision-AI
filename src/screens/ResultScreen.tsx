import React from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CheckCircle, AlertTriangle, Home, Info } from "lucide-react-native";
import Animated, { FadeInUp, FadeInDown, useSharedValue, withTiming, useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { Button } from "../components/Button";
import { RootStackParamList } from "../navigation/types";
import { GradientCard } from "../components/GradientCard";

type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;
type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, "Result">;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ score, color }: { score: number; color: string }) => {
    const radius = 60;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = useSharedValue(0);

    React.useEffect(() => {
        progress.value = withTiming(score / 100, { duration: 1500 });
    }, [score]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progress.value),
    }));

    return (
        <View className="items-center justify-center">
            <Svg width={140} height={140} viewBox="0 0 140 140">
                <Circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#E5E5EA"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <AnimatedCircle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="70, 70"
                    animatedProps={animatedProps}
                />
            </Svg>
            <View className="absolute items-center justify-center">
                <Text className="text-3xl font-bold text-gray-900">{score}%</Text>
                <Text className="text-xs text-gray-500">Confidence</Text>
            </View>
        </View>
    );
};

export const ResultScreen = () => {
    const navigation = useNavigation<ResultScreenNavigationProp>();
    const route = useRoute<ResultScreenRouteProp>();
    const { result, confidence } = route.params;

    const getResultData = () => {
        switch (result) {
            case "Non_Demented":
                return {
                    title: "Non Demented",
                    color: "#34C759", // Green
                    description: "No signs of dementia detected. Brain structure appears normal.",
                    recommendations: [
                        "Maintain a healthy diet",
                        "Regular physical exercise",
                        "Routine check-ups every year"
                    ]
                };
            case "Very_Mild_Demented":
                return {
                    title: "Very Mild Demented",
                    color: "#FFCC00", // Yellow/Warning
                    description: "Very preliminary signs detected. Early intervention is highly effective.",
                    recommendations: [
                        "Consult a neurologist",
                        "Cognitive training exercises",
                        "Monitor lifestyle factors"
                    ]
                };
            case "Mild_Demented":
                return {
                    title: "Mild Demented",
                    color: "#FF9500", // Orange
                    description: "Mild cognitive decline observed. Medical evaluation is recommended.",
                    recommendations: [
                        "Detailed cognitive assessment",
                        "Discuss treatment options",
                        "Review current medications"
                    ]
                };
            case "Moderate_Demented":
                return {
                    title: "Moderate Demented",
                    color: "#FF3B30", // Red
                    description: "Moderate signs of dementia. Immediate medical attention advised.",
                    recommendations: [
                        "Urgent medical intervention",
                        "Caregiver support planning",
                        "Long-term care strategy"
                    ]
                };
            default:
                // Handle legacy or unknown
                return {
                    // @ts-ignore
                    title: result?.replace(/_/g, ' ') || "Unknown",
                    color: "#8E8E93",
                    description: "Analysis completed.",
                    recommendations: ["Consult a doctor for interpretation"]
                };
        }
    };

    const data = getResultData();

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />
            <SafeAreaView className="flex-1">
                <ScrollView className="flex-1 px-6 pt-4">
                    <Animated.View entering={FadeInUp.duration(600)} className="items-center mb-8">
                        <Text className="text-gray-500 font-medium mb-1">Analysis Result</Text>
                        <Text className="text-2xl font-bold text-gray-900 text-center">{data.title}</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).springify()} className="items-center mb-10">
                        <CircularProgress score={confidence} color={data.color} />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).springify()}>
                        <GradientCard className="mb-6 bg-white">
                            <View className="flex-row items-start mb-4">
                                <Info size={24} color={data.color} />
                                <View className="ml-3 flex-1">
                                    <Text className="text-lg font-bold text-gray-900 mb-1">Summary</Text>
                                    <Text className="text-gray-600 leading-relaxed">{data.description}</Text>
                                </View>
                            </View>
                        </GradientCard>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).springify()} className="mb-8">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Recommendations</Text>
                        {data.recommendations.map((rec, index) => (
                            <View key={index} className="flex-row items-center mb-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <CheckCircle size={20} color="#34C759" />
                                <Text className="ml-3 text-gray-700 font-medium">{rec}</Text>
                            </View>
                        ))}
                    </Animated.View>

                </ScrollView>
                <View className="p-6 bg-white border-t border-gray-100">
                    <Button title="Back to Home" onPress={() => navigation.navigate("Main")} variant="primary" />
                </View>
            </SafeAreaView>
        </View>
    );
};
