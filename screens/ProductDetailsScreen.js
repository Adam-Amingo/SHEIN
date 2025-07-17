

// // import React, { useState, useContext } from 'react';
// // import {
// //   View,
// //   Text,
// //   Image,
// //   TouchableOpacity,
// //   StyleSheet,
// //   FlatList,
// //   ScrollView,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { CartContext } from '../context/CartContext';
// // import { WishlistContext } from '../context/WishlistContext';
// // import { Dimensions } from 'react-native';
// // import REVIEWS from '../src/data/reviews';
// // import { useFocusEffect } from '@react-navigation/native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';



// // const ProductDetailsScreen = ({ route, navigation }) => {
// //   const { item } = route.params;
// //   const { addToCart } = useContext(CartContext);
// //   const { addToWishlist } = useContext(WishlistContext);

// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedSize, setSelectedSize] = useState('Medium');

// //   const [displayedReviews, setDisplayedReviews] = useState([]);

// //   useFocusEffect(
// //     React.useCallback(() => {
// //       const shuffled = [...REVIEWS].sort(() => 0.5 - Math.random());
// //       const count = Math.floor(Math.random() * 5) + 2; // 3 to 7 reviews
// //       setDisplayedReviews(shuffled.slice(0, count));
// //     }, [])
// //   );



// //   const handleAddToCart = () => {
// //     addToCart({ ...item, quantity, size: selectedSize });
// //     navigation.navigate('MainTabs', { screen: 'Cart' });
// //   };

// //   const handleAddToWishlist = () => {
// //     addToWishlist({ ...item, quantity, size: selectedSize });
// //     navigation.navigate('Wishlist');
// //   };

// //   const renderReview = ({ item }) => (
// //     <View style={styles.reviewCard}>
// //       <View style={styles.reviewHeader}>



// //         {item.avatar ? (
// //           <Image
// //             source={{ uri: item.avatar }}
// //             style={styles.avatarImage}
// //           />
// //         ) : (
// //           <View style={styles.avatarCircle}>
// //             <Text style={styles.avatarText}>{item.name[0]}</Text>
// //           </View>
// //         )}

// //         <View>
// //           <Text style={styles.reviewName}>{item.name}</Text>
// //           <View style={{ flexDirection: 'row', marginTop: 2 }}>
// //             {[...Array(5)].map((_, i) => (
// //               <Icon
// //                 key={i}
// //                 name="star"
// //                 size={16}
// //                 color={i < item.rating ? '#FFD700' : '#ccc'}
// //                 style={{ marginRight: 2 }}
// //               />
// //             ))}
// //           </View>
// //         </View>
// //       </View>
// //       <Text style={styles.reviewComment}>{item.comment}</Text>
// //     </View>
// //   );



// //   return (
// //     <SafeAreaView style={styles.safe} edges={['top']}>
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         <View style={styles.imageContainer}>
// //           <Image source={{ uri: item.image }} style={styles.image} />
// //           {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
// //         </View>

// //         <View style={styles.content}>
// //           <Text style={styles.name}>{item.name}</Text>
// //           <Text style={styles.price}>${item.price.toFixed(2)}</Text>

// //           <Text style={styles.sectionLabel}>Select Size</Text>
// //           <View style={styles.sizeList}>
// //             {['Small', 'Medium', 'Large'].map((size) => (
// //               <TouchableOpacity
// //                 key={size}
// //                 onPress={() => setSelectedSize(size)}
// //                 style={[
// //                   styles.sizeButton,
// //                   selectedSize === size && styles.selectedSize,
// //                 ]}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.sizeText,
// //                     selectedSize === size && styles.selectedSizeText,
// //                   ]}
// //                 >
// //                   {size}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>

