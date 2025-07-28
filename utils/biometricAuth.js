import * as LocalAuthentication from 'expo-local-authentication';

export const authenticateUser = async () => {
    try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const supported = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !supported) {
            return { success: false, message: 'Biometric authentication not available.' };
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            fallbackLabel: 'Enter Passcode',
            disableDeviceFallback: false,
        });

        return result;
    } catch (error) {
        console.log('Biometric Error:', error);
        return { success: false, message: 'Authentication failed.' };
    }
};
