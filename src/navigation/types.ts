export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    Upload: undefined;
    Analysis: { imageUri: string };
    Result: { result: "CN" | "EMCI" | "LMCI" | "AD"; confidence: number; imageUri: string };
};
