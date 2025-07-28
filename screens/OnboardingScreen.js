
///////////////////////////////////////////////
////////////////////////////////////////////////

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    titleKey: 'onboarding.title1',
    descriptionKey: 'onboarding.description1',
    image: require('../src/assets/onboarding1.png'),
  },
  {
    key: '2',
    titleKey: 'onboarding.title2',
    descriptionKey: 'onboarding.description2',
    image: require('../src/assets/onboarding2.png'),
  },
  {
    key: '3',
    titleKey: 'onboarding.title3',
    descriptionKey: 'onboarding.description3',
    image: require('../src/assets/onboarding3.png'),
  },
];

export default function OnboardingScreen({ onFinish }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleNext = () => {
    if (index === slides.length - 1) {
      // Instead of navigating to Login, call onFinish to update app state
      onFinish();
    } else {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={handleScroll}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(idx);
        }}
        getItemLayout={(data, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        renderItem={({ item, index: slideIndex }) => {
          const inputRange = [
            (slideIndex - 1) * width,
            slideIndex * width,
            (slideIndex + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-40, 0, 40],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [30, 0, -30],
            extrapolate: 'clamp',
          });

          return (
            <View style={styles.slide}>
              <Animated.Image
                source={item.image}
                style={[styles.image, { transform: [{ translateX }] }]}
              />
              <Animated.View style={{ opacity, transform: [{ translateY }] }}>
                <Text style={styles.title}>{t(item.titleKey)}</Text>
                <Text style={styles.description}>{t(item.descriptionKey)}</Text>
              </Animated.View>
            </View>
          );
        }}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === index ? '#7f00ff' : '#ccc',
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1
              ? t('onboarding.getStarted')
              : t('onboarding.skip')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles unchanged from your original
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7f00ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#7f00ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

/////////////////////////////////////////////////
//////////////////////////////////////

// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// const slides = [
//   {
//     key: '1',
//     titleKey: 'onboarding.title1',
//     descriptionKey: 'onboarding.description1',
//     image: require('../src/assets/onboarding1.png'),
//   },
//   {
//     key: '2',
//     titleKey: 'onboarding.title2',
//     descriptionKey: 'onboarding.description2',
//     image: require('../src/assets/onboarding2.png'),
//   },
//   {
//     key: '3',
//     titleKey: 'onboarding.title3',
//     descriptionKey: 'onboarding.description3',
//     image: require('../src/assets/onboarding3.png'),
//   },
// ];

// export default function OnboardingScreen() {
//   const navigation = useNavigation();
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);
//   const [index, setIndex] = useState(0);
//   const { t } = useTranslation();

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     { useNativeDriver: false }
//   );

//   const handleNext = () => {
//     if (index === slides.length - 1) {
//       navigation.navigate('Login');
//       // Close onboarding screen
//     } else {
//       flatListRef.current.scrollToIndex({ index: index + 1 });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={slides}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.key}
//         onScroll={handleScroll}
//         onMomentumScrollEnd={(e) => {
//           const idx = Math.round(e.nativeEvent.contentOffset.x / width);
//           setIndex(idx);
//         }}
//         getItemLayout={(data, i) => ({
//           length: width,
//           offset: width * i,
//           index: i,
//         })}
//         renderItem={({ item, index: slideIndex }) => {
//           const inputRange = [
//             (slideIndex - 1) * width,
//             slideIndex * width,
//             (slideIndex + 1) * width,
//           ];

//           const translateX = scrollX.interpolate({
//             inputRange,
//             outputRange: [-40, 0, 40],
//             extrapolate: 'clamp',
//           });

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0, 1, 0],
//             extrapolate: 'clamp',
//           });

//           const translateY = scrollX.interpolate({
//             inputRange,
//             outputRange: [30, 0, -30],
//             extrapolate: 'clamp',
//           });

//           return (
//             <View style={styles.slide}>
//               <Animated.Image
//                 source={item.image}
//                 style={[styles.image, { transform: [{ translateX }] }]}
//               />
//               <Animated.View style={{ opacity, transform: [{ translateY }] }}>
//                 <Text style={styles.title}>{t(item.titleKey)}</Text>
//                 <Text style={styles.description}>{t(item.descriptionKey)}</Text>
//               </Animated.View>
//             </View>
//           );
//         }}
//       />

//       {/* Dots */}
//       <View style={styles.dotsContainer}>
//         {slides.map((_, i) => {
//           const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [1, 1.5, 1],
//             extrapolate: 'clamp',
//           });

