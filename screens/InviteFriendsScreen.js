import React from 'react';
import { View, Text, Button, StyleSheet, Share } from 'react-native';

export default function InviteFriendsScreen() {
  const referralCode = 'ABC123'; // Replace with dynamic code if you have one
  const appLink = 'https://yourapp.com/download'; // Replace with your actual app link

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this awesome app! Use my referral code ${referralCode} to sign up: ${appLink}`,
      });
    } catch (error) {
      alert('Error sharing: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Friends</Text>
      <Text style={styles.text}>
        Share your referral code and invite friends to join our app!
      </Text>
      <Text style={styles.codeLabel}>Your Referral Code:</Text>
      <Text style={styles.code}>{referralCode}</Text>
      <Button title="Share Invite" onPress={onShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18 },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 16 },
  codeLabel: { fontSize: 16, marginTop: 20 },
  code: { fontSize: 24, fontWeight: 'bold', color: '#7f00ff', marginBottom: 24 },
});