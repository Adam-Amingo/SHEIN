
import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from '../ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
export default function MeScreen({ navigation }) {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ flex: 1, paddingTop: 10, backgroundColor: darkTheme ? '#222' : '#fff' }}>
      <View style={[styles.container, darkTheme && styles.darkContainer]}>
        {/* Profile Section */}
        {/* <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('C:\\Users\\Ewuraba\\Documents\\SHEIN\\src\\assets\\sky.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : null}
          <Text style={styles.changePhoto}>Change Photo</Text>
        </TouchableOpacity>
        <Text style={[styles.text, darkTheme && styles.darkText]}>Ewuraba</Text>
        <Text style={[styles.subText, darkTheme && styles.darkText]}>ewuraba@email.com</Text>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>Account</Text>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ManageAddresses')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Manage Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PaymentMethods')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Payment Methods</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('LocationAndCurrency')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Location & Currency</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>
        </View>


        {/* Security & Privacy Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>Security & Privacy</Text>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PrivacySettings')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Privacy Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                      // Handle your logout logic here (e.g., clear tokens, navigate to login)
                      // Example: navigation.replace('Login');
                    },
                  },
                ]
              );
            }}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>Support</Text>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('HelpCenter')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ContactSupport')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Contact Support</Text>
          </TouchableOpacity>

        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkTheme && styles.darkText]}>Legal</Text>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('About')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>About</Text>
          </TouchableOpacity>
        </View>

        {/* Optional */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                      // Call your backend to delete the account here
                      Alert.alert('Account Deleted', 'Your account has been deleted.');
                      // Optionally, log out or navigate to login screen
                    },
                  },
                ]
              );
            }}
          >
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('InviteFriends')}>
            <Text style={[styles.rowText, darkTheme && styles.darkText]}>Invite Friends</Text>
          </TouchableOpacity>
        </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 100,
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#888',
    alignSelf: 'center',
  },
  changePhoto: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    color: '#222',
    marginBottom: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  section: {
    width: '90%',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowText: {
    fontSize: 16,
    color: '#222',
  },
});