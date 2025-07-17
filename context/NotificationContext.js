// // import React, { createContext, useState } from "react";

// // export const NotificationContext = createContext();

// // export const NotificationProvider = ({ children }) => {
// //     const [events, setEvents] = useState([]);

// //     const addEvents = (newEvents) => {
// //         setEvents((prev) => [...prev, ...newEvents]);
// //     };

// //     return (
// //         <NotificationContext.Provider value={{ events, addEvents }}>
// //             {children}
// //         </NotificationContext.Provider>
// //     );
// // };

// // Example NotificationContext.js
// import React, { createContext, useState } from "react";

// export const NotificationContext = React.createContext();

// export function NotificationProvider({ children }) {
//     const [events, setEvents] = useState([]);

//     const addEvents = (newEvents) => {
//         setEvents((prev) => [...prev, ...newEvents]);
//     };

//     return (
//         <NotificationContext.Provider value={{ events, addEvents }}>
//             {children}
//         </NotificationContext.Provider>
//     );
// }

import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [events, setEvents] = useState([]);
    const addEvents = (newEvents) => setEvents((prev) => [...prev, ...newEvents]);

    return (
        <NotificationContext.Provider value={{ events, addEvents }}>
            {children}
        </NotificationContext.Provider>
    );
}