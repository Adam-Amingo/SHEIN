// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator, // Added for loading state
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

export default function LoginScreen({ navigation }) {
  const { login } = useAuth(); // Get the login function from AuthContext
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      const result = await login(form); // Call the login function from useAuth

      // --- FIX: Change result.status to result.success ---
      if (result.success) {
        Alert.alert("Success", result.message || "Login Successful!");
        // The AuthContext will automatically update isAuthenticated,
        // and App.js will handle navigation to AppStack.
        // No explicit navigation.navigate('MainTabs') or onLogin() needed here.
      } else {
        Alert.alert(
          "Error",
          result.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login process failed:", error);
      Alert.alert(
        "Error",
        "Network error or unable to connect. Please try again later."
      );
    } finally {
      setIsLoading(false); // Set loading to false
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
        editable={!isLoading} // Disable input when loading
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
          editable={!isLoading} // Disable input when loading
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
          disabled={isLoading} // Disable button when loading
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title={isLoading ? "Logging in..." : "Login"}
          color="#7f00ff"
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>
      <Text style={styles.signupPrompt}>Don't have an account?</Text>
      <View style={styles.signupButtonWrapper}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate("Signup")}
          color="#7f00ff"
          disabled={isLoading} // Disable button when loading
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
