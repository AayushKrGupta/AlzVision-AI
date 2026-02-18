import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    rightElement?: React.ReactNode;
    transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = true,
    rightElement,
    transparent = false,
}) => {
    const navigation = useNavigation();

    return (
        <View
            className={`flex-row items-center justify-between px-4 py-2 z-50 ${transparent ? "absolute top-0 left-0 right-0" : "bg-gray-50/80"
                }`}
            style={{ paddingTop: transparent ? 60 : 10 }} // Adjust for safe area if needed, though SafeAreaView handles it usually
        >
            <View className="flex-1 items-start">
                {showBack && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="p-2 rounded-full bg-white/50"
                    >
                        <ChevronLeft size={24} color="#007AFF" />
                    </TouchableOpacity>
                )}
            </View>
            <View className="flex-2 items-center">
                {title && (
                    <Text className="text-lg font-semibold text-gray-900">{title}</Text>
                )}
            </View>
            <View className="flex-1 items-end">{rightElement}</View>
        </View>
    );
};
