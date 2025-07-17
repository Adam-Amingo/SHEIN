
// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// // import ProductListComponent from '../components/ProductListComponent';
// // import TabItem from '../components/TabItem';
// // import TopNav from '../components/TopNav';

// // const subcategories = [
// //   'Official dress',
// //   'Casual dress',
// //   'Beachwear',
// //   ' Sportswear',
// //   'Nightwear',
// //   'Footwear',
// //   'Bags',
// //   'Jewelry',
// //   'Electronics',
// //   ' Furniture'

// // ];

// // export default function CategoryScreen({ navigation }) {
// //   const [selected, setSelected] = useState(subcategories[0]);
// //   return (

// //     <View style={{ flex: 1 }}>
// //       <TopNav />
// //       <View style={{ flex: 1, flexDirection: 'row' }}>
// //         <View style={{ width: '26%', backgroundColor: '#f0f0f0', paddingVertical: 10 }}>
// //           <FlatList
// //             data={subcategories}
// //             keyExtractor={(item) => item}
// //             renderItem={({ item }) => (
// //               <TouchableOpacity
// //                 onPress={() => setSelected(item)}
// //                 style={{
// //                   paddingVertical: 4,
// //                   paddingHorizontal: 1,
// //                   backgroundColor: selected === item ? '#333' : 'transparent',
// //                   borderRadius: 8,
// //                   marginBottom: 8,
// //                   marginTop: 20
// //                 }}
// //               >
// //                 <Text style={{ color: selected === item ? '#fff' : '#333', fontWeight: 'bold' }}>
// //                   {item}
// //                 </Text>
// //               </TouchableOpacity>
// //             )}
// //           />

// //         </View>

// //         <View style={{ flex: 1, padding: 0, backgroundColor: 'white' }}>
// //           <ProductListComponent navigation={navigation} />

// //         </View>
// //       </View>
// //       <TabItem />

// //     </View>


// //   );
// // }
// /////////////////////////////////////////////////
// ////////////////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
// import ProductListComponent from '../components/ProductListComponent';
// import TopNav from '../components/TopNav';

// const subcategories = [
//   'Official dress',
//   'Casual dress',
//   'Beachwear',
//   'Sportswear',
//   'Nightwear',
//   'Footwear',
//   'Bags',
//   'Jewelry',
//   'Electronics',
//   'Furniture'
// ];

// export default function CategoryScreen({ navigation }) {
//   const [selected, setSelected] = useState(subcategories[0]);
//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <TopNav />
//       <View style={{ flex: 1 }}>
//         <ProductListComponent navigation={navigation} selectedCategory={selected} />
//       </View>
//       {/* Horizontal category bar at the bottom */}
//       <View style={{
//         borderTopWidth: 1,
//         borderTopColor: '#eee',
//         backgroundColor: '#faf9fd',
//         paddingVertical: 8,
//         paddingBottom: 12,
//       }}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
//         >
//           {subcategories.map((item) => (
//             <TouchableOpacity
//               key={item}
//               onPress={() => setSelected(item)}
//               style={{
//                 paddingVertical: 8,
//                 paddingHorizontal: 18,
//                 backgroundColor: selected === item ? '#7f00ff' : 'transparent',
//                 borderRadius: 20,
//                 marginRight: 10,
//                 borderWidth: selected === item ? 0 : 1,
//                 borderColor: selected === item ? 'transparent' : '#e0e0e0',
//               }}
//             >
//               <Text style={{
//                 color: selected === item ? '#fff' : '#7F55B1',
//                 fontWeight: selected === item ? 'bold' : '600',
//                 fontSize: 15,
//               }}>
//                 {item.trim()}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }
//////////////////////////////////////
//////////////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import TopNav from '../components/TopNav';
// import ProductListComponent from '../components/ProductListComponent';

