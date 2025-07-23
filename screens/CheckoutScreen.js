import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api.js";
import { useAuth } from "../context/AuthContext";

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, clearCart } = useContext(CartContext); // Keep clearCart for potential future use or if other parts need it
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(
    "123 Market Road, Accra, Ghana"
  );
  const [billingAddress, setBillingAddress] = useState(
    "456 High Street, Accra, Ghana"
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("MTN_MOBILE_MONEY");
  const [mobileNumber, setMobileNumber] = useState("0541234567");
  const [customerMobileNetwork, setCustomerMobileNetwork] = useState("MTN");

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.details}>Size: {item.size}</Text>
      <Text style={styles.details}>Qty: {item.quantity}</Text>
      <Text style={styles.itemTotal}>
        ₵ {(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  const handleCreateOrderAndProceedToPayment = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Cart Empty",
        "Your cart is empty. Please add items before proceeding to checkout."
      );
      return;
    }

    if (!mobileNumber || !customerMobileNetwork) {
      Alert.alert(
        "Missing Information",
        "Please provide your mobile number and network for Mobile Money payment."
      );
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      }));

      const orderCreationRequest = {
        shippingAddress,
        billingAddress,
        orderItems: orderItems,
      };

      const orderCreationResponse = await createOrder(orderCreationRequest);

      if (
        orderCreationResponse.success &&
        orderCreationResponse.data?.orderId
      ) {
        const newOrderId = orderCreationResponse.data.orderId;
        const totalAmount = calculateTotal();
        const customerEmail = authState.user?.email;

        if (!customerEmail) {
          Alert.alert("Error", "User email not found. Please log in again.");
          setLoading(false);
          return;
        }

        Alert.alert(
          "Order Created",
          `Your order has been placed successfully! Order ID: ${newOrderId}. Now proceeding to payment...`
        );

        // REMOVED: clearCart() call from here. It will now be done on SuccessScreen.

        navigation.navigate("MobileMoneyPaymentScreen", {
          orderId: newOrderId,
          amount: totalAmount,
          customerEmail: customerEmail,
          selectedPaymentMethod: selectedPaymentMethod,
          mobileNumber: mobileNumber,
          customerMobileNetwork: customerMobileNetwork,
        });
      } else {
        Alert.alert(
          "Order Creation Failed",
          orderCreationResponse.message ||
            "An unexpected error occurred during order creation."
        );
      }
    } catch (error) {
      console.error(
        "Error in CheckoutScreen (order creation):",
        error.response?.data || error.message
      );
      Alert.alert(
        "Order Error",
        error.response?.data?.message ||
          "Failed to create order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.id}-${item.size}-${index}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Shipping Address"
          value={shippingAddress}
          onChangeText={setShippingAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Billing Address (Optional)"
          value={billingAddress}
          onChangeText={setBillingAddress}
        />

        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <TouchableOpacity
          style={[
            styles.paymentMethodButton,
            selectedPaymentMethod === "MTN_MOBILE_MONEY" &&
              styles.selectedPaymentMethod,
          ]}
          onPress={() => {
            setSelectedPaymentMethod("MTN_MOBILE_MONEY");
            setCustomerMobileNetwork("MTN");
          }}
        >
          <Text style={styles.paymentMethodText}>MTN Mobile Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentMethodButton,
            selectedPaymentMethod === "TELECEL_MONEY" &&
              styles.selectedPaymentMethod,
          ]}
          onPress={() => {
            setSelectedPaymentMethod("TELECEL_MONEY");
            setCustomerMobileNetwork("VODAFONE");
          }}
        >
          <Text style={styles.paymentMethodText}>Vodafone Cash</Text>
        </TouchableOpacity>

        <View style={styles.mobileMoneyInputs}>
          <Text style={styles.sectionTitle}>Mobile Money Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Customer Mobile Number (e.g., 0541234567)"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Network (e.g., MTN, Vodafone)"
            value={customerMobileNetwork}
            onChangeText={setCustomerMobileNetwork}
            autoCapitalize="characters"
          />
        </View>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>
            ₵ {calculateTotal().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            (loading || cartItems.length === 0) && styles.disabledButton,
          ]}
          onPress={handleCreateOrderAndProceedToPayment}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.checkoutText}>Proceed to Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  listContent: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  paymentMethodButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  selectedPaymentMethod: {
    borderColor: "#7f00ff",
    backgroundColor: "#e6e6fa",
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "500",
  },
  mobileMoneyInputs: {
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  itemTotal: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  totalLabel: {
    fontSize: 16,
    color: "#888",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  checkoutButton: {
    backgroundColor: "#7f00ff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});
