/////////////////////////////////////
///////////////////////////////////////

// import React, { useContext } from "react";
// import {
//     View,
//     Text,
//     FlatList,
//     StyleSheet,
//     TouchableOpacity,
//     SafeAreaView,
//     Animated,
// } from "react-native";
// import * as Crypto from 'expo-crypto';
// import { CartContext } from "../context/CartContext";

// const CheckoutScreen = ({ navigation, route }) => {
//     const { cartItems } = useContext(CartContext);
//     const { item, quantity = 1, size = "M" } = route.params || {};

//     const isSingleItemCheckout = !!item;

//     const itemsToRender = isSingleItemCheckout
//         ? [{ ...item, quantity, size }]
//         : cartItems;

//     const calculateTotal = () => {
//         return itemsToRender.reduce(
//             (acc, item) => acc + item.price * item.quantity,
//             0
//         );
//     };

//     const renderItem = ({ item, index }) => {
//         const translateY = new Animated.Value(30);
//         const opacity = new Animated.Value(0);

//         Animated.timing(translateY, {
//             toValue: 0,
//             duration: 300,
//             delay: index * 100,
//             useNativeDriver: true,
//         }).start();

//         Animated.timing(opacity, {
//             toValue: 1,
//             duration: 500,
//             delay: index * 200,
//             useNativeDriver: true,
//         }).start();

//         return (
//             <Animated.View
//                 style={[styles.itemContainer, { transform: [{ translateY }], opacity }]}
//             >
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <Text style={styles.details}>Size: {item.size}</Text>
//                 <Text style={styles.details}>Qty: {item.quantity}</Text>
//                 <Text style={styles.itemTotal}>
//                     ₵ {(item.price * item.quantity).toFixed(2)}
//                 </Text>
//             </Animated.View>
//         );
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={itemsToRender}
//                 keyExtractor={(item, index) => `${item.id}-${item.size}-${index}`}
//                 renderItem={renderItem}
//                 contentContainerStyle={styles.listContent}
//                 showsVerticalScrollIndicator={false}
//             />

//             <View style={styles.checkoutBar}>
//                 <View style={styles.amountbox}>
//                     <Text style={styles.totalLabel}>Total:</Text>
//                     <Text style={styles.totalAmount}>₵ {calculateTotal().toFixed(2)}</Text>
//                 </View>

//                 {/* <TouchableOpacity
//                     style={styles.checkoutButton}
//                     onPress={() =>
//                         navigation.navigate("PaymentScreen", {
//                             totalAmount: calculateTotal(),
//                             items: itemsToRender,
//                         })
//                     }
//                 >
//                     <Text style={styles.checkoutText}>Proceed to Payment</Text>
//                 </TouchableOpacity> */}

//                 <TouchableOpacity
//                     style={styles.checkoutButton}
//                     onPress={async () => {
//                         const orderId = await Crypto.digestStringAsync(
//                             Crypto.CryptoDigestAlgorithm.SHA256,
//                             Date.now().toString() + Math.random().toString()
//                         );

//                         navigation.navigate("PaymentScreen", {
//                             totalAmount: calculateTotal(),
//                             items: itemsToRender,
//                             orderId, // pass the order ID here
//                         });
//                     }}
//                 >
//                     <Text style={styles.checkoutText}>Proceed to Payment</Text>
//                 </TouchableOpacity>

//             </View>
//         </SafeAreaView>
//     );
// };

import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { CartContext } from "../context/CartContext";

const CheckoutScreen = ({ navigation, route }) => {
  const { cartItems } = useContext(CartContext);
  const { item, quantity = 1, size = "M" } = route.params || {};

  const isSingleItemCheckout = !!item;

  const itemsToRender = isSingleItemCheckout
    ? [{ ...item, quantity, size }]
    : cartItems;

  // ✅ Generate short order ID (7 characters)
  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 7; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ORD-${id}`;
  };

  const calculateTotal = () => {
    return itemsToRender.reduce((acc, item) => {
      console.log("itemsToRender:", itemsToRender);
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0);
  };

  const renderItem = ({ item, index }) => {
    const translateY = new Animated.Value(30);
    const opacity = new Animated.Value(0);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={[styles.itemContainer, { transform: [{ translateY }], opacity }]}
      >
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.details}>Size: {item.size}</Text>
        <Text style={styles.details}>Qty: {item.quantity}</Text>
        <Text style={styles.itemTotal}>
          ₵{" "}
          {item.price && item.quantity
            ? (item.price * item.quantity).toFixed(2)
            : "0.00"}
        </Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={itemsToRender}
        keyExtractor={(item, index) => `${item.id}-${item.size}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.checkoutBar}>
        <View style={styles.amountbox}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>
            ₵ {calculateTotal().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            const generatedOrderId = generateOrderId(); // ✅ Create order ID
            navigation.navigate("MobileMoneyPaymentScreen", {
              order: {
                id: generatedOrderId,
                items: itemsToRender,
                total: calculateTotal(),
              },
            });
          }}
        >
          <Text style={styles.checkoutText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// (styles unchanged...)

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
  amountbox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
