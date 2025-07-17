import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AddressContext } from '../context/AddressContext';
const initialAddresses = [
  {
    id: '1',
    label: 'Home',
    address: '123 Main St, Accra, Ghana',
    latitude: 5.5600,
    longitude: -0.2050,
    selected: true,
  },
];

export default function ManageAddressesScreen() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const { setSelectedAddress } = useContext(AddressContext);

  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [marker, setMarker] = useState({
    latitude: 5.5600,
    longitude: -0.2050,
  });

  const selectAddress = (id) => {
  const selected = addresses.find(a => a.id === id);
  setAddresses(addresses.map(a => ({ ...a, selected: a.id === id })));
  setSelectedAddress(selected); // this updates global context
};

  const removeAddress = (id) => {
    Alert.alert(
      'Remove Address',
      'Are you sure you want to remove this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setAddresses(addresses.filter(a => a.id !== id)),
        },
      ]
    );
  };

  const addAddress = () => {
    if (!label.trim() || !address.trim()) {
      Alert.alert('Please enter both label and address.');
      return;
    }
    setAddresses([
      ...addresses,
      {
        id: (addresses.length + 1).toString(),
        label,
        address,
        latitude: marker.latitude,
        longitude: marker.longitude,
        selected: false,
      },
    ]);
    setLabel('');
    setAddress('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.addressItem, item.selected && styles.selected]}
      onPress={() => selectAddress(item.id)}
      onLongPress={() => removeAddress(item.id)}
    >
      <View>
        <Text style={styles.addressLabel}>{item.label}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
        <Text style={styles.coords}>
          Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)}
        </Text>
      </View>
      {item.selected && <Text style={styles.selectedText}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Addresses</Text>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No addresses added.</Text>}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.sectionTitle}>Add New Address</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={e => setMarker(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={marker} />
      </MapView>
      <Text style={styles.coords}>
        Selected: Lat {marker.latitude.toFixed(4)}, Lng {marker.longitude.toFixed(4)}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Label (e.g. Home, Work)"
        value={label}
        onChangeText={setLabel}
      />
      <TextInput
        style={[styles.input, { minHeight: 40 }]}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <Button title="Add Address" onPress={addAddress} style={styles.Button} />
      <Text style={styles.info}>
        Tap to select default. Long press to remove an address. Tap the map to set location.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 8 },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 1,
    backgroundColor: '#f9f9f9',
  },
  selected: {
    borderColor: '#7f00ff',
    backgroundColor: '#e7ddfa',
  },
  addressLabel: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  addressText: { color: '#555', fontSize: 15 },
  coords: { color: '#888', fontSize: 13, marginTop: 2 },
  selectedText: { color: '#7f00ff', fontWeight: 'bold', fontSize: 18 },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 20
  },
  info: {
    color: '#888'
    , fontSize: 11,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  Button: {
    backgroundColor: 'red'
  }
});