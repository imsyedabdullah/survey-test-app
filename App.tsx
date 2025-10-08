import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import { AppProvider } from "@/context/AppContext";
import MainLayout from "@/layouts/MainLayout";
import "./global.css"
import { RootStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<AppProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Main" component={MainLayout} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppProvider>
	);
}
