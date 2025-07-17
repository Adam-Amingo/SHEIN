


// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const ProductCard = ({ image, name, price, rating, tag, onPress, onPressImage }) => {
//     return (
//         <View style={styles.card}>
//             <TouchableOpacity onPress={onPressImage}>
//                 <Image source={{ uri: image }} style={styles.image} />
//             </TouchableOpacity>
//             {tag ? <Text style={styles.tag}>{tag}</Text> : null}
//             <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
//                 <Text style={styles.name}>{name}</Text>
//                 <Text style={styles.price}>${price}</Text>
//                 <Text style={styles.rating}>⭐ {rating}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: '#EFE4D2',
//         borderRadius: 10,
//         padding: 10,
//         margin: 5,
//         flex: 2,
//         elevation: 3,
//     },
//     image: {
//         width: '100%',
//         height: 140,
//         borderRadius: 8,
//     },
//     tag: {
//         backgroundColor: '#7f00ff',
//         color: '#fff',
//         fontSize: 12,
//         paddingHorizontal: 6,
//         paddingVertical: 2,
//         borderRadius: 4,
//         marginTop: 6,
//         alignSelf: 'flex-start',
//     },
//     name: {
//         marginTop: 6,
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     price: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#222',
//     },
//     rating: {
//         fontSize: 12,
//         color: '#888',
//     },
// });

// export default React.memo(ProductCard);


// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const ProductCard = ({ image, name, price, rating, tag, onPress, onPressImage }) => {
//     return (
//         <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
//             <TouchableOpacity onPress={onPressImage} style={styles.imageWrapper}>
//                 <Image source={{ uri: image }} style={styles.image} />
//                 {tag && <Text style={styles.tag}>{tag}</Text>}
//             </TouchableOpacity>

//             <View style={styles.info}>
//                 <Text numberOfLines={2} style={styles.name}>{name}</Text>
//                 <Text style={styles.price}>${price.toFixed(2)}</Text>
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
//         backgroundColor: '#7f00ff',
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



import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Get background color based on tag type
const getTagColor = (tag) => {
    switch (tag) {
        case 'Hot': return '#FF5C5C';
        case 'New': return '#27AE60';
        case 'Super': return '#FFA500';
        default: return '#7f00ff';
    }
};

const ProductCard = ({ image, name, price, rating, tag, onPress, onPressImage }) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
            <TouchableOpacity onPress={onPressImage} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
                {tag && (
                    <Text style={[styles.tag, { backgroundColor: getTagColor(tag) }]}>
                        {tag}
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.info}>
                <Text numberOfLines={2} style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
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
