import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LuckyWheelScreen } from "./src/screens/LuckyWheelScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.brand}>ColorWalking</Text>
        <Text style={styles.subtitle}>抽取你的今日幸运色</Text>
        <LuckyWheelScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F6FB"
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12
  },
  brand: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2A44"
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 15,
    color: "#62708A"
  }
});
