



// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// // Get background color based on tag type
// const getTagColor = (tag) => {
//     switch (tag) {
//         case 'Hot': return '#FF5C5C';
//         case 'New': return '#27AE60';
//         case 'Super': return '#FFA500';
//         default: return '#7f00ff';
//     }
// };

// const ProductCard = ({ image, name, price, rating, tag, onPress, onPressImage }) => {
//     return (
//         <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
//             <TouchableOpacity onPress={onPressImage} style={styles.imageWrapper}>
//                 <Image source={{ uri: image }} style={styles.image} />
//                 {tag && (
//                     <Text style={[styles.tag, { backgroundColor: getTagColor(tag) }]}>
//                         {tag}
//                     </Text>
//                 )}
//             </TouchableOpacity>

//             <View style={styles.info}>
//                 <Text numberOfLines={2} style={styles.name}>{name}</Text>
//                 <Text style={styles.price}>₵{price.toFixed(2)}</Text>
//                 <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         overflow: 'hidden',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.06,
//         shadowRadius: 4,
//         margin: 5,
//     },
//     imageWrapper: {
//         position: 'relative',
//         width: '100%',
//         height: 160,
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     tag: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         color: '#fff',
//         paddingHorizontal: 8,
//         paddingVertical: 3,
//         borderRadius: 6,
//         fontSize: 11,
//         fontWeight: '600',
//         overflow: 'hidden',
//     },
//     info: {
//         padding: 10,
//     },
//     name: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: '#333',
//         marginBottom: 4,
//     },
//     price: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#111',
//         marginBottom: 2,
//     },
//     rating: {
//         fontSize: 12,
//         color: '#999',
//     },
// });

// export default React.memo(ProductCard);


// //////////////////////////////////
// /////////////////////////////////////

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const getTagColor = (tag) => {
    switch (tag?.en || tag) {
        case 'Hot': return '#FF5C5C';
        case 'New': return '#27AE60';
        case 'Super': return '#FFA500';
        default: return '#7f00ff';
    }
};

const ProductCard = ({ image, name, price, rating, tag, onPress, onPressImage }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    // Get translation for current language or fall back to English
    const translatedName = typeof name === 'object' ? (name[currentLang] || name.en) : name;
    const translatedTag = typeof tag === 'object' ? (tag[currentLang] || tag.en) : tag;

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
            <TouchableOpacity onPress={onPressImage} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
                {translatedTag && (
                    <Text style={[styles.tag, { backgroundColor: getTagColor(tag) }]}>
                        {translatedTag}
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.info}>
                <Text numberOfLines={2} style={styles.name}>{translatedName}</Text>
                <Text style={styles.price}>₵{price.toFixed(2)}</Text>
                <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        margin: 5,
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: 160,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    tag: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        fontSize: 11,
        fontWeight: '600',
        overflow: 'hidden',
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 2,
    },
    rating: {
        fontSize: 12,
        color: '#999',
    },
});

export default React.memo(ProductCard);