//           return (
//             <Animated.View
//               key={i}
//               style={[
//                 styles.dot,
//                 {
//                   backgroundColor: i === index ? '#7f00ff' : '#ccc',
//                   transform: [{ scale }],
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>

//       {/* Button */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>
//             {index === slides.length - 1 ? t('onboarding.getStarted') : t('onboarding.skip')}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // EXACTLY your original styles, no color or sizing changes
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   slide: {
//     width,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//   },
//   image: {
//     width: 240,
//     height: 240,
//     marginBottom: 30,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#7f00ff',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     color: '#444',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 6,
//   },
//   buttonContainer: {
//     width: '80%',
//     marginBottom: 50,
//   },
//   button: {
//     backgroundColor: '#7f00ff',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


/////////////////////////////////
//////////////////////////////////


// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/native';
// // import { StackActions } from '@react-navigation/native-stack';
// // ✅ correct



// const { width } = Dimensions.get('window');

// const slides = [
//   {
//     key: '1',
//     titleKey: 'onboarding.title1',
//     descriptionKey: 'onboarding.description1',
//     image: require('../src/assets/onboarding1.png'),
//   },
//   {
//     key: '2',
//     titleKey: 'onboarding.title2',
//     descriptionKey: 'onboarding.description2',
//     image: require('../src/assets/onboarding2.png'),
//   },
//   {
//     key: '3',
//     titleKey: 'onboarding.title3',
//     descriptionKey: 'onboarding.description3',
//     image: require('../src/assets/onboarding3.png'),
//   },
// ];

// export default function OnboardingScreen() {

//   const navigation = useNavigation(); // ✅ Required for navigation.replace
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);
//   const [index, setIndex] = useState(0);
//   const { t } = useTranslation();

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     { useNativeDriver: false }
//   );

//   const handleNext = () => {
//     if (index === slides.length - 1) {
//       // ✅ Route name must match your navigator name
//       // navigation.replace('Login');
//       // navigation.replace('Login');
//       navigation.navigate('Auth', { screen: 'Login' });


//     } else {
//       flatListRef.current.scrollToIndex({ index: index + 1 });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={slides}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.key}
//         onScroll={handleScroll}
//         onMomentumScrollEnd={(e) => {
//           const idx = Math.round(e.nativeEvent.contentOffset.x / width);
//           setIndex(idx);
//         }}
//         getItemLayout={(data, i) => ({
//           length: width,
//           offset: width * i,
//           index: i,
//         })}
//         renderItem={({ item, index: slideIndex }) => {
//           const inputRange = [
//             (slideIndex - 1) * width,
//             slideIndex * width,
//             (slideIndex + 1) * width,
//           ];

//           const translateX = scrollX.interpolate({
//             inputRange,
//             outputRange: [-40, 0, 40],
//             extrapolate: 'clamp',
//           });

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0, 1, 0],
//             extrapolate: 'clamp',
//           });

//           const translateY = scrollX.interpolate({
//             inputRange,
//             outputRange: [30, 0, -30],
//             extrapolate: 'clamp',
//           });

//           return (
//             <View style={styles.slide}>
//               <Animated.Image
//                 source={item.image}
//                 style={[styles.image, { transform: [{ translateX }] }]}
//               />
//               <Animated.View style={{ opacity, transform: [{ translateY }] }}>
//                 <Text style={styles.title}>{t(item.titleKey)}</Text>
//                 <Text style={styles.description}>{t(item.descriptionKey)}</Text>
//               </Animated.View>
//             </View>
//           );
//         }}
//       />

//       {/* Dots */}
//       <View style={styles.dotsContainer}>
//         {slides.map((_, i) => {
//           const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [1, 1.5, 1],
//             extrapolate: 'clamp',
//           });

//           return (
//             <Animated.View
//               key={i}
//               style={[
//                 styles.dot,
//                 {
//                   backgroundColor: i === index ? '#7f00ff' : '#ccc',
//                   transform: [{ scale }],
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>

//       {/* Button */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>
//             {index === slides.length - 1
//               ? t('onboarding.getStarted')
//               : t('onboarding.skip')}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // No changes to your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   slide: {
//     width,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//   },
//   image: {
//     width: 240,
//     height: 240,
//     marginBottom: 30,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#7f00ff',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     color: '#444',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 6,
//   },
//   buttonContainer: {
//     width: '80%',
//     marginBottom: 50,
//   },
//   button: {
//     backgroundColor: '#7f00ff',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
