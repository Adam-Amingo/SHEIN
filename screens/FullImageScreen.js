import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FullImageScreen = ({ route, navigation }) => {
    const { image } = route.params;

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => navigation.goBack()}
            activeOpacity={1}
        >
            <Image 
                source={{ uri: image }} 
                style={styles.image} 
                resizeMode="contain" 
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default FullImageScreen;
