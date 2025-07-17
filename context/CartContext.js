
// import React, { createContext, useState, useContext } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);

//     const addToCart = (product) => {
//         setCartItems((prevItems) => {
//             const existingItem = prevItems.find(
//                 (item) => item.id === product.id && item.size === product.size
//             );

//             if (existingItem) {
//                 return prevItems.map((item) =>
//                     item.id === product.id && item.size === product.size
//                         ? { ...item, quantity: item.quantity + product.quantity }
//                         : item
//                 );
//             } else {
//                 return [...prevItems, product];
//             }
//         });
//     };

//     const removeFromCart = (productId, size) => {
//         setCartItems((prevItems) =>
//             prevItems.filter(
//                 (item) => !(item.id === productId && item.size === size)
//             )
//         );
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () =>
//     useContext(CartContext);

import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === product.id && item.size === product.size
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prevItems, product];
            }
        });
    };

    const removeFromCart = (productId, size) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) => !(item.id === productId && item.size === size)
            )
        );
    };

    // ADD THIS FUNCTION:
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);