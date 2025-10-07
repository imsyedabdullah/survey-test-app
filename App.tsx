import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import { AppProvider } from "@/context/AppContext";
import HomeScreen from "@/screens/HomeScreen";
import "./global.css"
import { RootStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<AppProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          			<Stack.Screen name="Home" component={HomeScreen} options={{ headerBackVisible: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppProvider>
	);
}
