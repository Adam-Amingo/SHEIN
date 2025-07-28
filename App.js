// import 'react-native-reanimated';

// import React, { useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from 'react-native-toast-message';


// import HomeScreen from "./screens/HomeScreen";
// import CategoryScreen from "./screens/CategoryScreen";
// import TrendsScreen from "./screens/TrendsScreen";
// import CartScreen from "./screens/CartScreen";
// import MeScreen from "./screens/MeScreen";
// import LoginScreen from "./screens/LoginScreen";
// import SignupScreen from "./screens/SignupScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
// import WishlistScreen from "./screens/WishlistScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
// import AboutScreen from './screens/AboutScreen';
// import HelpCenterScreen from './screens/HelpCenterScreen';
// import ContactSupportScreen from './screens/ContactSupportScreen';
// import InviteFriendsScreen from './screens/InviteFriendsScreen';
// import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
// import LocationAndCurrencyScreen from './screens/LocationAndCurrencyScreen';
// import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import ChangePasswordScreen from './screens/ChangePasswordScreen';
// import ManageAddressesScreen from './screens/ManageAddressesScreen';
// import ProductDetailsScreen from "./screens/ProductDetailsScreen";
// import CheckoutScreen from "./screens/CheckoutScreen";
// import SplashScreen from './screens/SplashScreen';
// import OnboardingScreen from './screens/OnboardingScreen';
// import FullImageScreen from './screens/FullImageScreen';
// import OTPScreen from './screens/OtpScreen';
// import MobileMoneyPaymentScreen from './screens/MobileMoneyPaymentScreen';
// import CardPaymentScreen from './screens/CardPaymentScreen';
// import BiometricAuthScreen from './screens/BiometricAuthScreen';
// import { AddressProvider } from './context/AddressContext';

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
//         tabBarInactiveTintColor: "#000",
//         // tabBarShowLabel: false,
//         // tabBarItemStyle: {
//         //   backgroundColor: "transparent",
//         // },
//         // tabBarStyle: {
//         //   backgroundColor: "#fff",
//         //   borderTopWidth: 0,
//         //   elevation: 0,
//         // },
//         // Remove the default press/ripple effect

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


// import { ThemeProvider } from './ThemeContext';
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import SuccessScreen from "./screens/SuccessScreen";
// import PaymentScreen from "./screens/PaymentScreen";
// import { NotificationProvider } from "./context/NotificationContext";
// export default function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(true);

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

//   // Show OnboardingScreen after SplashScreen
//   if (showOnboarding) {
//     return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
//   }
//   return (
//     <CartProvider>
//       <AddressProvider>
//         <NotificationProvider>
//           <WishlistProvider>
//             <ThemeProvider>
//               <NavigationContainer>
//                 <Stack.Navigator screenOptions={{
//                   headerShown: false,
//                   animation: 'slide_from_right', // or 'fade', etc.
//                   cardStyleInterpolator: ({ current, layouts }) => ({
//                     cardStyle: {
//                       transform: [
//                         {
//                           translateX: current.progress.interpolate({
//                             inputRange: [0, 1],
//                             outputRange: [layouts.screen.width, 0],
//                           }),
//                         },
//                       ],
//                     },
//                   }),
//                 }}>
//                   <Stack.Screen name="MainTabs" component={MainTabs} />
//                   <Stack.Screen name="Wishlist" component={WishlistScreen} />
//                   <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ title: 'Terms & Conditions' }} />
//                   <Stack.Screen name="About" component={AboutScreen} />
//                   <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ title: 'Help Center' }} />
//                   <Stack.Screen name="ContactSupport" component={ContactSupportScreen} options={{ title: 'Contact Support' }} />
//                   <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} options={{ title: 'Invite Friends' }} />
//                   <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ title: 'Privacy Settings' }} />
//                   <Stack.Screen name="LocationAndCurrency" component={LocationAndCurrencyScreen} options={{ title: 'Location & Currency' }} />
//                   <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: 'Payment Methods' }} />
//                   <Stack.Screen name="Notification" component={NotificationScreen} />
//                   <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
//                   <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
//                   <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} options={{ title: 'Manage Addresses' }} />
//                   <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
//                   <Stack.Screen name="Checkout" component={CheckoutScreen} />
//                   <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
//                   <Stack.Screen name="MobileMoneyPaymentScreen" component={MobileMoneyPaymentScreen} />
//                   <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
//                   <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: 'OTP Verification' }} />
//                   <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Order Success' }} />
//                   <Stack.Screen name="FullImageScreen" component={FullImageScreen} options={{ headerShown: false }} />



