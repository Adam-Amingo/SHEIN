import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

const FadeInView = ({ children, style }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500, // Adjust for speed
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[style, { flex: 1, opacity: fadeAnim }]}>
            {children}
        </Animated.View>
    );
};

export default FadeInView;