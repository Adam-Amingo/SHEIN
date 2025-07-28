
// import React, { useState, useContext, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert } from "react-native";
// import { CartContext } from "../context/CartContext";
// import { AddressContext } from '../context/AddressContext';


// const PaymentScreen = ({ navigation, route }) => {
//     const [selectedMethod, setSelectedMethod] = useState(null);
//     const [address, setAddress] = useState("");
//     const { clearCart } = useContext(CartContext);
//     const { selectedAddress } = useContext(AddressContext);
//     useEffect(() => {
//         if (selectedAddress) {
//             setAddress(selectedAddress.address);
//         }
//     }, [selectedAddress]);

//     // Get total from route params or fallback to 0
//     const totalAmount = route.params?.totalAmount || 0;

//     const handleProceed = () => {
//         if (!selectedMethod || !address) {
//             Alert.alert("Missing Info", "Please select a payment method and enter your address.");
//             return;
//         }

//         if (selectedMethod === "momo") {
//             navigation.navigate("MobileMoneyPaymentScreen", { totalAmount, address });
//         } else if (selectedMethod === "card") {
//             navigation.navigate("CardPaymentScreen", { totalAmount, address });
//         } else {
//             Alert.alert("Payment", "Unknown payment method selected.");
//         }
//     };

//     // Clear cart items after payment
//     // clearCart();
//     // Alert.alert("Success", "Payment successful!");
//     // navigation.navigate("SuccessScreen");
//     // };

//     return (
//         <SafeAreaView style={styles.container}>
//             <Text style={styles.header}>Select Payment Method</Text>
//             <TouchableOpacity
//                 style={[
//                     styles.methodButton,
//                     selectedMethod === "momo" && styles.selected
//                 ]}
//                 onPress={() => setSelectedMethod("momo")}
//             >
//                 <Text style={styles.methodText}>
//                     {selectedMethod === "momo" ? "✓ " : ""}Mobile Money
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[
//                     styles.methodButton,
//                     selectedMethod === "card" && styles.selected
//                 ]}
//                 onPress={() => setSelectedMethod("card")}
//             >
//                 <Text style={styles.methodText}>
//                     {selectedMethod === "card" ? "✓ " : ""}Debit/Credit Card
//                 </Text>
//             </TouchableOpacity>

//             <Text style={[styles.header, { marginTop: 30 }]}>Delivery Address</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter your address"
//                 value={address}
//                 onChangeText={setAddress}
//                 multiline
//             />

//             <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
//                 Total: <Text style={{ color: "#7f00ff", fontWeight: "bold" }}>GHS {totalAmount.toFixed(2)}</Text>
//             </Text>

//             <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
//                 <Text style={styles.proceedText}>Confirm and Pay</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default PaymentScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         paddingTop: 40,
//         backgroundColor: "#fff",
//     },
//     header: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginBottom: 12,
//     },
//     methodButton: {
//         padding: 16,
//         borderWidth: 1,
//         borderColor: "#aaa",
//         borderRadius: 10,
//         marginBottom: 12,
//     },
//     selected: {
//         backgroundColor: "#7f00ff20",
//         borderColor: "#7f00ff",
//     },
//     methodText: {
//         fontSize: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 10,
//         padding: 12,
//         height: 100,
//         textAlignVertical: "top",
//     },
//     proceedButton: {
//         backgroundColor: "#7f00ff",
//         padding: 16,
//         borderRadius: 10,
//         marginTop: 30,
//         alignItems: "center",
//     },
//     proceedText: {
//         color: "#fff",
//         fontWeight: "bold",
//         fontSize: 16,
//     },
// });


import React, { useState, useContext, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Alert,
    Animated,
} from "react-native";

import { CartContext } from "../context/CartContext";
import { AddressContext } from "../context/AddressContext";

const PaymentScreen = ({ navigation, route }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [address, setAddress] = useState("");

    const { clearCart } = useContext(CartContext);
    const { selectedAddress } = useContext(AddressContext);

    const totalAmount = route.params?.totalAmount || 0;

    // Animation refs
    const methodAnim = useRef(new Animated.Value(30)).current;
    const addressAnim = useRef(new Animated.Value(30)).current;
    const finalAnim = useRef(new Animated.Value(30)).current;

    const methodOpacity = useRef(new Animated.Value(0)).current;
    const addressOpacity = useRef(new Animated.Value(0)).current;
    const finalOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (selectedAddress) {
            setAddress(selectedAddress.address);
        }

        // Animate sections with stagger
        Animated.stagger(200, [
            Animated.parallel([
                Animated.timing(methodAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(methodOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(addressAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(addressOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(finalAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(finalOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const { order } = route.params;

    console.log("Order ID:", order.id);

    // Use it to trigger notification, order tracking, etc.


    const handleProceed = () => {
        if (!selectedMethod || !address) {
            Alert.alert("Missing Info", "Please select a payment method and enter your address.");
            return;
        }

        if (selectedMethod === "momo") {
            navigation.navigate("MobileMoneyPaymentScreen", { totalAmount, address });
        } else if (selectedMethod === "card") {
            navigation.navigate("CardPaymentScreen", { totalAmount, address });
        } else {
            Alert.alert("Payment", "Unknown payment method selected.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Select Payment Method</Text>

            <Animated.View
                style={{
                    transform: [{ translateY: methodAnim }],
                    opacity: methodOpacity,
                }}
            >
                <TouchableOpacity
                    style={[
                        styles.methodButton,
                        selectedMethod === "momo" && styles.selected,
                    ]}
                    onPress={() => setSelectedMethod("momo")}
                >
                    <Text style={styles.methodText}>
                        {selectedMethod === "momo" ? "✓ " : ""}Mobile Money
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.methodButton,
                        selectedMethod === "card" && styles.selected,
                    ]}
                    onPress={() => setSelectedMethod("card")}
                >
                    <Text style={styles.methodText}>
                        {selectedMethod === "card" ? "✓ " : ""}Debit/Credit Card
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <Text style={[styles.header, { marginTop: 30 }]}>Delivery Address</Text>

            <Animated.View
                style={{
                    transform: [{ translateY: addressAnim }],
                    opacity: addressOpacity,
                }}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                />
            </Animated.View>

            <Animated.View
                style={{
                    transform: [{ translateY: finalAnim }],
                    opacity: finalOpacity,
                }}
            >
                <Text style={styles.totalText}>
                    Total:{""}
                    <Text style={styles.totalAmount}>GHS {order.total.toFixed(2)}</Text>
                </Text>

                <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                    <Text style={styles.proceedText}>Confirm and Pay</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    methodButton: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 10,
        marginBottom: 12,
    },
    selected: {
        backgroundColor: "#7f00ff20",
        borderColor: "#7f00ff",
    },
    methodText: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        height: 100,
        textAlignVertical: "top",
    },
    totalText: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    totalAmount: {
        color: "#7f00ff",
        fontWeight: "bold",
    },
    proceedButton: {
        backgroundColor: "#7f00ff",
        padding: 16,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    proceedText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
