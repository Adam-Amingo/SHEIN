import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { SwipeListView } from "react-native-swipe-list-view";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const renderItem = (data) => {
    const item = data.item;
    const itemTotal = item.price * item.quantity;

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>Size: {item.size}</Text>
          <Text style={styles.info}>Qty: {item.quantity}</Text>
          <Text style={styles.total}>Total: ${itemTotal.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          if (rowMap[data.index]) {
            rowMap[data.index].closeRow();
          }
          removeFromCart(data.item.id, data.item.size);
        }}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      <SwipeListView
        data={cartItems}
        keyExtractor={(item) => `${item.id}-${item.size}`}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        contentContainerStyle={{ paddingBottom: 56 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />

      <View style={styles.checkoutWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  details: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  total: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
    color: "#000",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ff4444",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 12,
    marginBottom: 16,
    paddingRight: 20,
    height: 100
  },
  deleteButton: {
    width: 75,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkoutWrapper: {
    // position: "absolute",
    // bottom: 20,
    // left: 16,
    // right: 16,
    // marginBottom: 20,
    marginHorizontal: 16
  },
  checkoutButton: {
    backgroundColor: "#7f00ff",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;