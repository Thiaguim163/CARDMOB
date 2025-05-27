import React from "react";
import { StyleSheet, View, Button } from "react-native";
import ScrollViewExamples from "./components/ScrollViewExamples";

export default function App() {
  const baseUrl = "http://10.81.205.18:3000";
  const getItems = async () => {
    const response = await fetch(`${baseUrl}/items`);
    console.log(response.json());
  };

  return (
    <View style={styles.container}>
      <Button onPress={getItems} title="Buscar">
        buscar dados
      </Button>
      <ScrollViewExamples />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 600,
    marginTop: 150,
  },
});
