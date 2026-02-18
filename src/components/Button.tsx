import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface ButtonProps {
    title: string;
    onPress?: () => void;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    icon?: React.ReactNode;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = "primary",
    className,
    icon,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.96);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const getVariantStyle = () => {
        switch (variant) {
            case "secondary":
                return "bg-gray-200";
            case "outline":
                return "border border-blue-500 bg-transparent";
            default:
                return "bg-blue-500 shadow-lg shadow-blue-500/30";
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case "secondary":
                return "text-gray-900";
            case "outline":
                return "text-blue-500";
            default:
                return "text-white";
        }
    };

    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={animatedStyle}
            className={`py-4 px-6 rounded-2xl flex-row items-center justify-center ${getVariantStyle()} ${className}`}
            activeOpacity={0.9}
        >
            {icon && <React.Fragment>{icon}</React.Fragment>}
            <Text
                className={`text-base font-semibold text-center ${getTextStyle()} ${icon ? "ml-2" : ""}`}
            >
                {title}
            </Text>
        </AnimatedTouchableOpacity>
    );
};
