import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

const initialMethods = [
  { id: '1', type: 'Visa', last4: '1234', selected: true },
  { id: '2', type: 'MasterCard', last4: '5678', selected: false },
  { id: '3', type: 'PayPal', email: 'user@email.com', selected: false },
];

export default function PaymentMethodsScreen() {
  const [methods, setMethods] = useState(initialMethods);

  const selectMethod = (id) => {
    setMethods(methods.map(m => ({ ...m, selected: m.id === id })));
  };

  const removeMethod = (id) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setMethods(methods.filter(m => m.id !== id)),
        },
      ]
    );
  };

  const addMethod = () => {
    Alert.alert('Add Payment Method', 'This is a placeholder for adding a new payment method.');
    // You can navigate to an "AddPaymentMethod" screen or show a modal here
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.method, item.selected && styles.selected]}
      onPress={() => selectMethod(item.id)}
      onLongPress={() => removeMethod(item.id)}
    >
      <Text style={styles.methodText}>
        {item.type === 'PayPal'
          ? `PayPal (${item.email})`
          : `${item.type} •••• ${item.last4}`}
      </Text>
      {item.selected && <Text style={styles.selectedText}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Methods</Text>
      <FlatList
        data={methods}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No payment methods added.</Text>}
        style={{ marginBottom: 20 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={addMethod}>
        <Text style={styles.addButtonText}>+ Add Payment Method</Text>
      </TouchableOpacity>
      <Text style={styles.info}>
        Tap to select. Long press to remove a payment method.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  selected: {
    borderColor: '#7f00ff',
    backgroundColor: '#e7ddfa',
  },
  methodText: { fontSize: 16, color: '#333' },
  selectedText: { color: '#7f00ff', fontWeight: 'bold', fontSize: 18 },
  addButton: {
    backgroundColor: '#7f00ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#aaa', marginVertical: 20 },
  info: { color: '#888', fontSize: 14, textAlign: 'center', marginTop: 10 },
});