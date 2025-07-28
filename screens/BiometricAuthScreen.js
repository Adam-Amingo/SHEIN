// // import React, { useEffect } from 'react';
// // import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// // import { authenticateUser } from '../utils/biometricAuth';

// // const BiometricAuthScreen = ({ navigation }) => {
// //   useEffect(() => {
// //     (async () => {
// //       const result = await authenticateUser();

// //       if (result.success) {
// //         navigation.replace('MainTabs');  // Your main app tabs screen name
// //       } else {
// //         Alert.alert('Authentication Failed', result.message);
// //       }
// //     })();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.text}>Authenticating...</Text>
// //       <ActivityIndicator size="large" color="#7f00ff" />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   text: { fontSize: 18, marginBottom: 20, color: '#7f00ff' },
// // });

// // export default BiometricAuthScreen;

// ////////////////////////////////////////////
// ///////////////////////////////////////////////////


// // screens/BiometricAuthScreen.js
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import * as LocalAuthentication from 'expo-local-authentication';

// const BiometricAuthScreen = ({ navigation }) => {
//     useEffect(() => {
//         const authenticate = async () => {
//             const hasHardware = await LocalAuthentication.hasHardwareAsync();
//             const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
//             const enrolled = await LocalAuthentication.isEnrolledAsync();

//             if (!hasHardware || !supported.length || !enrolled) {
//                 navigation.replace('Login');
//                 return;
//             }

//             const result = await LocalAuthentication.authenticateAsync({
//                 promptMessage: 'Login with Biometrics',
//                 fallbackLabel: 'Use Passcode',
//                 cancelLabel: 'Cancel',
//             });

//             if (result.success) {
//                 navigation.replace('Login'); // ✅ Redirect to Login which triggers `onLogin`
//             } else {
//                 Alert.alert('Authentication failed', 'Redirecting to Login screen');
//                 navigation.replace('Login');
//             }
//         };

//         authenticate();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Authenticating...</Text>
//             <ActivityIndicator size="large" color="#7f00ff" />
//         </View>
//     );
// };

// export default BiometricAuthScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     title: {
//         marginBottom: 20,
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });



import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

const BiometricAuthScreen = ({ navigation, route }) => {
    const { onSuccess } = route.params;

    const handleBiometricAuth = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Biometrics',
                fallbackLabel: 'Enter Password',
                cancelLabel: 'Cancel',
            });

            if (result.success) {
                onSuccess(); // Go to MainTabs
            }
        }
    };

    useEffect(() => {
        handleBiometricAuth();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <Image
                source={require('../assets/logo.png')} // Replace with your own logo
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Biometric Login</Text>
            <Text style={styles.subtitle}>
                Use your fingerprint or face to login securely.
            </Text>

            <TouchableOpacity onPress={handleBiometricAuth} style={styles.button}>
                <Ionicons name="finger-print" size={30} color="#fff" />
                <Text style={styles.buttonText}>Authenticate</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.skip}
                onPress={() => navigation.replace('Login')}
            >
                <Text style={styles.skipText}>Use password instead</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BiometricAuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 160,
        height: 80,
        marginBottom: 40,
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 10,
    },
    subtitle: {
        color: '#aaa',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#7f00ff',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
        gap: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    skip: {
        marginTop: 20,
    },
    skipText: {
        color: '#aaa',
        textDecorationLine: 'underline',
    },
});