// //           <Text style={styles.sectionLabel}>Quantity</Text>
// //           <View style={styles.quantityContainer}>
// //             <TouchableOpacity
// //               onPress={() => setQuantity((q) => Math.max(1, q - 1))}
// //               style={styles.qtyButton}
// //             >
// //               <Text style={styles.qtySymbol}>-</Text>
// //             </TouchableOpacity>
// //             <Text style={styles.quantityText}>{quantity}</Text>
// //             <TouchableOpacity
// //               onPress={() => setQuantity((q) => q + 1)}
// //               style={styles.qtyButton}
// //             >
// //               <Text style={styles.qtySymbol}>+</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={styles.buttonRow}>
// //             <TouchableOpacity
// //               style={styles.addToCartButton}
// //               onPress={handleAddToCart}
// //             >
// //               <Text style={styles.addToCartText}>Add to Cart</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={styles.wishlistButton}
// //               onPress={handleAddToWishlist}
// //             >
// //               <Text style={styles.heart}>❤️</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <Text style={styles.sectionLabel}>Customer Reviews</Text>
// //           <FlatList
// //             data={displayedReviews}
// //             keyExtractor={(item) => item.id}
// //             renderItem={renderReview}
// //             scrollEnabled={false}
// //             contentContainerStyle={{ paddingBottom: 60 }}
// //           />
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   safe: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   imageContainer: {
// //     width: '100%',
// //     height: 300,
// //     position: 'relative',
// //   },
// //   image: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'cover',
// //   },
// //   tag: {
// //     position: 'absolute',
// //     top: 16,
// //     left: 16,
// //     backgroundColor: '#7f00ff',
// //     color: '#fff',
// //     paddingHorizontal: 10,
// //     paddingVertical: 4,
// //     borderRadius: 6,
// //     fontWeight: '600',
// //     fontSize: 12,
// //   },
// //   content: {
// //     padding: 20,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: '700',
// //     color: '#333',
// //     marginBottom: 6,
// //   },
// //   price: {
// //     fontSize: 20,
// //     fontWeight: '600',
// //     color: '#7f00ff',
// //     marginBottom: 16,
// //   },
// //   sectionLabel: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     marginBottom: 10,
// //     color: '#444',
// //   },
// //   sizeList: {
// //     flexDirection: 'row',
// //     gap: 10,
// //     marginBottom: 20,
// //   },
// //   sizeButton: {
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 20,
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //   },
// //   selectedSize: {
// //     backgroundColor: '#7f00ff',
// //     borderColor: '#7f00ff',
// //   },
// //   sizeText: {
// //     color: '#444',
// //     fontWeight: '600',
// //   },
// //   selectedSizeText: {
// //     color: '#fff',
// //   },
// //   quantityContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 30,
// //   },
// //   qtyButton: {
// //     backgroundColor: '#eee',
// //     padding: 10,
// //     borderRadius: 12,
// //     width: 40,
// //     alignItems: 'center',
// //   },
// //   qtySymbol: {
// //     fontSize: 20,
// //     fontWeight: '700',
// //   },
// //   quantityText: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     marginHorizontal: 20,
// //   },
// //   buttonRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 30,
// //   },
// //   addToCartButton: {
// //     flex: 1,
// //     backgroundColor: '#7f00ff',
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     marginRight: 12,
// //   },
// //   addToCartText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '700',
// //   },
// //   wishlistButton: {
// //     padding: 14,
// //     borderRadius: 12,
// //     backgroundColor: '#eee',
// //   },
// //   heart: {
// //     fontSize: 20,
// //   },
// //   // reviewCard: {
// //   //   backgroundColor: '#fff',
// //   //   padding: 16,
// //   //   borderRadius: 12,
// //   //   marginBottom: 16,
// //   //   shadowColor: '#000',
// //   //   shadowOffset: { width: 0, height: 2 },
// //   //   shadowOpacity: 0.05,
// //   //   shadowRadius: 4,
// //   //   elevation: 2,
// //   //   borderWidth: 0.5,
// //   //   borderColor: '#eee',
// //   // },
// //   reviewCard: {
// //     backgroundColor: '#fff',
// //     padding: 20,
// //     borderRadius: 14,
// //     marginBottom: 24,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.08,
// //     shadowRadius: 5,
// //     elevation: 3,
// //     borderWidth: 0.5,
// //     borderColor: '#e5e5e5',
// //   },

// //   reviewHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },
// //   avatarCircle: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     backgroundColor: '#e0e0e0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 12,
// //   },
// //   avatarText: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     color: '#444',
// //   },

// //   reviewName: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     color: '#222',
// //     marginBottom: 2,
// //   },

// //   reviewStars: {
// //     fontSize: 14,
// //     marginBottom: 4,
// //     color: '#ffcc00',
// //   },

// //   reviewComment: {
// //     fontSize: 15,
// //     color: '#555',
// //     lineHeight: 22,
// //   },

// //   reviewStars: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 2,
// //   },
// //   reviewRating: {
// //     fontSize: 14,
// //     color: '#ffcc00',
// //     marginLeft: 4,
// //   },
// //   avatarImage: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     marginRight: 12,
// //   },
// //   reviewText: {
// //     fontSize: 14,
// //     color: '#555',
// //     lineHeight: 20,
// //   },
// // });

// // export default ProductDetailsScreen;


// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { CartContext } from '../context/CartContext';
// import { WishlistContext } from '../context/WishlistContext';
// import REVIEWS from '../src/data/reviews';
// import { useFocusEffect } from '@react-navigation/native';

// const ProductDetailsScreen = ({ route, navigation }) => {
//   const { item } = route.params;
//   const { addToCart } = useContext(CartContext);
//   const { addToWishlist } = useContext(WishlistContext);

//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('Medium');
//   const [displayedReviews, setDisplayedReviews] = useState([]);
//   const [showAllReviews, setShowAllReviews] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       const shuffled = [...REVIEWS].sort(() => 0.5 - Math.random());
//       const count = Math.floor(Math.random() * 5) + 3;
//       setDisplayedReviews(shuffled.slice(0, count));
//       setShowAllReviews(false); // Reset when screen opens
//     }, [])
//   );

//   const handleAddToCart = () => {
//     addToCart({ ...item, quantity, size: selectedSize });
//     navigation.navigate('MainTabs', { screen: 'Cart' });
//   };

//   const handleAddToWishlist = () => {
//     addToWishlist({ ...item, quantity, size: selectedSize });
//     navigation.navigate('Wishlist');
//   };

//   const getVisibleReviews = () => {
//     if (showAllReviews || displayedReviews.length <= 2) return displayedReviews;
//     return displayedReviews.slice(0, 2);
//   };

//   const renderReview = ({ item }) => (
//     <View style={styles.reviewCard}>
//       <View style={styles.reviewHeader}>
//         <View style={styles.avatarCircle}>
//           <Text style={styles.avatarText}>{item.name[0]}</Text>
//         </View>
//         <View>
//           <Text style={styles.reviewName}>{item.name}</Text>
//           <Text style={styles.reviewStars}>{'⭐️'.repeat(item.rating)}</Text>
//         </View>
//       </View>
//       <Text style={styles.reviewComment}>{item.comment}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safe} edges={['top']}>
//       <View style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: item.image }} style={styles.image} />
//             {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
//           </View>

//           <View style={styles.content}>
//             <Text style={styles.name}>{item.name}</Text>
//             <Text style={styles.price}>${item.price.toFixed(2)}</Text>

//             <Text style={styles.sectionLabel}>Select Size</Text>
//             <View style={styles.sizeList}>
//               {['Small', 'Medium', 'Large'].map((size) => (
//                 <TouchableOpacity
//                   key={size}
//                   onPress={() => setSelectedSize(size)}
//                   style={[
//                     styles.sizeButton,
//                     selectedSize === size && styles.selectedSize,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.sizeText,
//                       selectedSize === size && styles.selectedSizeText,
//                     ]}
//                   >
//                     {size}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <Text style={styles.sectionLabel}>Quantity</Text>
//             <View style={styles.quantityContainer}>
//               <TouchableOpacity
//                 onPress={() => setQuantity((q) => Math.max(1, q - 1))}
//                 style={styles.qtyButton}
//               >
//                 <Text style={styles.qtySymbol}>-</Text>
//               </TouchableOpacity>
//               <Text style={styles.quantityText}>{quantity}</Text>
//               <TouchableOpacity
//                 onPress={() => setQuantity((q) => q + 1)}
//                 style={styles.qtyButton}
//               >
//                 <Text style={styles.qtySymbol}>+</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={styles.sectionLabel}>Customer Reviews</Text>
//             <FlatList
//               data={getVisibleReviews()}
//               keyExtractor={(item) => item.id}
//               renderItem={renderReview}
//               scrollEnabled={false}
//             />
//             {displayedReviews.length > 2 && (
//               <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)}>
//                 <Text style={styles.toggleReviews}>
//                   {showAllReviews ? 'Show Less Reviews' : 'Show All Reviews'}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </ScrollView>

//         <View style={styles.bottomBar}>
//           <TouchableOpacity
//             style={styles.addToCartButton}
//             onPress={handleAddToCart}
//           >
//             <Text style={styles.addToCartText}>Add to Cart</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.wishlistButton}
//             onPress={handleAddToWishlist}
//           >
//             <Text style={styles.heart}>❤️</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   imageContainer: {
//     width: '100%',
//     height: 300,
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   tag: {
//     position: 'absolute',
//     top: 16,
//     left: 16,
//     backgroundColor: '#7f00ff',
//     color: '#fff',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 6,
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 130, // space for bottom buttons
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 6,
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#7f00ff',
//     marginBottom: 16,
//   },
//   sectionLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#444',
//   },
//   sizeList: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 20,
//   },
//   sizeButton: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   selectedSize: {
//     backgroundColor: '#7f00ff',
//     borderColor: '#7f00ff',
//   },
//   sizeText: {
//     color: '#444',
//     fontWeight: '600',
//   },
//   selectedSizeText: {
//     color: '#fff',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   qtyButton: {
//     backgroundColor: '#eee',
//     padding: 10,
//     borderRadius: 12,
//     width: 40,
//     alignItems: 'center',
//   },
//   qtySymbol: {
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginHorizontal: 20,
//   },
//   reviewCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//     borderWidth: 0.5,
//     borderColor: '#eee',
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   avatarCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#444',
//   },
//   reviewName: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#222',
//   },
//   reviewStars: {
//     fontSize: 14,
//     marginTop: 2,
//     color: '#ffcc00',
//   },
//   reviewComment: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 20,
//   },
//   toggleReviews: {
//     textAlign: 'center',
//     color: '#7f00ff',
//     fontWeight: '600',
//     marginBottom: 24,
//     fontSize: 14,
//   },
//   // bottomBar: {
//   //   position: 'absolute',
//   //   bottom: 0,
//   //   left: 0,
//   //   right: 0,
//   //   flexDirection: 'row',
//   //   backgroundColor: '#fff',
//   //   paddingVertical: 14,
//   //   paddingHorizontal: 20,
//   //   borderTopWidth: 1,
//   //   borderColor: '#eee',
//   // },
//   bottomBar: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingTop: 14,
//     paddingBottom: 40, // gives breathing room above home gesture bar
//     paddingHorizontal: 20,
//     borderTopWidth: 1,
//     borderColor: '#eee',
//   },

//   addToCartButton: {
//     flex: 1,
//     backgroundColor: '#7f00ff',
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   addToCartText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   wishlistButton: {
//     padding: 14,
//     borderRadius: 12,
//     backgroundColor: '#eee',
//   },
//   heart: {
//     fontSize: 20,
//   },
// });

// export default ProductDetailsScreen;


import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';


import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import REVIEWS from '../src/data/reviews';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PRODUCTS from '../src/data/products';



const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const shuffled = [...REVIEWS].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 5) + 2; // 3–7
      setDisplayedReviews(shuffled.slice(0, count));
    }, [])
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => p.subcategory === item.subcategory && p.id !== item.id
  );


  const handleAddToCart = () => {
    addToCart({ ...item, quantity, size: selectedSize });
    navigation.navigate('MainTabs', { screen: 'Cart' });
  };

  const handleAddToWishlist = () => {
    addToWishlist({ ...item, quantity, size: selectedSize });
    navigation.navigate('Wishlist');
  };


  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
        )}
        <View>
          <Text style={styles.reviewName}>{item.name}</Text>
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name={i < item.rating ? 'star' : 'star-border'}
                size={16}
                color={i < item.rating ? '#FFD700' : '#ccc'}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  const visibleReviews = expandedReviews ? displayedReviews : displayedReviews.slice(0, 2);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} >


        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
        </View>




        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>

          <Text style={styles.sectionLabel}>Select Size</Text>
          <View style={styles.sizeCircleList}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeCircle,
                  selectedSize === size && styles.sizeCircleSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeCircleText,
                    selectedSize === size && styles.sizeCircleTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.qtyBtn}>
              <Icon name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.qtyBtn}>
              <Icon name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>Customer Reviews</Text>
          <FlatList
            data={visibleReviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          />

          {displayedReviews.length > 2 && !expandedReviews && (
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpandedReviews(true);
              }}
              style={styles.showMoreButton}
            >
              <Text style={styles.showMoreText}>Show More Reviews</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.pageWrapper}>

          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>

            <Text style={styles.sectionLabel}>Select Size</Text>
            <View style={styles.sizeCircleList}>
              {SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeCircle,
                    selectedSize === size && styles.sizeCircleSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeCircleText,
                      selectedSize === size && styles.sizeCircleTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.qtyBtn}>
                <Icon name="remove" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.qtyBtn}>
                <Icon name="add" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {relatedProducts.length > 0 && (
              <View style={{ marginBottom: 32 }}>
                <Text style={styles.sectionLabel}>Similar Products</Text>
                <FlatList
                  data={relatedProducts}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: prod }) => (
                    <TouchableOpacity
                      onPress={() => navigation.push('ProductDetails', { item: prod })}
                      style={styles.relatedItem}
                    >
                      <Image source={{ uri: prod.image }} style={styles.relatedImage} />
                      <Text numberOfLines={1} style={styles.relatedName}>{prod.name}</Text>
                      <Text style={styles.relatedPrice}>${prod.price.toFixed(2)}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}


            <Text style={styles.sectionLabel}>Customer Reviews</Text>
            <FlatList
              data={visibleReviews}
              keyExtractor={(item) => item.id}
              renderItem={renderReview}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 12 }}
            />

            {displayedReviews.length > 2 && !expandedReviews && (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setExpandedReviews(true);
                }}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreText}>Show More Reviews</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      </ScrollView>


      {/* Sticky Footer */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistButton} onPress={handleAddToWishlist}>
          <Text style={styles.heart}>❤️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  tag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#7f00ff',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '600',
    fontSize: 12,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e1e1e',
    flex: 1,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7f00ff',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  sizeCircleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  sizeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sizeCircleSelected: {
    backgroundColor: '#7f00ff',
    borderColor: '#7f00ff',
  },
  sizeCircleText: {
    color: '#333',
    fontWeight: '600',
  },
  sizeCircleTextSelected: {
    color: '#fff',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#7f00ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  wishlistButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  heart: {
    fontSize: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#444',
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  reviewStars: {
    fontSize: 14,
    marginTop: 2,
    color: '#ffcc00',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  showMoreButton: {
    marginTop: -8,
    alignItems: 'center',
  },
  showMoreText: {
    color: '#7f00ff',
    fontWeight: '600',
    paddingVertical: 8,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  reviewRating: {
    fontSize: 14,
    color: '#ffcc00',
    marginLeft: 4,
  },


  imageContainer: {
    width: '100%',
    height: 400, // Adjust this to match how much vertical space you want
    position: 'relative',
    overflow: 'hidden', // Ensures rounded corners or no overflow if added
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // this fills left and right edge-to-edge
  },


  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageWrapper: {
    flex: 1,
    paddingBottom: 15, // spacing for bottom bar
  },

  relatedItem: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
  },
  relatedImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  relatedName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  relatedPrice: {
    fontSize: 14,
    color: '#7f00ff',
  },


});
