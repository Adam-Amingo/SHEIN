

import React from 'react';
import { View, StyleSheet } from 'react-native';
import FadeInView from '../components/FadeInView';
import TopNavBar from '../components/TopNav';
import Banner from '../components/Banner';
import ProductListComponent from '../components/ProductListComponent';

export default function HomeScreen({ navigation }) {
  return (
    <FadeInView style={styles.container}>
      <TopNavBar />
      <ProductListComponent navigation={navigation} showBanner />
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
