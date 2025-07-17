import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import

const countries = [
  { label: 'United States', value: 'US', currency: 'USD ($)' },
  { label: 'United Kingdom', value: 'UK', currency: 'GBP (£)' },
  { label: 'Ghana', value: 'GH', currency: 'GHS (₵)' },
  { label: 'Nigeria', value: 'NG', currency: 'NGN (₦)' },
  { label: 'South Africa', value: 'ZA', currency: 'ZAR (R)' },
  { label: 'India', value: 'IN', currency: 'INR (₹)' },
  // Add more countries as needed
];

export default function LocationAndCurrencyScreen() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [modalVisible, setModalVisible] = useState(false);

  const selected = countries.find(c => c.value === selectedCountry);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location & Currency</Text>
      <Text style={styles.label}>Select your country:</Text>
      {Platform.OS === 'android' ? (
        <Picker
          selectedValue={selectedCountry}
          style={styles.picker}
          onValueChange={itemValue => setSelectedCountry(itemValue)}
        >
          {countries.map(country => (
            <Picker.Item key={country.value} label={country.label} value={country.value} />
          ))}
        </Picker>
      ) : (
        <>
          <TouchableOpacity
            style={styles.iosPickerButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.iosPickerText}>{selected.label}</Text>
          </TouchableOpacity>
          <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <FlatList
                data={countries}
                keyExtractor={item => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedCountry(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.iosPickerText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#007bff', textAlign: 'center', margin: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
      <Text style={styles.label}>Currency:</Text>
      <Text style={styles.currency}>{selected.currency}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 20, marginBottom: 8 },
  picker: { height: 50, width: '100%' },
  currency: { fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#7f00ff' },
  iosPickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  iosPickerText: { fontSize: 16 },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 40,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: '70%',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});