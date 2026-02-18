export type RootStackParamList = {
    Splash: undefined;
    Main: undefined; // This contains the TabNavigator
    Result: { result: string; confidence: number; imageUri: string }; // Kept generic for now
    Analysis: { imageUri: string };
};

export type TabParamList = {
    Home: undefined;
    Scan: undefined;
    History: undefined;
    Insights: undefined;
    Account: undefined;
};