//                   {/* <Stack.Screen name="Login" component={LoginScreen} /> */}


//                   <Stack.Screen name="Login">
//                     {(props) => (
//                       <LoginScreen
//                         {...props}
//                         onLogin={() => setIsAuthenticated(true)}
//                       />
//                     )}
//                   </Stack.Screen>

//                   <Stack.Screen name="Welcome">
//                     {(props) => (
//                       <WelcomeScreen
//                         {...props}
//                         setIsAuthenticated={setIsAuthenticated}
//                       />
//                     )}
//                   </Stack.Screen>

//                   {/* 

//                   <Stack.Screen name="Signup" component={SignupScreen} />
//                   <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
//                 </Stack.Navigator>
//               </NavigationContainer>
//             </ThemeProvider>
//           </WishlistProvider>
//         </NotificationProvider>
//       </AddressProvider>
//     </CartProvider>
//   );
// }
//////////////////////////////////////////////////////////
////////////////////////////////////////////////////
/////////////////////////  LANGUAGE CONFIGURATION /////////////////////////


// import './src/config/i18n';
// import 'react-native-reanimated';
// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";
// import * as LocalAuthentication from 'expo-local-authentication';

// // Screens
// import HomeScreen from "./screens/HomeScreen";
// import CategoryScreen from "./screens/CategoryScreen";
// import TrendsScreen from "./screens/TrendsScreen";
// import CartScreen from "./screens/CartScreen";
// import MeScreen from "./screens/MeScreen";
// import LoginScreen from "./screens/LoginScreen";
// import SignupScreen from "./screens/SignupScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
// import WishlistScreen from "./screens/WishlistScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
// import AboutScreen from './screens/AboutScreen';
// import HelpCenterScreen from './screens/HelpCenterScreen';
// import ContactSupportScreen from './screens/ContactSupportScreen';
// import InviteFriendsScreen from './screens/InviteFriendsScreen';
// import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
// import LocationAndCurrencyScreen from './screens/LocationAndCurrencyScreen';
// import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import ChangePasswordScreen from './screens/ChangePasswordScreen';
// import ManageAddressesScreen from './screens/ManageAddressesScreen';
// import ProductDetailsScreen from "./screens/ProductDetailsScreen";
// import CheckoutScreen from "./screens/CheckoutScreen";
// import SplashScreen from './screens/SplashScreen';
// import OnboardingScreen from './screens/OnboardingScreen';
// import FullImageScreen from './screens/FullImageScreen';
// import MobileMoneyPaymentScreen from './screens/MobileMoneyPaymentScreen';
// import CardPaymentScreen from './screens/CardPaymentScreen';
// import SuccessScreen from "./screens/SuccessScreen";
// import OTPScreen from './screens/OtpScreen';
// import PaymentScreen from "./screens/PaymentScreen";

// // Contexts
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { NotificationProvider } from "./context/NotificationContext";
// import { AddressProvider } from './context/AddressContext';
// import { ThemeProvider } from './ThemeContext';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './src/config/i18n';

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
//         tabBarInactiveTintColor: "#000",
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
//   const [showSplash, setShowSplash] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkedBiometrics, setCheckedBiometrics] = useState(false);

//   useEffect(() => {
//     const checkBiometrics = async () => {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled = await LocalAuthentication.isEnrolledAsync();

