import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (item) => {
        // Prevent duplicates
        if (!wishlistItems.some(w => w.id === item.id && w.size === item.size)) {
            setWishlistItems([...wishlistItems, item]);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};