// const subcategories = {
//   All: ['Official dress', 'Casual dress', 'Beachwear', 'Sportswear', 'Nightwear', 'Footwear', 'Bags', 'Jewelry', 'Electronics', 'Furniture'],
//   Men: ['Shirts', 'Trousers', 'Suits', 'Sportswear', 'Footwear'],
//   Women: ['Dresses', 'Tops', 'Skirts', 'Handbags', 'Jewelry'],
//   // ...add more as needed
// };

// export default function CategoryScreen({ navigation }) {
//   const [activeMain, setActiveMain] = useState('All');
//   const [activeSub, setActiveSub] = useState(subcategories['All'][0]);

//   // When main category changes, reset subcategory
//   const handleMainChange = (main) => {
//     setActiveMain(main);
//     setActiveSub(subcategories[main][0]);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       {/* TopNav should accept a prop or context to set activeMain */}
//       <TopNav activeTab={activeMain} onTabChange={handleMainChange} />
//       {/* Subcategory bar */}
//       <View style={{
//         borderTopWidth: 1,
//         borderTopColor: '#eee',
//         backgroundColor: '#faf9fd',
//         paddingVertical: 8,
//         paddingBottom: 12,
//       }}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
//         >
//           {subcategories[activeMain].map((item) => (
//             <TouchableOpacity
//               key={item}
//               onPress={() => setActiveSub(item)}
//               style={{
//                 paddingVertical: 8,
//                 paddingHorizontal: 18,
//                 backgroundColor: activeSub === item ? '#7f00ff' : 'transparent',
//                 borderRadius: 20,
//                 marginRight: 10,
//                 borderWidth: activeSub === item ? 0 : 1,
//                 borderColor: activeSub === item ? 'transparent' : '#e0e0e0',
//               }}
//             >
//               <Text style={{
//                 color: activeSub === item ? '#fff' : '#7F55B1',
//                 fontWeight: activeSub === item ? 'bold' : '600',
//                 fontSize: 15,
//               }}>
//                 {item.trim()}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//       {/* Product list filtered by activeMain and activeSub */}
//       <View style={{ flex: 1 }}>
//         <ProductListComponent
//           navigation={navigation}
//           mainCategory={activeMain}
//           subCategory={activeSub}
//         />
//       </View>
//     </View>
//   );
// }

//////////////////////////////////////////
///////////////////////////////////////

// import React, { useState, useMemo } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
// import TopNav from '../components/TopNav';
// import ProductListComponent from '../components/ProductListComponent';

// const subcategories = {
//   All: ['Official dress', 'Casual dress', 'Beachwear', 'Sportswear', 'Nightwear', 'Footwear', 'Bags', 'Jewelry', 'Electronics', 'Furniture'],
//   Men: ['Shirts', 'Trousers', 'Suits', 'Sportswear', 'Footwear'],
//   Women: ['Dresses', 'Tops', 'Skirts', 'Handbags', 'Jewelry'],
//   // Add more as needed
// };

// export default function CategoryScreen({ navigation }) {
//   const [activeMain, setActiveMain] = useState('All');
//   const [activeSub, setActiveSub] = useState(subcategories['All'][0]);

//   // Animated value (optional)
//   const fadeAnim = useMemo(() => new Animated.Value(1), []);

//   const handleMainChange = (main) => {
//     const newSubList = subcategories[main];
//     setActiveMain(main);
//     setActiveSub(newSubList?.[0] || '');
//   };

//   const handleSubChange = (item) => {
//     // Fade out
//     Animated.sequence([
//       Animated.timing(fadeAnim, {
//         toValue: 0.3,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     setActiveSub(item);
//   };

//   const currentSubcategories = useMemo(() => subcategories[activeMain] || [], [activeMain]);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       {/* Top Navigation */}
//       <TopNav activeTab={activeMain} onTabChange={handleMainChange} />