//       if (compatible && enrolled) {
//         const result = await LocalAuthentication.authenticateAsync({
//           promptMessage: "Authenticate with biometrics",
//           fallbackLabel: "Enter password",
//         });
//         if (result.success) {
//           setIsAuthenticated(true);
//         }
//       }
//       setCheckedBiometrics(true);
//     };

//     if (!showSplash && !showOnboarding) {
//       checkBiometrics();
//     }
//   }, [showSplash, showOnboarding]);

//   if (!checkedBiometrics && !showSplash && !showOnboarding) {
//     // Optionally show a loader here
//     return null;
//   }

//   return (
//     <I18nextProvider i18n={i18n}>
//       <CartProvider>
//         <AddressProvider>
//           <NotificationProvider>
//             <WishlistProvider>
//               <ThemeProvider>
//                 <NavigationContainer>
//                   <Stack.Navigator screenOptions={{ headerShown: false }}>
//                     {showSplash ? (
//                       <Stack.Screen name="Splash">
//                         {(props) => (
//                           <SplashScreen {...props} onFinish={() => setShowSplash(false)} />
//                         )}
//                       </Stack.Screen>
//                     ) : showOnboarding ? (
//                       <Stack.Screen name="Onboarding">
//                         {(props) => (
//                           <OnboardingScreen {...props} onFinish={() => setShowOnboarding(false)} />
//                         )}
//                       </Stack.Screen>
//                     ) : isAuthenticated ? (
//                       <>
//                         <Stack.Screen name="MainTabs" component={MainTabs} />
//                         <Stack.Screen name="Wishlist" component={WishlistScreen} />
//                         <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
//                         <Stack.Screen name="About" component={AboutScreen} />
//                         <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
//                         <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
//                         <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
//                         <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
//                         <Stack.Screen name="LocationAndCurrency" component={LocationAndCurrencyScreen} />
//                         <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
//                         <Stack.Screen name="Notification" component={NotificationScreen} />
//                         <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//                         <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
//                         <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
//                         <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
//                         <Stack.Screen name="Checkout" component={CheckoutScreen} />
//                         <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
//                         <Stack.Screen name="MobileMoneyPaymentScreen" component={MobileMoneyPaymentScreen} />
//                         <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
//                         <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
//                         <Stack.Screen name="OTPScreen" component={OTPScreen} />
//                         <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
//                       </>
//                     ) : (
//                       <>
//                         <Stack.Screen name="Login">
//                           {(props) => (
//                             <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />
//                           )}
//                         </Stack.Screen>
//                         <Stack.Screen name="Signup" component={SignupScreen} />
//                         <Stack.Screen name="Welcome">
//                           {(props) => (
//                             <WelcomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
//                           )}
//                         </Stack.Screen>
//                       </>
//                     )}
//                   </Stack.Navigator>
//                 </NavigationContainer>
//               </ThemeProvider>
//             </WishlistProvider>
//           </NotificationProvider>
//         </AddressProvider>
//       </CartProvider>
//     </I18nextProvider>
//   );
// }


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////////////// LANGUAGE CONFIGURATION  2/////////////////////////

import './src/config/i18n';
import 'react-native-reanimated';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from 'expo-local-authentication';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/config/i18n';

// Screens
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
import SuccessScreen from "./screens/SuccessScreen";
import OTPScreen from './screens/OtpScreen';
import PaymentScreen from "./screens/PaymentScreen";

