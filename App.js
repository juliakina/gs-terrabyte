import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider } from './src/context/UserContext';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DrawerRoutes from './src/routes/drawer.routes';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />

                    <Stack.Screen
                        name="Register"
                        component={Register}
                    />

                    <Stack.Screen
                        name="Drawer"
                        component={DrawerRoutes}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}