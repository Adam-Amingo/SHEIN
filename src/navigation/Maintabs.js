// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useTranslation } from 'react-i18next';

// import HomeScreen from '../../screens/HomeScreen';
// import CategoryScreen from '../../screens/CategoryScreen';
// import TrendsScreen from '../../screens/TrendsScreen';
// import CartScreen from '../../screens/CartScreen';
// import MeScreen from '../../screens/MeScreen';


// const Tab = createBottomTabNavigator();

// export default function MainTabs() {
//     const { t } = useTranslation();

//     return (
//         <Tab.Navigator
//             initialRouteName="Home"
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarIcon: ({ focused, color, size }) => {
//                     const icons = {
//                         Home: focused ? 'home' : 'home-outline',
//                         Category: focused ? 'list' : 'list-outline',
//                         Trends: focused ? 'trending-up' : 'trending-up-outline',
//                         Cart: focused ? 'cart' : 'cart-outline',
//                         Me: focused ? 'person' : 'person-outline',
//                     };
//                     return <Ionicons name={icons[route.name]} size={size} color={color} />;
//                 },
//                 tabBarActiveTintColor: '#7f00ff',
//                 tabBarInactiveTintColor: '#000',
//                 tabBarLabel: t(`bottomNav.${route.name}`), // Use translation key
//             })}
//         >
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="Category" component={CategoryScreen} />
//             <Tab.Screen name="Trends" component={TrendsScreen} />
//             <Tab.Screen name="Cart" component={CartScreen} />
//             <Tab.Screen name="Me" component={MeScreen} />
//         </Tab.Navigator>
//     );
// }



import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../../screens/HomeScreen';
import CategoryScreen from '../../screens/CategoryScreen';
import TrendsScreen from '../../screens/TrendsScreen';
import CartScreen from '../../screens/CartScreen';
import MeScreen from '../../screens/MeScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const { t } = useTranslation();

    const getIcon = (name, focused) => {
        const icons = {
            Home: focused ? 'home' : 'home-outline',
            Category: focused ? 'list' : 'list-outline',
            Trends: focused ? 'trending-up' : 'trending-up-outline',
            Cart: focused ? 'cart' : 'cart-outline',
            Me: focused ? 'person' : 'person-outline',
        };
        return icons[name];
    };

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={getIcon(route.name, focused)} size={size} color={color} />
                ),
                tabBarActiveTintColor: '#7f00ff',
                tabBarInactiveTintColor: '#000',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: t('bottomNav.Home') }}
            />
            <Tab.Screen
                name="Category"
                component={CategoryScreen}
                options={{ tabBarLabel: t('bottomNav.Category') }}
            />
            <Tab.Screen
                name="Trends"
                component={TrendsScreen}
                options={{ tabBarLabel: t('bottomNav.Trends') }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{ tabBarLabel: t('bottomNav.Cart') }}
            />
            <Tab.Screen
                name="Me"
                component={MeScreen}
                options={{ tabBarLabel: t('bottomNav.Me') }}
            />
        </Tab.Navigator>
    );
}