// Contexts
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AddressProvider } from './context/AddressContext';
import { ThemeProvider } from './ThemeContext';
import MainTabs from './src/navigation/Maintabs';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           const icons = {
//             Home: focused ? "home" : "home-outline",
//             Category: focused ? "list" : "list-outline",
//             Trends: focused ? "trending-up" : "trending-up-outline",
//             Cart: focused ? "cart" : "cart-outline",
//             Me: focused ? "person" : "person-outline",
//           };
//           return <Ionicons name={icons[route.name]} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#7f00ff",
//         tabBarInactiveTintColor: "#000",
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

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkedBiometrics, setCheckedBiometrics] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (compatible && enrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with biometrics",
          fallbackLabel: "Enter password",
        });

        if (result.success) {
          setIsAuthenticated(true);
        }
      }

      setCheckedBiometrics(true);
    };

    if (!showSplash && !showOnboarding) {
      checkBiometrics();
    }
  }, [showSplash, showOnboarding]);

  if (!checkedBiometrics && !showSplash && !showOnboarding) {
    return null; // You can render a loading screen here if needed
  }

  return (
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <AddressProvider>
          <NotificationProvider>
            <WishlistProvider>
              <ThemeProvider>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {showSplash ? (
                      <Stack.Screen name="Splash">
                        {(props) => (
                          <SplashScreen {...props} onFinish={() => setShowSplash(false)} />
                        )}
                      </Stack.Screen>
                    ) : showOnboarding ? (
                      <Stack.Screen name="Onboarding">
                        {(props) => (
                          <OnboardingScreen {...props} onFinish={() => setShowOnboarding(false)} />
                        )}
                      </Stack.Screen>
                    ) : isAuthenticated ? (
                      <>
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                        <Stack.Screen name="Wishlist" component={WishlistScreen} />
                        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
                        <Stack.Screen name="About" component={AboutScreen} />
                        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
                        <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
                        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
                        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
                        <Stack.Screen name="LocationAndCurrency" component={LocationAndCurrencyScreen} />
                        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
                        <Stack.Screen name="Notification" component={NotificationScreen} />
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                        <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
                        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                        <Stack.Screen name="Checkout" component={CheckoutScreen} />
                        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                        <Stack.Screen name="MobileMoneyPaymentScreen" component={MobileMoneyPaymentScreen} />
                        <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
                        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
                        <Stack.Screen name="OTPScreen" component={OTPScreen} />
                        <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
                      </>
                    ) : (
                      <>
                        <Stack.Screen name="Login">
                          {(props) => (
                            <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />
                          )}
                        </Stack.Screen>
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="Welcome">
                          {(props) => (
                            <WelcomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
                          )}
                        </Stack.Screen>
                      </>
                    )}
                  </Stack.Navigator>
                </NavigationContainer>
              </ThemeProvider>
            </WishlistProvider>
          </NotificationProvider>
        </AddressProvider>
      </CartProvider>
    </I18nextProvider>
  );
}









/////////////////////////////////////////////////////
//////////////////////////////////////////////////////


// import './src/config/i18n';
// import 'react-native-reanimated';
// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";
// import * as LocalAuthentication from 'expo-local-authentication';

// // Screens
// import HomeScreen from "./screens/HomeScreen";
// import CategoryScreen from "./screens/CategoryScreen";
// import TrendsScreen from "./screens/TrendsScreen";
// import CartScreen from "./screens/CartScreen";
// import MeScreen from "./screens/MeScreen";
// import LoginScreen from "./screens/LoginScreen";
// import SignupScreen from "./screens/SignupScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
// import WishlistScreen from "./screens/WishlistScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
// import AboutScreen from './screens/AboutScreen';
// import HelpCenterScreen from './screens/HelpCenterScreen';
// import ContactSupportScreen from './screens/ContactSupportScreen';
// import InviteFriendsScreen from './screens/InviteFriendsScreen';
// import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
// import LocationAndCurrencyScreen from './screens/LocationAndCurrencyScreen';
// import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import ChangePasswordScreen from './screens/ChangePasswordScreen';
// import ManageAddressesScreen from './screens/ManageAddressesScreen';
// import ProductDetailsScreen from "./screens/ProductDetailsScreen";
// import CheckoutScreen from "./screens/CheckoutScreen";
// import SplashScreen from './screens/SplashScreen';
// import OnboardingScreen from './screens/OnboardingScreen';
// import FullImageScreen from './screens/FullImageScreen';
// import MobileMoneyPaymentScreen from './screens/MobileMoneyPaymentScreen';
// import CardPaymentScreen from './screens/CardPaymentScreen';
// import SuccessScreen from "./screens/SuccessScreen";
// import OTPScreen from './screens/OtpScreen';
// import PaymentScreen from "./screens/PaymentScreen";

