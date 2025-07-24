// screens/MobileMoneyPaymentScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert, // For showing user messages
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { initiateMobileMoneyPayment } from "../api"; // Import the new API function
import { useTheme } from "../ThemeContext"; // Assuming you have a ThemeContext
import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext for user email

const mobileNetworks = [
  {
    name: "MTN Mobile Money",
    value: "MTN",
    icon: "phone-portrait-outline",
    color: "#FFCC00",
  },
  {
    name: "Telecel Cash",
    value: "TELECEL",
    icon: "phone-portrait-outline",
    color: "#E60000",
  }, // Assuming 'TELECEL' as internal name
  // {
  //   name: "Vodafone Cash",
  //   value: "VODAFONE",
  //   icon: "phone-portrait-outline",
  //   color: "#C00000",
  // }, // Keep Vodafone for clarity if Telecel is separate
  // // Add other networks if supported by Paystack
];

export default function MobileMoneyPaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { darkTheme } = useTheme();
  const { authState } = useAuth(); // Get authenticated user's email

  // Get order details from route params
  const { orderId, amount, customerEmail } = route.params;

  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState("");

  useEffect(() => {
    // You might want to pre-fill customerEmail if it's available from authState
    // if (!customerEmail && authState.user && authState.user.email) {
    //   setCustomerEmail(authState.user.email);
    // }
  }, [authState.user, customerEmail]);

  const handleInitiatePayment = async () => {
    if (!selectedNetwork) {
      Alert.alert("Error", "Please select a mobile money network.");
      return;
    }
    if (!mobileNumber.trim()) {
      Alert.alert("Error", "Please enter your mobile money number.");
      return;
    }
    if (!orderId || !amount || !customerEmail) {
      Alert.alert(
        "Error",
        "Missing order details. Please go back and try again."
      );
      return;
    }

    setIsLoading(true);
    setPaymentStatusMessage("");

    try {
      const paymentDetails = {
        orderId: orderId,
        amount: amount,
        customerEmail: customerEmail,
        mobileNumber: mobileNumber.trim(),
        mobileNetwork: selectedNetwork,
      };

      console.log("Initiating payment with details:", paymentDetails);

      const response = await initiateMobileMoneyPayment(paymentDetails);

      if (response.success) {
        // Use response.displayText if available, otherwise fallback to generic message
        const userMessage =
          response.displayText ||
          response.message ||
          "Payment initiated successfully. Please approve on your phone.";
        setPaymentStatusMessage(userMessage);

        Alert.alert("Payment Initiated", userMessage, [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("SuccessScreen", {
                orderId: orderId,
                message: "Payment initiated. Awaiting confirmation.",
              }),
          },
        ]);
      } else {
        setPaymentStatusMessage(
          response.message || "Payment initiation failed."
        );
        Alert.alert(
          "Payment Failed",
          response.message || "Could not initiate payment. Please try again."
        );
      }
    } catch (error) {
      console.error("Error in handleInitiatePayment:", error);
      setPaymentStatusMessage(
        "An unexpected error occurred. Please try again."
      );
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = [styles.container, darkTheme && styles.darkContainer];
  const textStyle = [styles.text, darkTheme && styles.darkText];
  const inputStyle = [styles.input, darkTheme && styles.darkInput];
  const buttonStyle = [styles.button, darkTheme && styles.darkButton];
  const buttonTextStyle = [
    styles.buttonText,
    darkTheme && styles.darkButtonText,
  ];
  const networkOptionStyle = (value) => [
    styles.networkOption,
    darkTheme && styles.darkNetworkOption,
    selectedNetwork === value && styles.networkOptionSelected,
    selectedNetwork === value && darkTheme && styles.darkNetworkOptionSelected,
  ];
  const networkOptionTextStyle = (value) => [
    styles.networkOptionText,
    darkTheme && styles.darkText,
    selectedNetwork === value && styles.networkOptionTextSelected,
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={containerStyle}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon
              name="arrow-back"
              size={24}
              color={darkTheme ? "#fff" : "#333"}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkTheme && styles.darkText]}>
            Mobile Money Payment
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.amountText, darkTheme && styles.darkText]}>
            Amount: GHS {parseFloat(amount).toFixed(2)}
          </Text>
          <Text style={[styles.label, darkTheme && styles.darkText]}>
            Select Mobile Network:
          </Text>
          <View style={styles.networkOptionsContainer}>
            {mobileNetworks.map((network) => (
              <TouchableOpacity
                key={network.value}
                style={networkOptionStyle(network.value)}
                onPress={() => setSelectedNetwork(network.value)}
              >
                <Icon
                  name={network.icon}
                  size={24}
                  color={
                    selectedNetwork === network.value ? "#fff" : network.color
                  }
                />
                <Text style={networkOptionTextStyle(network.value)}>
                  {network.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, darkTheme && styles.darkText]}>
            Mobile Money Number:
          </Text>
          <TextInput
            style={inputStyle}
            placeholder="e.g., 05XXXXXXXX"
            placeholderTextColor={darkTheme ? "#aaa" : "#888"}
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />

          {paymentStatusMessage ? (
            <Text
              style={[
                styles.statusMessage,
                {
                  color: paymentStatusMessage.includes("failed")
                    ? "red"
                    : "green",
                },
              ]}
            >
              {paymentStatusMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            style={buttonStyle}
            onPress={handleInitiatePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={buttonTextStyle}>Pay Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  darkText: {
    color: "#eee",
  },
  networkOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    flexWrap: "wrap", // Allow networks to wrap if many
  },
  networkOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: "45%", // Adjust for two columns
    marginBottom: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkNetworkOption: {
    backgroundColor: "#444",
    borderColor: "#555",
  },
  networkOptionSelected: {
    backgroundColor: "#7f00ff",
    borderColor: "#7f00ff",
  },
  darkNetworkOptionSelected: {
    backgroundColor: "#6a00cc",
    borderColor: "#6a00cc",
  },
  networkOptionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  networkOptionTextSelected: {
    color: "#fff",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  darkInput: {
    backgroundColor: "#444",
    color: "#fff",
    borderColor: "#555",
  },
  button: {
    backgroundColor: "#7f00ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  darkButton: {
    backgroundColor: "#6a00cc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  darkButtonText: {
    color: "#fff",
  },
  statusMessage: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
