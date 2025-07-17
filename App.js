import 'react-native-reanimated';

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";


import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import TrendsScreen from "./screens/TrendsScreen";
import CartScreen from "./screens/CartScreen";
import MeScreen from "./screens/MeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import WishlistScreen from "./screens/WishlistScreen";
import NotificationScreen from "./screens/NotificationScreen";
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import AboutScreen from './screens/AboutScreen';
import HelpCenterScreen from './screens/HelpCenterScreen';
import ContactSupportScreen from './screens/ContactSupportScreen';
import InviteFriendsScreen from './screens/InviteFriendsScreen';
import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
import LocationAndCurrencyScreen from './screens/LocationAndCurrencyScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ManageAddressesScreen from './screens/ManageAddressesScreen';
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import FullImageScreen from './screens/FullImageScreen';
import MobileMoneyPaymentScreen from './screens/MobileMoneyPaymentScreen';
import CardPaymentScreen from './screens/CardPaymentScreen';
import { AddressProvider } from './context/AddressContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Category":
              iconName = focused ? "list" : "list-outline";
              break;
            case "Trends":
              iconName = focused ? "trending-up" : "trending-up-outline";
              break;
            case "Cart":
              iconName = focused ? "cart" : "cart-outline";
              break;
            case "Me":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7f00ff",
        tabBarInactiveTintColor: "#000",
        // tabBarShowLabel: false,
        // tabBarItemStyle: {
        //   backgroundColor: "transparent",
        // },
        // tabBarStyle: {
        //   backgroundColor: "#fff",
        //   borderTopWidth: 0,
        //   elevation: 0,
        // },
        // Remove the default press/ripple effect

      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Trends" component={TrendsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
}


import { ThemeProvider } from './ThemeContext';
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import SuccessScreen from "./screens/SuccessScreen";
import PaymentScreen from "./screens/PaymentScreen";
import { NotificationProvider } from "./context/NotificationContext";
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Show OnboardingScreen after SplashScreen
  if (showOnboarding) {
    return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
  }
  return (
    <CartProvider>
      <AddressProvider>
        <NotificationProvider>
          <WishlistProvider>
            <ThemeProvider>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right', // or 'fade', etc.
                  cardStyleInterpolator: ({ current, layouts }) => ({
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  }),
                }}>
                  <Stack.Screen name="MainTabs" component={MainTabs} />
                  <Stack.Screen name="Wishlist" component={WishlistScreen} />
                  <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ title: 'Terms & Conditions' }} />
                  <Stack.Screen name="About" component={AboutScreen} />
                  <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ title: 'Help Center' }} />
                  <Stack.Screen name="ContactSupport" component={ContactSupportScreen} options={{ title: 'Contact Support' }} />
                  <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} options={{ title: 'Invite Friends' }} />
                  <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ title: 'Privacy Settings' }} />
                  <Stack.Screen name="LocationAndCurrency" component={LocationAndCurrencyScreen} options={{ title: 'Location & Currency' }} />
                  <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: 'Payment Methods' }} />
                  <Stack.Screen name="Notification" component={NotificationScreen} />
                  <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
                  <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
                  <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} options={{ title: 'Manage Addresses' }} />
                  <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                  <Stack.Screen name="Checkout" component={CheckoutScreen} />
                  <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
                  <Stack.Screen name="MobileMoneyPaymentScreen" component={MobileMoneyPaymentScreen} />
                  <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
                  <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Order Success' }} />
                  <Stack.Screen name="FullImageScreen" component={FullImageScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="Welcome" component={WelcomeScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </WishlistProvider>
        </NotificationProvider>
      </AddressProvider>
    </CartProvider>
  );
}
















// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";

// import HomeScreen from "./screens/HomeScreen";
// import CategoryScreen from "./screens/CategoryScreen";
// import TrendsScreen from "./screens/TrendsScreen";
// import CartScreen from "./screens/CartScreen";
// import MeScreen from "./screens/MeScreen";
// import WishlistScreen from "./screens/WishlistScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import ProductDetailsScreen from "./screens/ProductDetailsScreen";

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           switch (route.name) {
//             case "Home":
//               iconName = focused ? "home" : "home-outline";
//               break;
//             case "Category":
//               iconName = focused ? "list" : "list-outline";
//               break;
//             case "Trends":
//               iconName = focused ? "trending-up" : "trending-up-outline";
//               break;
//             case "Cart":
//               iconName = focused ? "cart" : "cart-outline";
//               break;
//             case "Me":
//               iconName = focused ? "person" : "person-outline";
//               break;
//             default:
//               iconName = "ellipse";
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#7f00ff",
//         tabBarInactiveTintColor: "#7F55B1",
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Category" component={CategoryScreen} />
//       <Tab.Screen name="Trends" component={TrendsScreen} />
//       <Tab.Screen name="Cart" component={CartScreen} />
//       <Tab.Screen name="Me" component={MeScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="MainTabs" component={MainTabs} />
//         <Stack.Screen name="Wishlist" component={WishlistScreen} />
//         <Stack.Screen name="Notification" component={NotificationScreen} />

//         <Stack.Screen name="MainTabs" component={MainTabs} />
//         <Stack.Screen name="Wishlist" component={WishlistScreen} />
//         <Stack.Screen name="Notification" component={NotificationScreen} />
//         <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ animation: 'slide_from_right' }} />

//         <Stack.Screen name="Login">
//           {(props) => (
//             <LoginScreen
//               {...props}
//               onLogin={() => setIsAuthenticated(true)}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="Welcome">
//           {(props) => (
//             <WelcomeScreen
//               {...props}
//               setIsAuthenticated={setIsAuthenticated}
//             />
//           )}
//         </Stack.Screen>

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
