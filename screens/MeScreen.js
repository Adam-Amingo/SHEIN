import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  ActivityIndicator, // Added for loading indicator
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemeContext } from "../ThemeContext";
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext
import { API_BASE_URL } from "../api"; // Assuming you have a base URL for your API

export default function MeScreen({ navigation }) {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const { userToken, userId, logout } = useContext(AuthContext); // Get token and userId from AuthContext
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(true); // Initial loading state

  // Function to fetch user data
  const fetchUserData = useCallback(async () => {
    if (!userToken || !userId) {
      setLoading(false);
      return; // No token or user ID, cannot fetch
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        // Assuming /api/users/{id} endpoint
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        // Handle unauthorized or other errors
        if (response.status === 401 || response.status === 403) {
          Alert.alert("Session Expired", "Please log in again.");
          logout(); // Log out user on auth error
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data.data); // Assuming API response is { data: userObject, message: "Success" }
      setProfileImage(data.data.profileImageUrl); // Set profile image from fetched data
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      Alert.alert("Error", "Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  }, [userToken, userId, logout]); // Re-fetch if token or userId changes

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Dependency array for useEffect

  // Handler for image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setProfileImage(newImageUri);
      // TODO: Implement image upload to backend here
      // You'll need to send newImageUri to your backend's user update endpoint
      // and update the profileImageUrl in your database.
      // Example: uploadProfileImage(newImageUri, userToken);
      Alert.alert(
        "Photo Updated",
        "Profile photo changed locally. Remember to upload to server if needed."
      );
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout(); // Call the logout function from your AuthContext
          navigation.replace("Login"); // Navigate to Login or initial screen
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: darkTheme ? "#222" : "#fff" },
        ]}
      >
        <ActivityIndicator size="large" color={darkTheme ? "#fff" : "#000"} />
        <Text style={{ color: darkTheme ? "#fff" : "#000", marginTop: 10 }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  // Fallback if no user data
  if (!userData) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: darkTheme ? "#222" : "#fff" },
        ]}
      >
        <Text
          style={[styles.sectionTitle, { color: darkTheme ? "#fff" : "#000" }]}
        >
          Could not load user data.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUserData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: darkTheme ? "#222" : "#fff",
      }}
    >
      <View style={[styles.container, darkTheme && styles.darkContainer]}>
        {/* Profile Section */}
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            // Placeholder image if profileImage is null or empty
            <Image
              source={{
                uri: "https://t4.ftcdn.net/jpg/02/61/09/15/360_F_261091593_tnCcIkxFtKvwfJQ44EiezFSzQufXjToS.jpg",
              }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.changePhoto}>Change Photo</Text>
        </TouchableOpacity>
        <Text style={[styles.text, darkTheme && styles.darkText]}>
          {userData.firstName} {userData.lastName}
        </Text>
        <Text style={[styles.subText, darkTheme && styles.darkText]}>
          {userData.email}
        </Text>

        {/* New Field: Phone Number */}
        {userData.phoneNumber && (
          <Text style={[styles.subText, darkTheme && styles.darkText]}>
            Phone: {userData.phoneNumber}
          </Text>
        )}

        {/* New Field: Date of Birth */}
        {userData.dob && (
          <Text style={[styles.subText, darkTheme && styles.darkText]}>
            DOB: {userData.dob}
          </Text>
        )}

        {/* New Field: Gender */}
        {userData.sex && (
          <Text style={[styles.subText, darkTheme && styles.darkText]}>
            Gender: {userData.sex}
          </Text>
        )}

        {/* New Field: Account Status (e.g., Verified) */}
        <View style={styles.row}>
          <Text style={[styles.rowText, darkTheme && styles.darkText]}>
            Email Verified:
          </Text>
          <Switch
            value={userData.emailVerified}
            onValueChange={() => {
              /* This is display only, user can't change this directly */
            }}
            disabled={true} // Users can't toggle this manually
          />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>
            Account
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("EditProfile", { userData })} // Pass current user data
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Change Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ManageAddresses")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Manage Addresses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("PaymentMethods")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Payment Methods
            </Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          {" "}
          {/* Encapsulate Preferences */}
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>
            Preferences
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("LocationAndCurrency")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Location & Currency
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Security & Privacy Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>
            Security & Privacy
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("PrivacySettings")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Privacy Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleLogout}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>
            Support
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("HelpCenter")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Help Center
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ContactSupport")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>
            Legal
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("About")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Optional */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert(
                "Delete Account",
                "Are you sure you want to delete your account? This action cannot be undone.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                      // TODO: Call your backend to delete the account here
                      // Example: deleteUserAccount(userId, userToken);
                      Alert.alert(
                        "Account Deleted",
                        "Your account has been deleted."
                      );
                      logout(); // Log out after deletion
                      navigation.replace("Login"); // Navigate to login screen
                    },
                  },
                ]
              );
            }}
          >
            <Text
              style={[
                styles.rowText,
                darkTheme && styles.darkText,
                styles.deleteAccountText,
              ]}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("InviteFriends")}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>
              Invite Friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 100,
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#888",
    alignSelf: "center",
  },
  changePhoto: {
    color: "#007bff",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    color: "#222",
    marginBottom: 2,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5, // Reduced margin for more fields
    textAlign: "center",
  },
  darkText: {
    color: "#fff",
  },
  section: {
    width: "90%",
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowText: {
    fontSize: 16,
    color: "#222",
  },
  deleteAccountText: {
    color: "#dc3545", // Make delete account text red for emphasis
  },
});
