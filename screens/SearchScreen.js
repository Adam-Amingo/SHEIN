// screens/SearchScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Keyboard, // To dismiss keyboard
  Dimensions, // Import Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProductListComponent from "../components/ProductListComponent"; // Re-use the product list
import { searchProducts, getRecentSearches } from "../api"; // Import search functions
import { useRoute, useNavigation } from "@react-navigation/native"; // --- FIX: Changed '=>' to 'from' ---
import { useTheme } from "../ThemeContext"; // Assuming you have a ThemeContext
import ProductCard from "../components/ProductCard"; // Import ProductCard

export default function SearchScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { darkTheme } = useTheme();

  // Initial query from navigation params (e.g., from TopNav)
  const initialQuery = route.params?.query || "";

  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // Changed to useState(false)
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // Initialize to true
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(true); // Control visibility of recent searches

  // Filters state (can be expanded later)
  const [filters, setFilters] = useState({}); // e.g., { minPrice: 10, maxPrice: 100, inStock: true }

  // Function to fetch recent searches
  const fetchRecentSearches = useCallback(async () => {
    try {
      const result = await getRecentSearches();
      if (result.success) {
        setRecentSearches(Array.from(result.data || [])); // Convert Set to Array
      } else {
        console.error(
          "SearchScreen [Recent Searches]: Failed to fetch recent searches:",
          result.message
        );
      }
    } catch (err) {
      console.error(
        "SearchScreen [Recent Searches]: Error fetching recent searches:",
        err
      );
    }
  }, []);

  // Effect to load recent searches on component mount
  useEffect(() => {
    fetchRecentSearches();
  }, [fetchRecentSearches]);

  // Effect to set initial query from params and trigger search
  useEffect(() => {
    console.log(
      "SearchScreen [useEffect]: Component mounted/initialQuery changed. initialQuery:",
      initialQuery
    );
    if (initialQuery) {
      setQuery(initialQuery);
      // Ensure handleSearch is called with the initialQuery to trigger the search
      // Use a timeout to ensure state updates are batched before calling handleSearch
      const timer = setTimeout(() => {
        handleSearch(initialQuery, true);
      }, 0); // Short timeout to allow state to settle
      return () => clearTimeout(timer);
    }
  }, [initialQuery, handleSearch]); // Added handleSearch to dependencies

  // Function to perform the search
  const handleSearch = useCallback(
    async (searchQuery, reset = true) => {
      console.log(
        "SearchScreen [handleSearch]: Function called with query:",
        searchQuery,
        "reset:",
        reset
      );

      // Check if query is empty or just whitespace
      if (!searchQuery || searchQuery.trim() === "") {
        console.log(
          "SearchScreen [handleSearch]: Query is empty or whitespace, resetting results."
        );
        setSearchResults([]);
        setHasMore(true); // Reset hasMore for future searches
        setError(null);
        setShowRecentSearches(true); // Show recent searches if query is empty
        return; // Exit early if query is empty
      }

      Keyboard.dismiss(); // Dismiss keyboard when search is initiated
      setShowRecentSearches(false); // Hide recent searches once a search starts

      if (reset) {
        setLoading(true);
        setPage(0); // Reset page to 0 for a new search
        setSearchResults([]); // Clear previous results for a new search
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        const currentPage = reset ? 0 : page + 1;
        console.log(
          "SearchScreen [handleSearch]: Calling searchProducts from api.js with actual query:",
          searchQuery,
          "page:",
          currentPage,
          "filters:",
          filters
        );

        const result = await searchProducts(searchQuery, filters, currentPage);

        console.log(
          "SearchScreen [handleSearch]: Raw result from searchProducts:",
          result
        );

        if (result.success && result.data) {
          console.log(
            "SearchScreen [handleSearch]: Result data received. Type of result.data:",
            typeof result.data
          );
          console.log(
            "SearchScreen [handleSearch]: Content of result.data:",
            result.data
          );
          console.log(
            "SearchScreen [handleSearch]: Type of result.data.content:",
            typeof result.data.content
          );
          console.log(
            "SearchScreen [handleSearch]: Content of result.data.content:",
            result.data.content
          );

          // Ensure result.data.content is an array before attempting to use it
          if (!Array.isArray(result.data.content)) {
            console.error(
              "SearchScreen [handleSearch]: Expected result.data.content to be an array, but got:",
              typeof result.data.content,
              result.data.content
            );
            setError("Unexpected data format from search API.");
            setHasMore(false);
            return;
          }

          const newProducts = result.data.content;
          setSearchResults((prevResults) => {
            console.log(
              "SearchScreen [setSearchResults]: prevResults type:",
              typeof prevResults,
              "newProducts type:",
              typeof newProducts
            );
            console.log(
              "SearchScreen [setSearchResults]: prevResults:",
              prevResults,
              "newProducts:",
              newProducts
            );
            return reset ? newProducts : [...prevResults, ...newProducts];
          });
          setHasMore(!result.data.last);
          if (!reset) {
            setPage((prevPage) => prevPage + 1);
          }
        } else {
          console.error(
            "SearchScreen [handleSearch]: Search API failed. Message:",
            result.message
          );
          setError(result.message || "Failed to search products.");
          setHasMore(false);
        }
      } catch (err) {
        console.error(
          "SearchScreen [handleSearch]: Search API call caught error:",
          err
        );
        setError("Network error or unable to connect. Please try again later.");
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters, page] // Dependencies for useCallback
  );

  // Handle loading more results for infinite scroll
  const handleLoadMore = () => {
    // Only load more if not already loading, has more pages, and query is not empty
    if (!loading && !loadingMore && hasMore && query.trim()) {
      console.log(
        "SearchScreen [handleLoadMore]: Triggering load more for query:",
        query,
        "current page:",
        page
      );
      handleSearch(query, false); // Fetch next page, do not reset
    } else {
      console.log(
        "SearchScreen [handleLoadMore]: Load more condition not met. Loading:",
        loading,
        "LoadingMore:",
        loadingMore,
        "HasMore:",
        hasMore,
        "Query empty:",
        !query.trim()
      );
    }
  };

  // Render footer for loading more
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoadingContainer}>
        <ActivityIndicator size="small" color="#7f00ff" />
        <Text style={styles.loadingText}>Loading more results...</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
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
        <TextInput
          style={[styles.searchInput, darkTheme && styles.darkSearchInput]}
          placeholder="Search products..."
          placeholderTextColor={darkTheme ? "#aaa" : "#888"}
          value={query}
          onChangeText={(text) => {
            console.log(
              "SearchScreen [TextInput]: onChangeText - new query value:",
              text
            );
            setQuery(text);
          }}
          onSubmitEditing={() => {
            console.log(
              "SearchScreen [TextInput]: onSubmitEditing - triggering search for query:",
              query
            );
            handleSearch(query, true); // Trigger search on Enter
          }}
          returnKeyType="search"
          autoFocus={!initialQuery} // Auto-focus if no initial query
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              console.log("SearchScreen [Clear Button]: Clearing query.");
              setQuery("");
              handleSearch("", true); // Clear query and reset search results
            }}
            style={styles.clearButton}
          >
            <Icon
              name="close-circle"
              size={20}
              color={darkTheme ? "#aaa" : "#888"}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            console.log(
              "SearchScreen [Search Button]: Triggering search for query:",
              query
            );
            handleSearch(query, true);
          }}
          style={styles.searchButton}
        >
          <Icon name="search" size={24} color="#7f00ff" />
        </TouchableOpacity>
      </View>

      {/* Recent Searches Section */}
      {showRecentSearches && recentSearches.length > 0 && (
        <View style={styles.recentSearchesSection}>
          <Text
            style={[styles.recentSearchesTitle, darkTheme && styles.darkText]}
          >
            Recent Searches
          </Text>
          <FlatList
            data={recentSearches}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.recentSearchTag,
                  darkTheme && styles.darkRecentSearchTag,
                ]}
                onPress={() => {
                  console.log(
                    "SearchScreen [Recent Search Tag]: Selected recent search:",
                    item
                  );
                  setQuery(item);
                  handleSearch(item, true); // Trigger search for recent term
                }}
              >
                <Text
                  style={[
                    styles.recentSearchText,
                    darkTheme && styles.darkText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.recentSearchesList}
          />
        </View>
      )}

      {/* Search Results Display */}
      {loading && searchResults.length === 0 ? (
        <View style={styles.fullScreenCenter}>
          <ActivityIndicator size="large" color="#7f00ff" />
          <Text style={[styles.loadingText, darkTheme && styles.darkText]}>
            Searching...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.fullScreenCenter}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => handleSearch(query, true)}>
            <Text style={styles.retryText}>Tap to Retry</Text>
          </TouchableOpacity>
        </View>
      ) : searchResults.length === 0 && query.trim() ? (
        <View style={styles.fullScreenCenter}>
          <Text style={[styles.emptyText, darkTheme && styles.darkText]}>
            No results found for "{query}".
          </Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <FlatList
            data={searchResults} // Pass search results directly
            renderItem={({ item }) => (
              <View style={styles.productWrapper}>
                <ProductCard
                  image={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  tag={item.tag} // Assuming tag is part of ProductSearchResultDTO
                  onPress={() =>
                    navigation.navigate("ProductDetailsScreen", { item })
                  }
                  onPressImage={() =>
                    navigation.navigate("FullImageScreen", {
                      image: item.imageUrl,
                    })
                  }
                />
              </View>
            )}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            numColumns={2}
            contentContainerStyle={styles.productListContent}
            columnWrapperStyle={styles.productListRow}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </View>
  );
}

const itemSpacing = 10;
const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // Adjust for status bar/notch
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  darkSearchInput: {
    backgroundColor: "#444",
    color: "#fff",
  },
  clearButton: {
    padding: 5,
    marginLeft: -30, // Overlay on the input
    zIndex: 1,
  },
  searchButton: {
    padding: 5,
    marginLeft: 10,
  },
  recentSearchesSection: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  recentSearchesList: {
    // paddingVertical: 5,
  },
  recentSearchTag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 5, // For better spacing if tags wrap
  },
  darkRecentSearchTag: {
    backgroundColor: "#555",
  },
  recentSearchText: {
    fontSize: 14,
    color: "#555",
  },
  resultsContainer: {
    flex: 1,
    // paddingHorizontal: itemSpacing, // ProductListComponent's style already handles this
  },
  productListContent: {
    paddingBottom: 20,
    paddingHorizontal: itemSpacing, // Ensure padding matches ProductListComponent
  },
  productListRow: {
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
    elevation: 3, // Android shadow
  },
  fullScreenCenter: {
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
  retryText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
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
