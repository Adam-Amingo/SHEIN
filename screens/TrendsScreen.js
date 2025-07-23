import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from "react-native";

const trends = [
  {
    id: "1",
    title: "10 Summer Fashion Trends for 2025",
    imageUrl:
      "https://i.pinimg.com/1200x/0b/33/8d/0b338d31f2299998b1276244d7f1b832.jpg",
    link: "https://www.vogue.co.uk/article/spring-summer-2025-fashion-trends?utm_source=chatgpt.com",
  },
  {
    id: "2",
    title: "How to Style Your Office Outfits",
    imageUrl:
      "https://i.pinimg.com/736x/a4/e2/06/a4e206bd64ad845fa25e131b861af337.jpg",
    link: "https://www.elle.com/fashion/",
  },
  {
    id: "3",
    title:
      "Wearing a Dress Over Skinny Jeans Is the Easiest Way to Jump on the Boho Trend This Summer",
    imageUrl:
      "https://media.glamour.com/photos/68793dc00513628ed2c70990/16:9/w_1920,c_limit/2175525877",
    link: "https://www.glamour.com/story/how-to-wear-a-dress-over-skinny-jeans?utm_source=chatgpt.com",
  },
  {
    id: "4",
    title: "Mood-Boosting Color Fashion",
    imageUrl:
      "https://i.pinimg.com/736x/e4/fb/87/e4fb877486cfcc0961a7da81c716fd03.jpg",
    link: "https://www.harpersbazaar.com/fashion/fashion-trends-2025",
  },
  {
    id: "5",
    title: "Top fashion trends for 2025: A look into the Future",
    description:
      "With a combination of predicted data from Heuritech for Spring/Summer 2025, insights from a fashion analyst, and inspiration drawn from recent runway shows, we can identify the top 10 forecasted key trends expected to make waves in 2025.",
    imageUrl:
      "https://i.pinimg.com/736x/ff/47/fd/ff47fd1b7b33cae5cdff015f46673cac.jpg",
    link: "https://heuritech.com/fashion-trends-2025/?utm_source=chatgpt.com",
  },
  {
    id: "6",
    title:
      "These fashion trends will dominate 2025, according to top celebrity stylists",
    imageUrl:
      "https://i.pinimg.com/736x/50/0e/ef/500eeff82dcd196245046a641f49d092.jpg",
    link: "https://pagesix.com/2025/02/26/style/the-top-2025-fashion-trends-according-to-celebrity-stylists/?utm_source=chatgpt.com",
  },
  {
    id: "7",
    title:
      "Listen Up, Fashion People—These Are the Only 4 (Very Pretty) Trends You Need to Know From Couture Week",
    imageUrl:
      "https://i.pinimg.com/736x/7e/75/3e/7e753e5d8972927f804ac58fa7a06317.jpg",
    link: "https://www.whowhatwear.com/fashion/runway/paris-couture-fashion-week-july-2025-trends?utm_source=chatgpt.com",
  },
  {
    id: "8",
    title: "7 Key Summer 2025 Fashion Trends You Need to Know Now",
    imageUrl:
      "https://i.pinimg.com/736x/a1/b7/77/a1b7772669b52895e84b75da25ee805e.jpg",
    link: "https://www.glamour.com/story/2025-fashion-trends?utm_source=chatgpt.com",
  },
  {
    id: "9",
    title: "Fashion Week",
    imageUrl:
      "https://i.pinimg.com/736x/2e/6e/ac/2e6eac9f3e8e85955cd45f23fb388832.jpg",
    link: "https://www.instyle.com/sofia-vergara-corset-top-flared-jeans-11774613?utm_source=chatgpt.com",
  },
  {
    id: "10",
    title: "Trending Bags You Need This Year",
    imageUrl:
      "https://i.pinimg.com/736x/00/2b/a4/002ba4d7ef0907be5f1893457ec32e9c.jpg",
    link: "https://harpersbazaar.com/top-bags-2025",
  },
  {
    id: "11",
    title: "12 Modern Ways to Wear Y2K Trends",
    imageUrl:
      "https://www.instyle.com/thmb/Pp5-OClmAnDd64SzytW7o7Pp9N0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/071725-y2k-fashion-91cfc27cb6e34b4aaa2ed74be78f18c8.jpg",
    link: "https://www.instyle.com/how-to-wear-y2k-fashion-in-2025-11772272?utm_source=chatgpt.com",
  },
];

export default function TrendScreen() {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openLink(item.link)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔥 Fashion Trends</Text>
      <FlatList
        data={trends}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    padding: 16,
    textAlign: "center",
    marginTop: 30,
    backgroundColor: "transparent",

    color: "#111",
  },
});
