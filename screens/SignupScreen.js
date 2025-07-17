// @Adam-Amingo @ndonkoh I am changing the SignupScreen to use the signup function from the API module.
// This new format would help me implement my module better :) ~rycoe

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
import { signup } from "../api"; // Import the signup function from the API module

export default function SignupScreen({ navigation }) {
  // State to hold form data for signup (email, password, username)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
    

    // In my backend module, there is sex and dob but your original code didnt have it so im not going to implement it
  });

  // State for confirming password (separate from form as it's for validation so I'll use an in-screen function)
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Generic function to update form fields as user types
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Function to handle the signup process when the "Sign Up" button is pressed
  const handleSignup = async () => {
    //Client-side validation
    if (!form.username || !form.email || !form.password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }
    // In-screen function for confirm password
    if (form.password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
    // Basic password strength check (I actually got this part from chatgpt and idk if it'll work)
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

    try {
      // Call the signup function from the API module with the form data
      const result = await signup(form);

      // Show an alert with the result of the signup attempt
      if (result.status === "success") {
        Alert.alert("Success", result.message);
        // Navigate to login screen after successful signup
        navigation.navigate("Login");
      } else {
        // Show error message if signup fails
        Alert.alert(
          "Error",
          result.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Signup API call failed:", error);
      Alert.alert(
        "Error",
        "Network error or unable to connect. Please try again later."
      );
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
      />

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
          placeholder="Create a password"
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

      <Text style={styles.inputLabel}>Confirm Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Managed by its own state setter (In-screen function from above)
          autoCapitalize="none"
          placeholder="Confirm your password"
          secureTextEntry={!showConfirm}
        />
        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={styles.eyeIcon}
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
        <Button title="Register" color="#7f00ff" onPress={handleSignup} />
      </View>

      <Text style={styles.loginPrompt}>Already have an account?</Text>
      <View style={styles.loginButtonWrapper}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
          color="#7f00ff"
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

//~rycoe