//       {/* Subcategory Horizontal Scroll */}
//       <View style={{
//         borderTopWidth: 1,
//         borderTopColor: '#eee',
//         backgroundColor: '#faf9fd',
//         paddingVertical: 8,
//         paddingBottom: 12,
//       }}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
//         >
//           {currentSubcategories.length > 0 ? (
//             currentSubcategories.map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 onPress={() => handleSubChange(item)}
//                 style={{
//                   paddingVertical: 8,
//                   paddingHorizontal: 18,
//                   backgroundColor: activeSub === item ? '#7f00ff' : 'transparent',
//                   borderRadius: 20,
//                   marginRight: 10,
//                   borderWidth: activeSub === item ? 0 : 1,
//                   borderColor: activeSub === item ? 'transparent' : '#e0e0e0',
//                 }}
//               >
//                 <Text style={{
//                   color: activeSub === item ? '#fff' : '#7F55B1',
//                   fontWeight: activeSub === item ? 'bold' : '600',
//                   fontSize: 15,
//                 }}>
//                   {item.trim()}
//                 </Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text style={{ paddingHorizontal: 16, fontStyle: 'italic', color: '#aaa' }}>
//               No subcategories found.
//             </Text>
//           )}
//         </ScrollView>
//       </View>

//       {/* Product List with Fade Animation */}
//       <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
//         <ProductListComponent
//           navigation={navigation}
//           mainCategory={activeMain}
//           subCategory={activeSub}
//         />
//       </Animated.View>
//     </View>
//   );
// }



import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import TopNav from '../components/TopNav';
import ProductListComponent from '../components/ProductListComponent';

const subcategories = {
  All: ['Official dress', 'Casual dress', 'Beachwear', 'Sportswear', 'Nightwear', 'Footwear', 'Bags', 'Jewelry', 'Electronics', 'Furniture'],
  Men: ['Men Casual', 'Men Official', 'Trousers', 'Suits', 'Sportswear', 'Footwear'],
  Women: ['Casual dress', 'Official dress', 'Tops', 'Bags', 'Jewelry', 'Footwear'],
  Kids: ['Casual dress', 'Tops', 'Footwear', 'Bags', 'Jewelry', 'Beachwear',],
  Curve: ['Casual dress', 'Tops', 'Footwear', 'Bags', 'Jewelry', 'Beachwear'],
  Home: ['Furniture', 'Decor', 'Kitchenware', 'Bedding', 'Lighting'],
};

export default function CategoryScreen({ navigation }) {
  const [activeMain, setActiveMain] = useState('All');
  const [activeSub, setActiveSub] = useState(subcategories['All'][0]);

  const currentSubcategories = useMemo(() => subcategories[activeMain] || [], [activeMain]);

  const handleMainChange = (main) => {
    const newSubList = subcategories[main];
    setActiveMain(main);
    setActiveSub(newSubList?.[0] || '');
  };

  const handleSubChange = (item) => {
    if (item !== activeSub) {
      setActiveSub(item);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Top Navigation */}
      <TopNav activeTab={activeMain} onTabChange={handleMainChange} />


      {/* Subcategory Scroll */}
      <View style={{
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#faf9fd',
        paddingVertical: 8,
        paddingBottom: 12,
      }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
        >
          {currentSubcategories.length > 0 ? (
            currentSubcategories.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleSubChange(item)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 18,
                  backgroundColor: activeSub === item ? '#7f00ff' : 'transparent',
                  borderRadius: 20,
                  marginRight: 10,
                  borderWidth: activeSub === item ? 0 : 1,
                  borderColor: activeSub === item ? 'transparent' : '#e0e0e0',
                }}
              >
                <Text style={{
                  color: activeSub === item ? '#fff' : '#7F55B1',
                  fontWeight: activeSub === item ? 'bold' : '600',
                  fontSize: 15,
                }}>
                  {item.trim()}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ paddingHorizontal: 16, fontStyle: 'italic', color: '#aaa' }}>
              No subcategories found.
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Product List */}
      <View style={{ flex: 1 }}>
        <ProductListComponent
          navigation={navigation}
          mainCategory={activeMain}
          subCategory={activeSub}
        />
      </View>
    </View>
  );
}
