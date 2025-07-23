// screens/SignupScreen.js
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
// import { signup } from "../api"; // No longer needed directly here
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth(); // Get the signup function from AuthContext
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignup = async () => {
    if (!form.username || !form.email || !form.password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }
    if (form.password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
    if (
      form.password.length < 8 ||
      !/[a-zA-Z]/.test(form.password) ||
      !/[0-9]/.test(form.password)
    ) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 8 characters, contain at least one letter and one number."
      );
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      const result = await signup(form); // Call the signup function from useAuth

      if (result.success) {
        Alert.alert("Success", result.message);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], // or "Home" if that's your main screen
        });
      } else {
        Alert.alert(
          "Error",
          result.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Signup process failed:", error);
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
      <Text style={styles.title}>Hi, New Friend!</Text>
      <Text style={styles.subtitle}>
        Set your password to create a Wandana account
      </Text>

      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        style={styles.input}
        value={form.username}
        onChangeText={(value) => handleChange("username", value)}
        autoCapitalize="none"
        placeholder="Choose a username"
        editable={!isLoading}
      />

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
        placeholder="Enter your email"
        keyboardType="email-address"
        editable={!isLoading}
      />

      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          autoCapitalize="none"
          placeholder="Create a password"
          secureTextEntry={!showPassword}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
          disabled={isLoading}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.inputLabel}>Confirm Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          placeholder="Confirm your password"
          secureTextEntry={!showConfirm}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={styles.eyeIcon}
          disabled={isLoading}
        >
          <Ionicons
            name={showConfirm ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.passwordHint}>
        8 characters minimum, at least one letter, at least one number
      </Text>

      <View style={styles.buttonWrapper}>
        <Button
          title={isLoading ? "Registering..." : "Register"}
          color="#7f00ff"
          onPress={handleSignup}
          disabled={isLoading}
        />
      </View>

      <Text style={styles.loginPrompt}>Already have an account?</Text>
      <View style={styles.loginButtonWrapper}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
          color="#7f00ff"
          disabled={isLoading}
        />
      </View>
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
    marginBottom: 8,
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
    marginLeft: -35, // Adjust based on your icon size/padding @Adam-Amingo @ndonkoh
    padding: 8,
  },
  passwordHint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 16,
  },
  loginPrompt: {
    marginTop: 10,
  },
  loginButtonWrapper: {
    width: 200, // Adjust as needed
    marginTop: 10,
  },
});
