import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator, // For loading indicator
  Text, // For error message
  TouchableOpacity, // For retry button
} from "react-native";
import ProductCard from "./ProductCard";
import Banner from "./Banner";
import { getProducts } from "../api"; // Import the new getProducts function

const screenWidth = Dimensions.get("window").width;
const itemSpacing = 10;
const numColumns = 2;
const itemWidth = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const ProductListComponent = ({
  navigation,
  mainCategory = "All", // Default prop value
  subCategory = "", // Default prop value
  showBanner = false,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async (pageNumber = 0, append = false) => {
      if (pageNumber === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        // --- CORRECTED PART HERE ---
        // Prepare category and subcategory values for the API call
        // 'All' category should be sent as null/undefined to backend to get all main categories
        const categoryParam = mainCategory === "All" ? null : mainCategory;
        // Empty subCategory should be sent as null/undefined to backend to get all subcategories
        const subcategoryParam = subCategory === "" ? null : subCategory;

        const result = await getProducts(
          pageNumber,
          10,
          "id,asc",
          categoryParam, // Pass the main category
          subcategoryParam // Pass the subcategory
        );
        // --- END CORRECTED PART ---

        if (result.success && result.data && result.data.content) {
          setProducts((prevProducts) =>
            append
              ? [...prevProducts, ...result.data.content]
              : result.data.content
          );
          setHasMore(!result.data.last);
          setPage(pageNumber);
        } else {
          setError(result.message || "Failed to load products.");
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again.");
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [mainCategory, subCategory] // Dependencies: re-fetch if category/subcategory props change
  );

  // Initial fetch when component mounts or category/subcategory changes
  useEffect(() => {
    // Reset products and page when filters change before fetching new data
    setProducts([]);
    setPage(0);
    setHasMore(true); // Assume there might be more data with new filters
    fetchProducts(0, false); // Fetch first page for new filters, do not append
  }, [fetchProducts]); // Dependency on memoized fetchProducts

  // Function to load more products when scrolling to the end
  const handleLoadMore = () => {
    if (!loading && !loadingMore && hasMore) {
      fetchProducts(page + 1, true); // Fetch next page, append to existing products
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard
        image={item.imageUrl}
        name={item.name}
        price={item.price}
        rating={item.rating}
        tag={item.tag}
        onPress={() => navigation.navigate("ProductDetailsScreen", { item })}
        onPressImage={() =>
          navigation.navigate("FullImageScreen", { image: item.imageUrl })
        }
      />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoadingContainer}>
        <ActivityIndicator size="small" color="#7f00ff" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7f00ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => fetchProducts(0, false)}>
          <Text style={styles.retryText}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No products found for this category or subcategory.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        } // Ensure unique keys for FlatList
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={showBanner ? <Banner /> : null}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: itemSpacing,
    backgroundColor: "#fefefe",
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: itemSpacing,
  },
  productWrapper: {
    width: itemWidth,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  footerLoadingContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductListComponent;
