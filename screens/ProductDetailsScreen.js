import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert, // For user feedback
  ActivityIndicator, // For loading state
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Contexts
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useTheme } from "../ThemeContext";

// API functions
import { getProductById } from "../api"; // Removed addItemToCart as it's now handled by CartContext

// Mock Data (replace with actual backend data for reviews/related products)
import REVIEWS from "../src/data/reviews"; // Mock reviews
import PRODUCTS from "../src/data/products"; // Mock products for "Similar Products"

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProductDetailsScreen({ route, navigation }) {
  const { item: initialProduct } = route.params;
  const { addItem } = useContext(CartContext); // Correctly destructure 'addItem' from CartContext
  const { addToWishlist } = useContext(WishlistContext);
  const { darkTheme } = useTheme();

  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    initialProduct.size || "N/A"
  );

  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Filter related products based on subcategory (using mock data for now)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.subcategory === product.subcategory && p.id !== product.id
  );

  const fetchProductDetails = useCallback(async () => {
    if (!product || !product.id) return;

    setFetchingProduct(true);
    try {
      const result = await getProductById(product.id);
      if (result.success && result.data) {
        setProduct(result.data); // Update product state with fresh data from backend
        setSelectedSize(result.data.size || "N/A");
        console.log(
          "ProductDetailsScreen: Fetched product details from backend:",
          result.data
        );
      } else {
        Alert.alert(
          "Error",
          result.message || "Failed to fetch product details."
        );
        console.error(
          "ProductDetailsScreen: Failed to fetch product details:",
          result.message
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Network error fetching product details. Please try again."
      );
      console.error(
        "ProductDetailsScreen: Network error fetching product details:",
        error
      );
    } finally {
      setFetchingProduct(false);
    }
  }, [product?.id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchProductDetails();

      const shuffled = [...REVIEWS].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 5) + 2;
      setDisplayedReviews(shuffled.slice(0, count));
      setExpandedReviews(false);
    }, [fetchProductDetails])
  );

  const handleQuantityChange = (type) => {
    setQuantity((prevQty) => {
      if (type === "add") {
        return prevQty + 1;
      } else {
        return Math.max(1, prevQty - 1);
      }
    });
  };

  const handleAddToCart = async () => {
    if (
      !product ||
      quantity <= 0 ||
      quantity > product.stock ||
      !selectedSize ||
      selectedSize === "N/A"
    ) {
      Alert.alert(
        "Invalid Selection",
        "Please select a valid quantity and ensure product has a size."
      );
      return;
    }

    setAddingToCart(true);
    try {
      // --- FIX: Removed the redundant direct API call to addItemToCart ---
      // The `addItem` from CartContext already handles the backend call.
      // console.log("ProductDetailsScreen: Sending to cart API:", cartItemData);
      // const result = await addItemToCart(cartItemData); // This line was causing the double quantity bug.

      // Call the `addItem` function from CartContext to add the item
      // This function internally makes the API call and updates local state.
      await addItem(product, quantity, selectedSize);

      Alert.alert(
        "Success",
        `${quantity} x ${product.name} (${selectedSize}) added to cart!`
      );
      navigation.navigate("MainTabs", { screen: "Cart" });
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to add to cart. Please try again."
      );
      console.error("ProductDetailsScreen: Error during add to cart:", error);
    } finally {
      setAddingToCart(false);
      fetchProductDetails(); // Refetch product details to get updated stock after adding to cart
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist({ ...product, quantity, size: selectedSize });
    Alert.alert("Success", `${product.name} added to wishlist!`);
    navigation.navigate("Wishlist");
  };

  const renderReview = ({ item }) => (
    <View style={[styles.reviewCard, darkTheme && styles.darkReviewCard]}>
      <View style={styles.reviewHeader}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <View
            style={[styles.avatarCircle, darkTheme && styles.darkAvatarCircle]}
          >
            <Text
              style={[styles.avatarText, darkTheme && styles.darkAvatarText]}
            >
              {item.name[0]}
            </Text>
          </View>
        )}
        <View>
          <Text style={[styles.reviewName, darkTheme && styles.darkText]}>
            {item.name}
          </Text>
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name={i < item.rating ? "star" : "star-border"}
                size={16}
                color={i < item.rating ? "#FFD700" : "#ccc"}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={[styles.reviewComment, darkTheme && styles.darkText]}>
        {item.comment}
      </Text>
    </View>
  );

  const visibleReviews = expandedReviews
    ? displayedReviews
    : displayedReviews.slice(0, 2);

  if (fetchingProduct) {
    return (
      <SafeAreaView style={[styles.safe, darkTheme && styles.darkSafe]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7f00ff" />
          <Text style={[styles.loadingText, darkTheme && styles.darkText]}>
            Loading product details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={[styles.safe, darkTheme && styles.darkSafe]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.errorText, darkTheme && styles.darkText]}>
            Product not found.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, darkTheme && styles.darkSafe]}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.pageWrapper}>
          {/* Product Image Section */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            {product.tag && <Text style={styles.tag}>{product.tag}</Text>}
          </View>

          {/* Product Details Section */}
          <View
            style={[
              styles.productDetailsSection,
              darkTheme && styles.darkProductDetailsSection,
            ]}
          >
            <View style={styles.headerRow}>
              <Text style={[styles.productName, darkTheme && styles.darkText]}>
                {product.name}
              </Text>
              <Text style={[styles.productPrice, darkTheme && styles.darkText]}>
                ${product.price.toFixed(2)}
              </Text>
            </View>

            {/* Product Description */}
            {product.description && (
              <View style={styles.descriptionContainer}>
                <Text
                  style={[styles.sectionLabel, darkTheme && styles.darkText]}
                >
                  Description
                </Text>
                <Text
                  style={[styles.descriptionText, darkTheme && styles.darkText]}
                >
                  {product.description}
                </Text>
              </View>
            )}

            {/* Display Product Size - No longer a selection, just a display */}
            <Text style={[styles.sectionLabel, darkTheme && styles.darkText]}>
              Size
            </Text>
            <View style={styles.sizeDisplayContainer}>
              <Text
                style={[styles.sizeDisplayText, darkTheme && styles.darkText]}
              >
                {product.size || "N/A"}
              </Text>
            </View>

            {/* Quantity Selector */}
            <Text style={[styles.sectionLabel, darkTheme && styles.darkText]}>
              Quantity (In Stock:{" "}
              {product.stock !== null && product.stock !== undefined
                ? product.stock
                : "N/A"}
              )
            </Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                onPress={() => handleQuantityChange("subtract")}
                style={[styles.qtyBtn, darkTheme && styles.darkQtyBtn]}
                disabled={quantity <= 1 || addingToCart || product.stock === 0}
              >
                <Icon
                  name="remove"
                  size={20}
                  color={darkTheme ? "#fff" : "#333"}
                />
              </TouchableOpacity>
              <Text style={[styles.qtyText, darkTheme && styles.darkText]}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange("add")}
                style={[styles.qtyBtn, darkTheme && styles.darkQtyBtn]}
                disabled={
                  quantity >= product.stock ||
                  addingToCart ||
                  product.stock === 0
                }
              >
                <Icon
                  name="add"
                  size={20}
                  color={darkTheme ? "#fff" : "#333"}
                />
              </TouchableOpacity>
            </View>

            {/* Similar Products Section */}
            {relatedProducts.length > 0 && (
              <View
                style={[
                  styles.sectionSeparator,
                  darkTheme && styles.darkSectionSeparator,
                ]}
              >
                <Text
                  style={[styles.sectionLabel, darkTheme && styles.darkText]}
                >
                  Similar Products
                </Text>
                <FlatList
                  data={relatedProducts}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.relatedProductsList}
                  renderItem={({ item: prod }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("ProductDetailsScreen", { item: prod })
                      }
                      style={[
                        styles.relatedItem,
                        darkTheme && styles.darkRelatedItem,
                      ]}
                    >
                      <Image
                        source={{ uri: prod.imageUrl }}
                        style={styles.relatedImage}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.relatedName,
                          darkTheme && styles.darkText,
                        ]}
                      >
                        {prod.name}
                      </Text>
                      <Text
                        style={[
                          styles.relatedPrice,
                          darkTheme && styles.darkText,
                        ]}
                      >
                        ${prod.price.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          {/* Customer Reviews Section */}
          <View
            style={[
              styles.reviewsSection,
              darkTheme && styles.darkReviewsSection,
            ]}
          >
            <Text style={[styles.sectionLabel, darkTheme && styles.darkText]}>
              Customer Reviews
            </Text>
            <FlatList
              data={visibleReviews}
              keyExtractor={(item) => item.id}
              renderItem={renderReview}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 12 }}
            />

            {displayedReviews.length > 2 && !expandedReviews && (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setExpandedReviews(true);
                }}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreText}>Show More Reviews</Text>
              </TouchableOpacity>
            )}
            {displayedReviews.length > 2 && expandedReviews && (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setExpandedReviews(false);
                }}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreText}>Show Less Reviews</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer for Add to Cart/Wishlist */}
      <View style={[styles.bottomBar, darkTheme && styles.darkBottomBar]}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            (addingToCart || quantity > product.stock || product.stock === 0) &&
              styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={
            addingToCart || quantity > product.stock || product.stock === 0
          }
        >
          {addingToCart ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addToCartText}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.wishlistButton,
            darkTheme && styles.darkWishlistButton,
          ]}
          onPress={handleAddToWishlist}
          disabled={addingToCart}
        >
          <Text style={styles.heart}>❤️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Light background for the whole screen
  },
  darkSafe: {
    backgroundColor: "#1a1a1a", // Dark background for the whole screen
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  pageWrapper: {
    flex: 1,
    paddingBottom: 100, // Space for the fixed bottom bar
  },
  imageContainer: {
    width: "100%",
    height: 350, // Slightly increased height for better visual
    position: "relative",
    backgroundColor: "#e0e0e0", // Placeholder background for image loading
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // --- FIX 1: Changed resizeMode to 'cover' to fill the box ---
    resizeMode: "cover",
  },
  tag: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#7f00ff",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "600",
    fontSize: 12,
    zIndex: 1, // Ensure tag is above image
  },
  // Product Details Section Styling
  productDetailsSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomLeftRadius: 20, // Rounded bottom corners
    borderBottomRightRadius: 20,
    marginBottom: 15, // Space between product details and reviews
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  darkProductDetailsSection: {
    backgroundColor: "#2e2e2e",
    borderColor: "#444",
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  productName: {
    flex: 1,
    fontSize: 26, // Larger font size
    fontWeight: "800", // Bolder
    color: "#333",
    marginRight: 10,
  },
  productPrice: {
    fontSize: 24, // Larger font size
    fontWeight: "700",
    color: "#7f00ff",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  sectionLabel: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  darkText: {
    color: "#f0f0f0",
  },
  // --- Styles for single size display ---
  sizeDisplayContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-start", // Fit content
    marginBottom: 20,
  },
  sizeDisplayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  // --- END NEW SIZE STYLES ---
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start", // Make it fit content
  },
  darkQtyBtn: {
    backgroundColor: "#555",
  },
  qtyBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 15,
    color: "#333",
  },
  sectionSeparator: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
    marginTop: 20,
  },
  darkSectionSeparator: {
    borderTopColor: "#555",
  },
  relatedProductsList: {
    paddingVertical: 10,
  },
  relatedItem: {
    width: 120, // Fixed width for related product cards
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  darkRelatedItem: {
    backgroundColor: "#3a3a3a",
    borderColor: "#555",
    borderWidth: 1,
  },
  relatedImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  relatedPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7f00ff",
  },
  // Reviews Section Styling
  reviewsSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 15, // Space between product details and reviews
    borderRadius: 20, // Rounded corners for the reviews section
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 15, // Add horizontal margin to distinguish it
  },
  darkReviewsSection: {
    backgroundColor: "#2e2e2e",
    borderColor: "#444",
    borderWidth: 1,
  },
  reviewCard: {
    backgroundColor: "#f9f9f9", // Slightly different background for individual review cards
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#eee",
  },
  darkReviewCard: {
    backgroundColor: "#3a3a3a",
    borderColor: "#555",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  darkAvatarCircle: {
    backgroundColor: "#555",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#444",
  },
  darkAvatarText: {
    color: "#ccc",
  },
  reviewName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  reviewComment: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  showMoreButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  showMoreText: {
    color: "#7f00ff",
    fontWeight: "600",
    fontSize: 15,
  },
  // Bottom Bar (Sticky Footer)
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: 14,
    paddingBottom: Platform.OS === "ios" ? 34 : 14, // Adjust padding for iOS safe area
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  darkBottomBar: {
    backgroundColor: "#222",
    borderColor: "#444",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#7f00ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center", // Center content vertically
    marginRight: 12,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  wishlistButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#eee",
    justifyContent: "center", // Center content vertically
  },
  darkWishlistButton: {
    backgroundColor: "#444",
  },
  heart: {
    fontSize: 22,
  },
  disabledButton: {
    backgroundColor: "#cccccc", // Grey out when disabled
  },
});
