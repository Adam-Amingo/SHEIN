import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

export default function PrivacySettingsScreen() {
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Settings</Text>
      <Text style={styles.desc}>
        Manage your privacy preferences below. You can control how we use your data to improve your experience.
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Personalized Ads</Text>
        <Switch value={personalizedAds} onValueChange={setPersonalizedAds} />
      </View>
      <Text style={styles.info}>
        Allow us to show you ads tailored to your interests.
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Data Sharing</Text>
        <Switch value={dataSharing} onValueChange={setDataSharing} />
      </View>
      <Text style={styles.info}>
        Allow sharing of anonymized data with trusted partners to improve our services.
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Email Updates</Text>
        <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
      </View>
      <Text style={styles.info}>
        Receive updates about new products, offers, and app features.
      </Text>

      <Text style={styles.policy}>
        For more details, please read our Privacy Policy in the Legal section.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 , marginTop: 30 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  desc: { fontSize: 16, marginBottom: 20, color: '#333' },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  label: { fontSize: 16, color: '#222' },
  info: { fontSize: 14, color: '#666', marginBottom: 8, marginLeft: 2 },
  policy: { fontSize: 14, color: '#888', marginTop: 30, textAlign: 'center' },
}); 