// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function WishlistScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Your Wishlist is empty!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#888',
//   },
// });



import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import { WishlistContext } from "../context/WishlistContext";



export default function WishlistScreen({ navigation }) {
  const { wishlistItems } = useContext(WishlistContext);

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>❤️ Wishlist</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { marginTop: 20 }]}>❤️ Wishlist</Text>
      </View>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item, idx) => `${item.id}-${item.size}-${idx}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate("ProductDetailsScreen", { item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.size}>Size: {item.size}</Text>
              <Text style={styles.qty}>Qty: {item.quantity}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
   
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#7f00ff",
    letterSpacing: 1,
  },
  list: {
    padding: 16
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
    width: 80,
    height: 80,
    borderRadius: 12
  },
  details: {
    flex: 1,
    padding: 12,
    justifyContent: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  price: {
    fontSize: 14,
    color: "#7f00ff",
    marginTop: 4
  },
  size: {
    fontSize: 13,
    color: "#555"
  },
  qty: {
    fontSize: 13,
    color: "#555"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    color: "#888",
    fontSize: 18,
    marginTop: 40
  },
});