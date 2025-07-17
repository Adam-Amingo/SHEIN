// components/TabItem.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TabItem({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTabBorder]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextFocused]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 0,
  },
  activeTabBorder: {
    borderBottomColor: '#7f00ff',
  },
  tabText: {
    fontWeight: '600',
    color: '#7F55B1',
  },
  tabTextFocused: {
    color: '#7f00ff',
  },
});
