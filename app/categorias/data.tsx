import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import LessonsCarousel from "../(tabs)/carrosel";

const dataLessons = [
  {
    id: "da1",
    title: "O que é Big Data?",
    description: "Conceitos iniciais e aplicações.",
    duration: "10 min",
    category: "Big Data"
  },
  {
    id: "da2",
    title: "Ferramentas de BI",
    description: "Power BI e Tableau.",
    duration: "12 min",
    category: "BI"
  },
  {
    id: "da3",
    title: "Data Warehouse",
    description: "Armazenamento inteligente de dados.",
    duration: "14 min",
    category: "DW"
  },
  {
    id: "da4",
    title: "Análise com Python",
    description: "Manipulando dados com Pandas.",
    duration: "16 min",
    category: "Python"
  }
];

export default function DataAnalytics() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>
      <Text style={styles.titulo}>Data & Analytics</Text>
      <LessonsCarousel lessons={dataLessons} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  voltar: { fontSize: 16, color: "#007AFF", marginBottom: 12 },
});