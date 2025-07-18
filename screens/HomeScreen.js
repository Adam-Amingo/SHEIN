// screens/HomeScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import FadeInView from "../components/FadeInView";
import TopNavBar from "../components/TopNav";
// Removed direct import of Banner here, as ProductListComponent handles it
import ProductListComponent from "../components/ProductListComponent";

export default function HomeScreen({ navigation }) {
  return (
    <FadeInView style={styles.container}>
      <TopNavBar />
      {/* ProductListComponent will fetch all products by default.
          It will also render the Banner component internally if showBanner is true. */}
      <ProductListComponent navigation={navigation} showBanner={true} />
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
