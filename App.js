import { enableScreens } from "react-native-screens";
enableScreens();
import "react-native-reanimated";

import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import all your screens
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
import TermsAndConditionsScreen from "./screens/TermsAndConditionsScreen";
import AboutScreen from "./screens/AboutScreen";
import HelpCenterScreen from "./screens/HelpCenterScreen";
import ContactSupportScreen from "./screens/ContactSupportScreen";
import InviteFriendsScreen from "./screens/InviteFriendsScreen";
import PrivacySettingsScreen from "./screens/PrivacySettingsScreen";
import LocationAndCurrencyScreen from "./screens/LocationAndCurrencyScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ManageAddressesScreen from "./screens/ManageAddressesScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import FullImageScreen from "./screens/FullImageScreen";
import MobileMoneyPaymentScreen from "./screens/MobileMoneyPaymentScreen";
import CardPaymentScreen from "./screens/CardPaymentScreen";
import SuccessScreen from "./screens/SuccessScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SearchScreen from "./screens/SearchScreen";

// Import Context Providers
import { AddressProvider } from "./context/AddressContext";
import { ThemeProvider } from "./ThemeContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// MainTabs component (remains largely the same)
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

// Authentication Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Main Application Stack (screens accessible after login)
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
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
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{ title: "Terms & Conditions" }}
      />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{ title: "Help Center" }}
      />
      <Stack.Screen
        name="ContactSupport"
        component={ContactSupportScreen}
        options={{ title: "Contact Support" }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriendsScreen}
        options={{ title: "Invite Friends" }}
      />
      <Stack.Screen
        name="PrivacySettings"
        component={PrivacySettingsScreen}
        options={{ title: "Privacy Settings" }}
      />
      <Stack.Screen
        name="LocationAndCurrency"
        component={LocationAndCurrencyScreen}
        options={{ title: "Location & Currency" }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: "Payment Methods" }}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Change Password" }}
      />
      <Stack.Screen
        name="ManageAddresses"
        component={ManageAddressesScreen}
        options={{ title: "Manage Addresses" }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />
      <Stack.Screen
        name="MobileMoneyPaymentScreen"
        component={MobileMoneyPaymentScreen}
      />
      <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ title: "Payment Success", headerShown: false }} // Often hide header for success screens
      />
      <Stack.Screen
        name="FullImageScreen"
        component={FullImageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Nested component to encapsulate logic that uses AuthContext
function MainAppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { authState, checkAuthStatus } = useAuth(); // useAuth is now called within AuthProvider's scope

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem("hasOnboarded");
        if (onboardingStatus === "true") {
          setHasOnboarded(true);
        }
        await checkAuthStatus();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    };
    prepareApp();
  }, [checkAuthStatus]);

  const onOnboardingFinish = useCallback(async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    setHasOnboarded(true);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!hasOnboarded) {
    return <OnboardingScreen onFinish={onOnboardingFinish} />;
  }

  return (
    <NavigationContainer>
      {authState.isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AddressProvider>
          <NotificationProvider>
            <WishlistProvider>
              <ThemeProvider>
                {/* Render the new nested component here */}
                <MainAppContent />
              </ThemeProvider>
            </WishlistProvider>
          </NotificationProvider>
        </AddressProvider>
      </CartProvider>
    </AuthProvider>
  );
}
