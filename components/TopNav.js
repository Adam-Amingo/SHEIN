import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  // Alert, // Removed Alert import as it's no longer used for search
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TabItem from "./TabItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Voice from "@react-native-voice/voice"; // Assuming you have Voice setup

const tabs = ["All", "Women", "Men", "Kids", "Curve", "Home"];

export default function TopNavBar({ activeTab, onTabChange }) {
  const [searchText, setSearchText] = React.useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const getIconColor = (screen) =>
    route.name === screen ? "#7F55B1" : "#7F55B1";

  // --- MODIFIED: handleSearch now navigates to SearchScreen ---
  const handleSearch = () => {
    // Only navigate if there's actual search text
    if (searchText.trim()) {
      navigation.navigate("SearchScreen", { query: searchText.trim() });
      setSearchText(""); // Clear search input after navigating
    } else {
      // Optionally, show a message if search text is empty
      // Alert.alert("Search", "Please enter a search term.");
      console.log("Search text is empty.");
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image selected:", result.assets[0].uri);
      // You would typically send this image to your backend for visual search
      // For now, just logging.
    }
  };

  const handleVoiceSearch = async () => {
    try {
      // Ensure Voice is initialized and permissions are granted
      await Voice.start("en-US");
      Voice.onSpeechResults = (event) => {
        const text = event.value[0];
        setSearchText(text);
        // Automatically trigger search after voice input
        // A small delay might be good here to allow state update to propagate
        setTimeout(
          () => navigation.navigate("SearchScreen", { query: text.trim() }),
          100
        );
      };
      Voice.onSpeechError = (error) => {
        console.error("Voice search error:", error);
        // Alert.alert("Voice Search Error", "Could not process voice input.");
      };
    } catch (error) {
      console.error("Failed to start voice recognition:", error);
      // Alert.alert("Voice Search Error", "Failed to start voice recognition. Check permissions.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Icon
            name="mail-outline"
            size={24}
            color={getIconColor("Notification")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Icon
            name="calendar-outline"
            size={24}
            color={getIconColor("Cart")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          {/* --- MODIFIED: onPress for search icon --- */}
          <TouchableOpacity onPress={handleSearch}>
            <Icon
              name="search-outline"
              size={20}
              color="#7F55B1"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={route.name === "Home" ? "Search" : "Categories"}
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            // --- ADDED: onSubmitEditing to trigger search on keyboard 'Enter' ---
            onSubmitEditing={handleSearch}
            returnKeyType="search" // Changes keyboard return key to 'Search'
          />
          {route.name !== "Home" && (
            <>
              <TouchableOpacity onPress={handlePickImage}>
                <Icon
                  name="camera-outline"
                  size={22}
                  color="#7F55B1"
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleVoiceSearch}>
                <Icon
                  name="mic-outline"
                  size={24}
                  color="#7F55B1"
                  style={{ marginHorizontal: 2 }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
          <Icon
            name="heart-outline"
            size={24}
            color={getIconColor("Wishlist")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Main category tabs */}
      {route.name !== "Home" && ( // This condition means tabs only show on CategoryScreen
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
        >
          {tabs.map((tab) => (
            <TabItem
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onPress={() => onTabChange && onTabChange(tab)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff", // Changed to white to blend with background
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 15, // Adjusted for better spacing
  },
  icon: {
    marginHorizontal: 3,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f0ff",
    paddingHorizontal: 0,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 3,
    height: 40, // Added a fixed height for consistency
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    height: "100%", // Make input take full height of searchBar
  },
  tabContainer: {
    marginTop: 5,
  },
});
