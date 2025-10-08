import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

export type TabKey =
  | "dashboard"
  | "myforms"
  | "create"
  | "publicforms"
  | "settings";
  
export type Navigation = NativeStackNavigationProp<RootStackParamList>;
