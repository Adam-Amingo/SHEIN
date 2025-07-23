import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Linking, // Import Linking for opening URLs
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { initiateMobileMoneyPayment } from "../api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../ThemeContext";

export default function MobileMoneyPaymentScreen({ route, navigation }) {
  const { authState } = useAuth();
  const { darkTheme } = useTheme();

  const {
    orderId,
    amount,
    customerEmail,
    selectedPaymentMethod,
    mobileNumber,
    customerMobileNetwork,
  } = route.params;

  const [loading, setLoading] = useState(false);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState(
    "Initiating mobile money payment..."
  );
  const [showRetry, setShowRetry] = useState(false);

  const handleInitiatePayment = async () => {
    setLoading(true);
    setPaymentStatusMessage("Initiating mobile money payment...");
    setShowRetry(false); // Reset retry on new attempt

    const paymentDetails = {
      orderId: orderId,
      amount: amount,
      customerEmail: customerEmail,
      mobileNumber: mobileNumber,
      mobileNetwork: customerMobileNetwork, // This is "MTN", "VODAFONE" from frontend
      paymentMethod: selectedPaymentMethod, // This is "MTN_MOBILE_MONEY", "TELECEL_MONEY"
    };

    console.log("Initiating payment with details:", paymentDetails);

    try {
      const response = await initiateMobileMoneyPayment(paymentDetails);
      console.log("Payment initiation response:", response);

      if (response.success && response.data) {
        const paystackStatus = response.data.status;
        const displayText = response.data.displayText; // Use displayText from response
        const paystackReference = response.data.reference;

        if (paystackStatus === "pay_offline") {
          // For MTN, Airtel/Tigo - customer gets a prompt
          setPaymentStatusMessage(
            displayText ||
              "Please check your phone for a prompt to authorize payment."
          );
          Alert.alert(
            "Payment Initiated",
            displayText || "Please check your phone for a prompt.",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.replace("SuccessScreen", {
                    orderId: orderId,
                    message: displayText,
                  }),
              },
            ]
          );
        } else if (paystackStatus === "send_otp") {
          // For Vodafone - customer needs to dial USSD to generate voucher, then submit OTP
          // NOTE: This flow requires an additional frontend step to collect the OTP.
          // For now, we'll just display the message and navigate to success,
          // but a full implementation would require a new screen/modal for OTP input.
          setPaymentStatusMessage(
            displayText ||
              "Please dial USSD to generate a voucher code, then input the voucher."
          );
          Alert.alert(
            "Action Required",
            displayText ||
              "Please dial USSD to generate a voucher code. This app does not currently support collecting the voucher code.",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.replace("SuccessScreen", {
                    orderId: orderId,
                    message: displayText + " (Manual OTP submission required)",
                  }),
              },
            ]
          );
        } else if (paystackStatus === "success") {
          // Direct success (less common for mobile money push, but possible)
          setPaymentStatusMessage(
            response.message || "Payment completed successfully!"
          );
          Alert.alert(
            "Payment Success",
            response.message || "Your payment was successful!",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.replace("SuccessScreen", {
                    orderId: orderId,
                    message: response.message,
                  }),
              },
            ]
          );
        } else if (paystackStatus === "pending") {
          // Transaction is pending (e.g., PIN not entered on time)
          setPaymentStatusMessage(
            displayText ||
              "Payment is pending. Please complete authorization on your phone within 180 seconds."
          );
          Alert.alert(
            "Payment Pending",
            displayText || "Please complete authorization on your phone.",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.replace("SuccessScreen", {
                    orderId: orderId,
                    message: displayText || "Payment is pending.",
                  }),
              },
            ]
          );
        } else {
          // Unexpected status from Paystack
          setPaymentStatusMessage(
            "Payment initiated, but received an unexpected status: " +
              paystackStatus
          );
          setShowRetry(true); // Allow retry
          Alert.alert(
            "Payment Status Unclear",
            "Payment initiated, but the response was unexpected. Please check your order history later."
          );
        }
      } else {
        // Backend returned success: false
        setPaymentStatusMessage(
          response.message || "Payment initiation failed."
        );
        setShowRetry(true); // Allow retry
        Alert.alert("Payment Failed", response.message || "Please try again.");
      }
    } catch (error) {
      // Network or unhandled error
      console.error("Error initiating mobile money payment:", error);
      setPaymentStatusMessage(
        error.message || "Network error. Please try again."
      );
      setShowRetry(true); // Allow retry
      Alert.alert(
        "Payment Error",
        error.message || "Failed to connect to payment service."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleInitiatePayment();
  }, []); // Run once on component mount

  const containerStyle = [styles.container, darkTheme && styles.darkContainer];
  const textStyle = [styles.text, darkTheme && styles.darkText];
  const messageStyle = [styles.message, darkTheme && styles.darkMessage];

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Confirm Payment</Text>
        <Text style={textStyle}>Order ID: {orderId}</Text>
        <Text style={textStyle}>Amount: ₵ {amount.toFixed(2)}</Text>
        <Text style={textStyle}>Method: {selectedPaymentMethod}</Text>
        <Text style={textStyle}>Number: {mobileNumber}</Text>
        <Text style={textStyle}>Network: {customerMobileNetwork}</Text>

        <View style={styles.statusContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#7f00ff" />
          ) : (
            <Text style={messageStyle}>{paymentStatusMessage}</Text>
          )}

          {showRetry && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleInitiatePayment}
              disabled={loading}
            >
              <Text style={styles.retryButtonText}>Retry Payment</Text>
            </TouchableOpacity>
          )}

          {!loading && !showRetry && (
            <Text style={styles.instructionText}>
              If you don't receive a prompt, please ensure your mobile number is
              correct and your network is active for mobile money.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  darkText: {
    color: "#eee",
  },
  statusContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#7f00ff",
    marginBottom: 20,
  },
  darkMessage: {
    color: "#9966ff",
  },
  retryButton: {
    backgroundColor: "#FF6347", // Tomato red for retry
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
});
