


import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabItem from './TabItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
//import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';


const tabs = ['All', 'Women', 'Men', 'Kids', 'Curve', 'Home'];

export default function TopNavBar({ activeTab, onTabChange }) {
  const [searchText, setSearchText] = React.useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const getIconColor = (screen) =>
    route.name === screen ? '#7F55B1' : '#7F55B1';

  const handleSearch = () => {
  alert(`Searching for: ${searchText}`);
};

  //const handleSearch = () => {
    //alert(`Searching for: ${searchText}`);
  //};
 const handleVoiceSearch = () => {
  if (searchText.trim() === "") {
    Speech.speak("Nothing to search for.");
  } else {
    Speech.speak(`Searching for ${searchText}`);
  }
};

  const handlePickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    // Simulate similarity by passing a fixed subcategory
    navigation.navigate('Category', { suggestedSubcategory: 'Casual dress' });
  }
};


  // const handleVoiceSearch = async () => {
  //   try {
  //     await Voice.start('en-US');
  //     Voice.onSpeechResults = (event) => {
  //       const text = event.value[0];
  //       setSearchText(text);
  //       handleSearch();
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="mail-outline" size={24} color={getIconColor('Notification')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="calendar-outline" size={24} color={getIconColor('Cart')} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search-outline" size={20} color="#7F55B1" style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            placeholder={route.name === 'Home' ? 'Search' : 'Categories'}
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
          {route.name !== 'Home' && (
            <>
              <TouchableOpacity onPress={handlePickImage}>
                <Icon name="camera-outline" size={22} color="#7F55B1" style={{ marginHorizontal: 5 }} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={handleVoiceSearch}>
                <Icon name="mic-outline" size={24} style={{ marginHorizontal: 2 }} />
              </TouchableOpacity> */}
             
              <TouchableOpacity onPress={handleVoiceSearch}>
                <Icon name="mic-outline" size={24} color="#7F55B1" style={{ marginHorizontal: 2 }} />
              </TouchableOpacity>
            </>
            
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <Icon name="heart-outline" size={24} color={getIconColor('Wishlist')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Main category tabs */}
      {route.name !== 'Home' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TabItem
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onPress={() => onTabChange && onTabChange(tab)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 15,
  },
  icon: {
    marginHorizontal: 3,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f0ff',
    paddingHorizontal: 0,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 3,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
  },
  tabContainer: {
    marginTop: 5,
  },
});










// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import TabItem from './TabItem';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import * as ImagePicker from 'expo-image-picker';
// import * as SpeechToText from 'expo-speech-to-text';

// const tabs = ['All', 'Women', 'Men', 'Kids', 'Curve', 'Home'];

// export default function TopNavBar({ activeTab, onTabChange }) {
//   const [searchText, setSearchText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const navigation = useNavigation();
//   const route = useRoute();

//   const getIconColor = (screen) =>
//     route.name === screen ? '#7f00ff' : '#7F55B1';

//   const handleSearch = () => {
//     alert(`Searching for: ${searchText}`);
//   };

//   const handlePickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       alert('Image selected!');
//     }
//   };

//   const handleVoiceSearch = async () => {
//     try {
//       setIsListening(true);
//       const { status } = await SpeechToText.requestPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission to use microphone was denied');
//         setIsListening(false);
//         return;
//       }
//       const result = await SpeechToText.startAsync({
//         onResult: (transcript) => {
//           setSearchText(transcript);
//           setIsListening(false);
//         },
//         onError: (error) => {
//           alert('Voice search failed');
//           setIsListening(false);
//         },
//       });
//     } catch (e) {
//       alert('Voice search failed');
//       setIsListening(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Top icons and search */}
//       <View style={styles.topRow}>
//         <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
//           <Icon name="mail-outline" size={24} color={getIconColor('Notification')} style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//           <Icon name="calendar-outline" size={24} color={getIconColor('Cart')} style={styles.icon} />
//         </TouchableOpacity>

//         <View style={styles.searchBar}>
//           <TouchableOpacity onPress={handleSearch}>
//             <Icon name="search-outline" size={20} color="#7F55B1" style={styles.icon} />
//           </TouchableOpacity>
//           <TextInput
//             placeholder={route.name === 'Home' ? 'Search' : 'Categories'}
//             style={styles.input}
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//           {route.name !== 'Home' && (
//             <>
//               <TouchableOpacity onPress={handlePickImage}>
//                 <Icon name="camera-outline" size={22} color="#7F55B1" style={{ marginHorizontal: 5 }} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleVoiceSearch}>
//                 <Icon name="mic-outline" size={24} color={isListening ? "#7f00ff" : "#7F55B1"} style={{ marginHorizontal: 2 }} />
//               </TouchableOpacity>
//             </>
//           )}
//         </View>

//         <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
//           <Icon name="heart-outline" size={24} color={getIconColor('Wishlist')} style={styles.icon} />
//         </TouchableOpacity>
//       </View>

//       {/* Main category tabs */}
//       {route.name !== 'Home' && (
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
//           {tabs.map((tab) => (
//             <TabItem
//               key={tab}
//               label={tab}
//               isActive={activeTab === tab}
//               onPress={() => onTabChange && onTabChange(tab)}
//             />
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#fff',
//   },
//   topRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginTop: 15,
//   },
//   icon: {
//     marginHorizontal: 3,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#f5f0ff',
//     paddingHorizontal: 0,
//     alignItems: 'center',
//     borderRadius: 10,
//     marginHorizontal: 3,
//   },
//   input: {
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   tabContainer: {
//     marginTop: 7,
//   },
// });