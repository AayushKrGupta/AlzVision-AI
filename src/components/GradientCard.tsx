import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

interface GradientCardProps {
    children: React.ReactNode;
    className?: string;
    colors?: [string, string, ...string[]];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
}

export const GradientCard: React.FC<GradientCardProps> = ({
    children,
    className,
    colors = ["#ffffff", "#f8f9fa"],
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
}) => {
    return (
        <View
            className={`rounded-3xl overflow-hidden shadow-sm border border-white/50 ${className}`}
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.05,
                shadowRadius: 12,
                elevation: 4,
            }}
        >
            <LinearGradient colors={colors} start={start} end={end} style={{ padding: 20 }}>
                {children}
            </LinearGradient>
        </View>
    );
};

export const GlassCard: React.FC<GradientCardProps> = ({
    children,
    className,
}) => {
    return (
        <View
            className={`rounded-3xl overflow-hidden border border-white/20 ${className}`}
        >
            <BlurView intensity={20} tint="light" style={{ padding: 20 }}>
                {children}
            </BlurView>
        </View>
    )
}
