import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';

import Home from '../screens/Home';
import Account from '../screens/Account';
import Terrain from '../screens/Terrain';
import Planting from '../screens/Planting';
import Soil from '../screens/Soil';
import Pesticide from '../screens/Pesticide';
import CompatibilityAnalysis from '../screens/CompatibilityAnalysis';


const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.drawerActive,
                drawerInactiveTintColor: colors.drawerInactive,
                drawerActiveBackgroundColor: colors.background,
                drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: '600',
                },
                drawerStyle: {
                    backgroundColor: colors.white,
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerLabel: 'Início',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Account"
                component={Account}
                options={{
                    drawerLabel: 'Minha Conta',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Terrain"
                component={Terrain}
                options={{
                    drawerLabel: 'Terrenos',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="map-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Planting"
                component={Planting}
                options={{
                    drawerLabel: 'Plantios',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="leaf-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Soil"
                component={Soil}
                options={{
                    drawerLabel: 'Solos',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="earth-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Pesticide"
                component={Pesticide}
                options={{
                    drawerLabel: 'Defensivos',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="shield-checkmark-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="CompatibilityAnalysis"
                component={CompatibilityAnalysis}
                options={{
                    drawerLabel: 'Análise de Compatibilidade',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="analytics-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}