import { View, Text, StyleSheet } from "react-native";

export default function SobreNos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre Nós</Text>
      <Text style={styles.paragraph}>
        Somos apaixonados por ensino e tecnologia!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  paragraph: { fontSize: 16 },
});