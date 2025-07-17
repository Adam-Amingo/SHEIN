

// import React, { useState, useContext } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { NotificationContext } from "../context/NotificationContext";

// const deliveryEvents = [
//   { title: "Order Packed", date: "2025-06-29" },
//   { title: "Shipped", date: "2025-06-30" },
//   { title: "Out for Delivery", date: "2025-07-01" },
//   { title: "Delivered", date: "2025-07-02" },
// ];

// export default function NotificationScreen() {
//   const { events } = useContext(NotificationContext); // <-- Use context events!
//   const [selectedDate, setSelectedDate] = useState(null);

//   // Mark dates with events
//   const markedDates = events.reduce((acc, event) => {
//     acc[event.date] = { selected: true, selectedColor: '#F3F3F3' };
//     return acc;
//   }, {});

//   // Filter events for selected date
//   const eventsForDate = events.filter(e => e.date === selectedDate);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Notifications</Text>
//       <View style={{ width: 300, paddingHorizontal: 16 }}>
//         {/* <Calendar
//           style={styles.calendar}
//           markedDates={{
//             ...markedDates,
//             ...(selectedDate && {
//               [selectedDate]: {
//                 ...markedDates[selectedDate],
//                 selected: true,
//                 selectedColor: '#7f00ff',
//               },
//             }),
//           }}
//           onDayPress={day => setSelectedDate(day.dateString)}
//         /> */}
//         <Calendar
//           style={styles.calendar}
//           markedDates={{
//             ...markedDates,
//             ...(selectedDate && {
//               [selectedDate]: {
//                 ...markedDates[selectedDate],
//                 selected: true,
//                 selectedColor: '#7f00ff',
//               },
//             }),
//           }}
//           theme={{
//             selectedDayBackgroundColor: '#7f00ff',
//             selectedDayTextColor: '#fff',
//             todayTextColor: '#7f00ff',
//             dotColor: '#7f00ff',
//             arrowColor: '#7f00ff',
//             monthTextColor: '#7f00ff',
//             textMonthFontWeight: 'bold',
//             textDayFontWeight: 'bold',
//             textDayHeaderFontWeight: 'bold',
//             textDayFontSize: 16,
//             textMonthFontSize: 18,
//             textDayHeaderFontSize: 14,
//           }}
//           onDayPress={day => setSelectedDate(day.dateString)}
//         />
//       </View>
//       <View style={styles.eventsContainer}>
//         {selectedDate && eventsForDate.length > 0 ? (
//           <FlatList
//             data={eventsForDate}
//             keyExtractor={item => item.title + item.date}
//             renderItem={({ item }) => (
//               <View style={styles.eventItem}>
//                 <Text style={styles.eventText}>{item.title}</Text>
//               </View>
//             )}
//           />
//         ) : selectedDate ? (
//           <Text style={styles.noEventText}>No events for this date.</Text>
//         ) : (
//           <Text style={styles.noEventText}>Select a date to see events.</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingTop: 40,
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#888',
//     marginBottom: 10,
//   },
//   calendar: {
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 16,
//     width: 350,
//     marginTop: 10,
//     alignSelf: 'center',
//   },
//   eventsContainer: {
//     marginTop: 20,
//     width: 350,
//     minHeight: 60,
//   },
//   eventItem: {
//     backgroundColor: '#f3f3f3',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   eventText: {
//     color: '#333',
//     fontSize: 16,
//   },
//   noEventText: {
//     color: '#aaa',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });





import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const deliveryEvents = [
  { title: "Order Packed", date: "2025-06-29" },
  { title: "Shipped", date: "2025-07-03" },
  { title: "Out for Delivery", date: "2025-07-21" },
  { title: "Delivered", date: "2025-08-02" },
];

export default function NotificationScreen() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Mark dates with events
  const markedDates = deliveryEvents.reduce((acc, event) => {
    acc[event.date] = { selected: true, selectedColor: '#F3F3F3' };
    return acc;
  }, {});

  // Filter events for selected date
  const eventsForDate = deliveryEvents.filter(e => e.date === selectedDate);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
      <View style={{ width: 300, paddingHorizontal: 16 }}>
        <Calendar
          style={styles.calendar}
          markedDates={{
            ...markedDates,
            ...(selectedDate && {
              [selectedDate]: {
                ...markedDates[selectedDate],
                selected: true,
                selectedColor: '#7f00ff',
              },
            }),
          }}
          theme={{
            selectedDayBackgroundColor: '#7f00ff',
            selectedDayTextColor: '#fff',
            todayTextColor: '#7f00ff',
            dotColor: '#7f00ff',
            arrowColor: '#7f00ff',
            monthTextColor: '#7f00ff',
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          onDayPress={day => setSelectedDate(day.dateString)}
        />
      </View>
      <View style={styles.eventsContainer}>
        {selectedDate && eventsForDate.length > 0 ? (
          <FlatList
            data={eventsForDate}
            keyExtractor={item => item.title + item.date}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                <Text style={styles.eventText}>{item.title}</Text>
              </View>
            )}
          />
        ) : selectedDate ? (
          <Text style={styles.noEventText}>No events for this date.</Text>
        ) : (
          <Text style={styles.noEventText}>Select a date to see events.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    width: 350,
    marginTop: 10,
    alignSelf: 'center',
  },
  eventsContainer: {
    marginTop: 20,
    width: 350,
    minHeight: 60,
  },
  eventItem: {
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventText: {
    color: '#333',
    fontSize: 16,
  },
  noEventText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});