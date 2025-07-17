//I'm changing the login screen as well, it's lacking some features and i want to implement some security features ~rycoe

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing JWT (it's a security feature)
import { login } from "../api"; // Import the login function from the backend API module

export default function LoginScreen({ navigation, onLogin }) {
  // State to hold form data for login
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Generic function to update form fields as user types
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Function to handle the login process when the "Login" button is pressed
  const handleLogin = async () => {
    //Client-side validation
    if (!form.email || !form.password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    try {
      // Call the login function from API module with the form data
      // Assume 'login' function in '../api.js' returns { status: 'success', token: 'jwt', user: 'userEmail' } on success
      // Or { status: 'error', message: '...' } on failure
      const result = await login(form);

      // Show an alert with the result of the login attempt
      if (result.status === "success") {
        const { token, user } = result.data;
        // Store the JWT token and user email in AsyncStorage for persistent login
        // (so that when you close the app and reopen it, you woulnt have to login again)
        await AsyncStorage.setItem("jwtToken", token);
        await AsyncStorage.setItem("userEmail", user.email);

        Alert.alert("Success", result.message || "Login Successful!");
        onLogin();
      } else {
        // Show error message if login fails
        Alert.alert(
          "Error",
          result.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login API call failed:", error);
      Alert.alert(
        "Error",
        "Network error or unable to connect. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your Wandana account</Text>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          autoCapitalize="none"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Login" color="#7f00ff" onPress={handleLogin} />
      </View>
      <Text style={styles.signupPrompt}>Don't have an account?</Text>
      <View style={styles.signupButtonWrapper}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate("Signup")}
          color="#7f00ff"
        />
      </View>
      {/* write Google login code over here ~rycoe */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7f00ff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  inputLabel: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 4,
    width: "100%",
    maxWidth: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    maxWidth: 300,
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  passwordInputContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 16, // Adjusted margin for consistency
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  eyeIcon: {
    marginLeft: -35,
    padding: 8,
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 16,
  },
  signupPrompt: {
    marginTop: 10,
  },
  signupButtonWrapper: {
    width: 200, // Adjust as needed
    marginTop: 10,
  },
});