// // Contexts
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { NotificationProvider } from "./context/NotificationContext";
// import { AddressProvider } from './context/AddressContext';
// import { ThemeProvider } from './ThemeContext';
// import './src/config/i18n'; // Correct path to your i18n config
// import { I18nextProvider } from 'react-i18next';
// import i18n from './src/config/i18n';

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
//         tabBarInactiveTintColor: "#000",
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
//   const [showSplash, setShowSplash] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkedBiometrics, setCheckedBiometrics] = useState(false);

//   useEffect(() => {
//     const checkBiometrics = async () => {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled = await LocalAuthentication.isEnrolledAsync();

//       if (compatible && enrolled) {
//         const result = await LocalAuthentication.authenticateAsync({
//           promptMessage: "Authenticate with biometrics",
//           fallbackLabel: "Enter password",
//         });
//         if (result.success) {
//           setIsAuthenticated(true);
//         }
//       }
//       setCheckedBiometrics(true);
//     };

//     if (!showSplash && !showOnboarding) {
//       checkBiometrics();
//     }
//   }, [showSplash, showOnboarding]);

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

//   if (showOnboarding) {
//     return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
//   }

//   if (!checkedBiometrics) {
//     // You can show a loading spinner here if you want
//     return null;
//   }

//   return (
//     <I18nextProvider i18n={i18n}>
//       <CartProvider>
//         <AddressProvider>
//           <NotificationProvider>
//             <WishlistProvider>
//               <ThemeProvider>
//                 <NavigationContainer>
//                   {isAuthenticated ? (
//                     <Stack.Navigator screenOptions={{ headerShown: false }}>
//                       <Stack.Screen name="MainTabs" component={MainTabs} />
//                       <Stack.Screen name="Wishlist" component={WishlistScreen} />
//                       <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
//                       <Stack.Screen name="About" component={AboutScreen} />
//                       <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
//                       <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
//                       <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
//                       <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
//                       <Stack.Screen name="LocationAndCurrency" component={LocationAndCurrencyScreen} />
//                       <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
//                       <Stack.Screen name="Notification" component={NotificationScreen} />
//                       <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//                       <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
//                       <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
//                       <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
//                       <Stack.Screen name="Checkout" component={CheckoutScreen} />
//                       <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
//                       <Stack.Screen name="MobileMoneyPaymentScreen" component={MobileMoneyPaymentScreen} />
//                       <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
//                       <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
//                       <Stack.Screen name="OTPScreen" component={OTPScreen} />
//                       <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
//                     </Stack.Navigator>
//                   ) : (
//                     <Stack.Navigator screenOptions={{ headerShown: false }}>
//                       <Stack.Screen name="Login">
//                         {(props) => (
//                           <LoginScreen
//                             {...props}
//                             onLogin={() => setIsAuthenticated(true)}
//                           />
//                         )}
//                       </Stack.Screen>
//                       <Stack.Screen name="Signup" component={SignupScreen} />
//                       <Stack.Screen name="Welcome">
//                         {(props) => (
//                           <WelcomeScreen
//                             {...props}
//                             setIsAuthenticated={setIsAuthenticated}
//                           />
//                         )}
//                       </Stack.Screen>
//                     </Stack.Navigator>
//                   )}
//                 </NavigationContainer>
//               </ThemeProvider>
//             </WishlistProvider>
//           </NotificationProvider>
//         </AddressProvider>
//       </CartProvider>
//     </I18nextProvider>
//   );
// }



///////////////////////////////////////////////
/////////////////////////////////////////////







// import 'react-native-reanimated';
// import React, { useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";

