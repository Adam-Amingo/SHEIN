import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import TabItem from '../components/TabItem';
import { StyleSheet } from 'react-native';

const tabs = ['All', 'Women', 'Lingerie & Sleep', 'Men', 'Shoes', 'Men', 'Bra', 'Jewelry & Acc', 'Curve', 'Home', 'Bags', 'Sports', 'Electronics'];
export default function TrendsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <SafeAreaView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {tabs.map((tab, idx) => (
          <TabItem
            key={idx}
            label={tab}
            isActive={activeTab === idx}
            onPress={() => setActiveTab(idx)}
          />
        ))}
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#E0F0FF',
    padding: 10,
    marginTop:60
  }})

// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
// import TabItem from '../components/TabItem';
// import { StyleSheet } from 'react-native';

// // Example product data
// const products = {
//   Women: [
//     { id: 1, name: 'Floral Dress', image: require('../assets/floral-dress.jpg') },
//     { id: 2, name: 'Summer Top', image: require('../assets/summer-top.jpg') },
//   ],
//   Men: [
//     { id: 3, name: 'Casual Shirt', image: require('../assets/casual-shirt.jpg') },
//     { id: 4, name: 'Jeans', image: require('../assets/jeans.jpg') },
//   ],
//   // ...add for other categories
// };

// const tabs = ['All', 'Women', 'Men', 'Shoes', 'Home', 'Bags'];

// export default function TrendsScreen() {
//   const [activeTab, setActiveTab] = useState(0);

//   // Get current tab name
//   const currentTab = tabs[activeTab];

//   // Get recommended products for the selected tab
//   const recommended = products[currentTab] || [];

//   return (
//     <SafeAreaView>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
//         {tabs.map((tab, idx) => (
//           <TabItem
//             key={idx}
//             label={tab}
//             isActive={activeTab === idx}
//             onPress={() => setActiveTab(idx)}
//           />
//         ))}
//       </ScrollView>
//       <Text style={styles.heading}>Recommended for you</Text>
//       <FlatList
//         data={recommended}
//         keyExtractor={item => item.id.toString()}
//         horizontal
//         renderItem={({ item }) => (
//           <View style={styles.productCard}>
//             <Image source={item.image} style={styles.productImage} />
//             <Text>{item.name}</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   tabContainer: {
//     backgroundColor: '#E0F0FF',
//     padding: 10,
//     marginTop: 60,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     margin: 16,
//   },
//   productCard: {
//     width: 120,
//     margin: 8,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
// });