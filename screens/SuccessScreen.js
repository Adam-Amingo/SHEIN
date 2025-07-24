import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { CartContext } from "../context/CartContext"; // No longer needed if not clearing cart here
import { useTheme } from "../ThemeContext"; // Assuming you have a ThemeContext

export default function SuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // const { clearCart } = useContext(CartContext); // No longer need to get clearCart if not using it
  const { darkTheme } = useTheme();

  const { orderId, message } = route.params || {}; // Get orderId and message from route params

  useEffect(() => {
    // --- REMOVED: The clearCart() call has been removed from here. ---
    // The cart should only be cleared after payment is successfully confirmed by the backend (via webhook).
    // This screen now solely focuses on informing the user about payment initiation.
    console.log(
      "SuccessScreen loaded. Cart clearing logic removed from this screen."
    );
  }, []); // Empty dependency array, still runs once on mount, but no cart clearing

  const containerStyle = [styles.container, darkTheme && styles.darkContainer];
  const textStyle = [styles.text, darkTheme && styles.darkText];

  return (
    <View style={containerStyle}>
      <Icon
        name="checkmark-circle-outline"
        size={100}
        color="#4CAF50"
        style={styles.icon}
      />
      <Text style={styles.title}>Payment Initiated Successfully!</Text>
      {orderId && <Text style={textStyle}>Order ID: {orderId}</Text>}
      {message && <Text style={textStyle}>{message}</Text>}
      <Text style={styles.infoText}>
        Please check your mobile phone to approve the transaction.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.popToTop()} // Go back to the main tab screen (e.g., Home)
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 5,
  },
  darkText: {
    color: "#eee",
  },
  infoText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#7f00ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
