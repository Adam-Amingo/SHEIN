// screens/WelcomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet, // Import StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const countries = [
  { name: "Ghana", languages: ["English", "Akan", "Ewe"], currency: "GHS ₵" },
  {
    name: "United States",
    languages: ["English", "Spanish"],
    currency: "USD $",
  },
  { name: "France", languages: ["French"], currency: "EUR €" },
  {
    name: "Nigeria",
    languages: ["English", "Hausa", "Yoruba", "Igbo"],
    currency: "NGN ₦",
  },
  { name: "Germany", languages: ["German"], currency: "EUR €" },
  { name: "Spain", languages: ["Spanish"], currency: "EUR €" },
  { name: "Italy", languages: ["Italian"], currency: "EUR €" },
  { name: "Japan", languages: ["Japanese"], currency: "JPY ¥" },
  { name: "China", languages: ["Chinese"], currency: "CNY ¥" },
  { name: "India", languages: ["Hindi", "English"], currency: "INR ₹" },
  { name: "Brazil", languages: ["Portuguese"], currency: "BRL R$" },
  {
    name: "South Africa",
    languages: ["English", "Afrikaans", "Zulu"],
    currency: "ZAR R",
  },
];

const allLanguages = Array.from(new Set(countries.flatMap((c) => c.languages)));
const allCurrencies = Array.from(new Set(countries.map((c) => c.currency)));

export default function WelcomeScreen() {
  // Removed setIsAuthenticated prop
  const navigation = useNavigation(); // Get navigation object

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    countries[0].languages[0]
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    countries[0].currency
  );

  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  // When country changes, update language and currency defaults
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0]);
    setSelectedCurrency(country.currency);
    setCountryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Sky map or decorative image at the top */}
      <View style={styles.topImageContainer}>
        <Image
          source={require("../src/assets/sky.png")} // Ensure this path is correct
          style={styles.topImage}
        />
      </View>
      {/* Content below the image */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to WANDANA</Text>
        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
          <Text style={styles.selectedValue}>{selectedCountry.name}</Text>
        </TouchableOpacity>
        {/* Language */}
        <Text style={styles.label}>Language</Text>
        <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
          <Text style={styles.selectedValue}>{selectedLanguage}</Text>
        </TouchableOpacity>
        {/* Currency */}
        <Text style={styles.label}>Currency</Text>
        <TouchableOpacity onPress={() => setCurrencyModalVisible(true)}>
          <Text style={styles.selectedValue}>{selectedCurrency}</Text>
        </TouchableOpacity>

        {/* Country Modal */}
        <Modal visible={countryModalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <FlatList
                data={countries}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleCountrySelect(item)}
                    style={styles.modalOption}
                  >
                    <Text style={styles.modalOptionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Cancel"
                onPress={() => setCountryModalVisible(false)}
                color="#888"
              />
            </View>
          </View>
        </Modal>

        {/* Language Modal */}
        <Modal visible={languageModalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <FlatList
                data={selectedCountry.languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedLanguage(item);
                      setLanguageModalVisible(false);
                    }}
                    style={styles.modalOption}
                  >
                    <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Cancel"
                onPress={() => setLanguageModalVisible(false)}
                color="#888"
              />
            </View>
          </View>
        </Modal>

        {/* Currency Modal */}
        <Modal visible={currencyModalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <FlatList
                data={allCurrencies}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCurrency(item);
                      setCurrencyModalVisible(false);
                    }}
                    style={styles.modalOption}
                  >
                    <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Cancel"
                onPress={() => setCurrencyModalVisible(false)}
                color="#888"
              />
            </View>
          </View>
        </Modal>

        <View style={styles.goShoppingButtonContainer}>
          <Button
            title="Go Shopping"
            color="#7f00ff"
            // --- FIX: Navigate to Login screen instead of calling setIsAuthenticated ---
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <Text style={styles.hintText}>
          You can go to the “Settings” page to modify later
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topImageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0eaff",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  contentContainer: {
    flex: 55,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 27,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7f00ff",
    marginBottom: 45,
    marginTop: 40,
    letterSpacing: 2,
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 16,
    color: "#7f00ff",
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 300,
    maxHeight: 400,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: "#7f00ff",
  },
  goShoppingButtonContainer: {
    width: 300,
    marginBottom: 14,
    marginTop: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  hintText: {
    fontSize: 12,
    color: "#888",
    marginTop: 11,
    textAlign: "center",
  },
});