// // Screens
// import HomeScreen from "./screens/HomeScreen";
// import CategoryScreen from "./screens/CategoryScreen";
// import TrendsScreen from "./screens/TrendsScreen";
// import CartScreen from "./screens/CartScreen";
// import MeScreen from "./screens/MeScreen";
// import LoginScreen from "./screens/LoginScreen";
// import SignupScreen from "./screens/SignupScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
// import WishlistScreen from "./screens/WishlistScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
// import AboutScreen from './screens/AboutScreen';
// import HelpCenterScreen from './screens/HelpCenterScreen';
// import ContactSupportScreen from './screens/ContactSupportScreen';
// import InviteFriendsScreen from './screens/InviteFriendsScreen';
// import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
// import LocationAndCurrencyScreen from './screens/LocationAndCurrencyScreen';
// import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import ChangePasswordScreen from './screens/ChangePasswordScreen';
// import ManageAddressesScreen from './screens/ManageAddressesScreen';
// import ProductDetailsScreen from "./screens/ProductDetailsScreen";
// import CheckoutScreen from "./screens/CheckoutScreen";
// import SplashScreen from './screens/SplashScreen';
// import OnboardingScreen from './screens/OnboardingScreen';
// import FullImageScreen from './screens/FullImageScreen';
// import MobileMoneyPaymentScreen from './screens/MobileMoneyPaymentScreen';
// import CardPaymentScreen from './screens/CardPaymentScreen';
// import SuccessScreen from "./screens/SuccessScreen";
// import OTPScreen from './screens/OtpScreen';
// import BiometricAuthScreen from './screens/BiometricAuthScreen';
// import PaymentScreen from "./screens/PaymentScreen";

// // Contexts
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { NotificationProvider } from "./context/NotificationContext";
// import { AddressProvider } from './context/AddressContext';
// import { ThemeProvider } from './ThemeContext';

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
//         tabBarInactiveTintColor: "#000",
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
//   const [showSplash, setShowSplash] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // 👈 track login state

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

//   if (showOnboarding) {
//     return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
//   }

//   return (
//     <CartProvider>
//       <AddressProvider>
//         <NotificationProvider>
//           <WishlistProvider>
//             <ThemeProvider>
//               <NavigationContainer>
//                 {isAuthenticated ? (
//                   <Stack.Navigator screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name="MainTabs" component={MainTabs} />
//                     <Stack.Screen name="Wishlist" component={WishlistScreen} />
//                     <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
//                     <Stack.Screen name="About" component={AboutScreen} />
//                     <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
//                     <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
//                     <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
//                     <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
//                     <Stack.Screen name="LocationAndCurrency" component={LocationAndCurrencyScreen} />
//                     <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
//                     <Stack.Screen name="Notification" component={NotificationScreen} />
//                     <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//                     <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
//                     <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
//                     <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
//                     <Stack.Screen name="Checkout" component={CheckoutScreen} />
//                     <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
//                     <Stack.Screen name="MobileMoneyPaymentScreen" component={MobileMoneyPaymentScreen} />
//                     <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} />
//                     <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
//                     <Stack.Screen name="BiometricAuthScreen" component={BiometricAuthScreen} />
//                     <Stack.Screen name="OTPScreen" component={OTPScreen} />
//                     <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//                     <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
//                   </Stack.Navigator>
//                 ) : (
//                   <Stack.Navigator screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name="Login">
//                       {(props) => (
//                         <LoginScreen
//                           {...props}
//                           onLogin={() => setIsAuthenticated(true)}
//                         />
//                       )}
//                     </Stack.Screen>
//                     <Stack.Screen name="Signup" component={SignupScreen} />
//                     <Stack.Screen name="Welcome">
//                       {(props) => (
//                         <WelcomeScreen
//                           {...props}
//                           setIsAuthenticated={setIsAuthenticated}
//                         />
//                       )}
//                     </Stack.Screen>
//                   </Stack.Navigator>
//                 )}
//               </NavigationContainer>
//             </ThemeProvider>
//           </WishlistProvider>
//         </NotificationProvider>
//       </AddressProvider>
//     </CartProvider>
//   );
// }


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

