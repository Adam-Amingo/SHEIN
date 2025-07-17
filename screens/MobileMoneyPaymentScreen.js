import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';

const MobileMoneyPaymentScreen = ({ route, navigation }) => {
    const { totalAmount, address } = route.params;
    const [network, setNetwork] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        if (!network || !phoneNumber) {
            Alert.alert("Missing Info", "Please select a network and enter your mobile number.");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            Alert.alert("Invalid Number", "Mobile number must be 10 digits.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert("Success", `Payment initiated on ${network} for GHS ${totalAmount.toFixed(2)}.`);
            navigation.navigate("SuccessScreen");
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pay with Mobile Money</Text>

            <Text style={styles.label}>Select Network</Text>
            <View style={styles.networkContainer}>
                {["MTN", "Vodafone", "AirtelTigo"].map(net => (
                    <TouchableOpacity
                        key={net}
                        style={[styles.networkButton, network === net && styles.selectedNetwork]}
                        onPress={() => setNetwork(net)}
                    >
                        <Text style={{ color: network === net ? "#fff" : "#000" }}>{net}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number"
                keyboardType="numeric"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <Text style={{ fontSize: 18, marginVertical: 20 }}>
                Amount: <Text style={{ color: "#7f00ff", fontWeight: "bold" }}>GHS {totalAmount.toFixed(2)}</Text>
            </Text>

            <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.payText}>Pay Now</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 8 },
    networkContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    networkButton: {
        borderWidth: 1,
        borderColor: '#7f00ff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    selectedNetwork: {
        backgroundColor: '#7f00ff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
    },
    payButton: {
        backgroundColor: '#7f00ff',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    payText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MobileMoneyPaymentScreen;
