import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌟 About Us</Text>
      <Text style={styles.text}>
        Welcome to [Your App Name], your go‑to destination for the latest trends and unbeatable fashion deals. We’re committed to bringing high-quality, stylish apparel straight to your door. Here’s what sets us apart:
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.text}>
        To empower every individual with stylish, affordable fashion that boosts confidence and makes a statement.
      </Text>

      <Text style={styles.sectionTitle}>Why Choose Us</Text>
      <Text style={styles.text}>
        We curate diverse collections—from everyday essentials to statement pieces—sourced from trusted suppliers. Each item meets high standards in style, quality, and value.
        {'\n'}fivedottwelve.com
      </Text>

      <Text style={styles.sectionTitle}>Our Values</Text>
      <Text style={styles.text}>
        • Quality You Can Trust – We rigorously vet each product to ensure top-quality.{"\n"}
        • Style for All – Fashion shouldn't be exclusive; our range is for every body and budget.{"\n"}
        • Customer-First – Fast shipping, easy returns, and responsive support are at our core.
      </Text>

      <Text style={styles.sectionTitle}>Explore With Confidence</Text>
      <Text style={styles.text}>
        Discover new arrivals, seasonal trends, and exclusive deals—all tailored for your style journey.
      </Text>

      <Text style={styles.sectionTitle}>Get in Touch</Text>
      <Text style={styles.text}>
        We’re here for you. Contact us anytime:
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('mailto:support@yourapp.com')}
      >
        📧 support@yourapp.com
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('tel:+233246187487')}
      >
        📞 +233‑246‑187‑487
      </Text>
      <Text style={styles.text}>
        Follow us on [Instagram/Facebook/Twitter] for fresh drops and styling tips.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width:"100%", backgroundColor: '#fff', padding: 33 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 18, marginBottom: 4 },
  text: { fontSize: 12, marginBottom: 5, color: '#333' },
  link: { color: '#007bff', marginBottom: 8, fontSize: 16 },
});