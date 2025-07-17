import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HelpCenterScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💡 Help Center</Text>
      <Text style={styles.text}>Have a question? Find similar ones with answers!</Text>

      <Text style={styles.sectionTitle}>📦 Orders & Shipping</Text>
      <Text style={styles.q}>Q: Where’s my order?</Text>
      <Text style={styles.a}>A: Track your shipment using the link in My Orders.</Text>
      <Text style={styles.q}>Q: Shipping charges?</Text>
      <Text style={styles.a}>A: Shipping is free for orders above $50; otherwise, rates are calculated at checkout.</Text>

      <Text style={styles.sectionTitle}>💲 Returns & Refunds</Text>
      <Text style={styles.q}>Q: How do I return an item?</Text>
      <Text style={styles.a}>A: Go to Returns, select your order/item, and request a return label within 30 days.</Text>
      <Text style={styles.q}>Q: When will I get my refund?</Text>
      <Text style={styles.a}>A: Refunds are processed within 5–7 business days after we receive your return.</Text>

      <Text style={styles.sectionTitle}>🧾 Payments</Text>
      <Text style={styles.q}>Q: What payment methods do you accept?</Text>
      <Text style={styles.a}>A: We accept VISA, MasterCard, PayPal, and Apple Pay.</Text>
      <Text style={styles.q}>Q: Why was my payment declined?</Text>
      <Text style={styles.a}>A: Please check your card details or contact your bank for assistance.</Text>
      <Text style={styles.sectionTitle}>📱 Account & App</Text>
      <Text style={styles.q}>Q: How do I reset my password?</Text>
      <Text style={styles.a}>A: Tap Forgot Password on the login screen and follow the instructions.</Text>
      <Text style={styles.q}>Q: How can I delete my account?</Text>
      <Text style={styles.a}>A: Please contact support through the app or email us at support@[yourapp].com.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width:"100%", backgroundColor: '#fff', padding: 10 , marginTop:30},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 18, marginBottom: 4 },
  text: { fontSize: 14, marginBottom: 5, color: '#333' },
  q: { fontWeight: 'bold', marginTop: 10, color: '#222', fontSize: 16 },
  a: { marginLeft: 10, marginBottom: 4, color: '#333', fontSize: 16 },
});