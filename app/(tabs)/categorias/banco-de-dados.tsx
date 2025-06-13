import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import LessonsCarousel from "../carrosel";

const dbLessons = [
  {
    id: "d1",
    title: "Introdução ao SQL",
    description: "Entendendo bancos relacionais.",
    duration: "11 min",
    category: "SQL"
  },
  {
    id: "d2",
    title: "NoSQL na Prática",
    description: "Trabalhando com MongoDB.",
    duration: "13 min",
    category: "NoSQL"
  },
  {
    id: "d3",
    title: "Consultas Complexas",
    description: "Joins, filtros e mais.",
    duration: "15 min",
    category: "Queries"
  },
  {
    id: "d4",
    title: "Modelagem de Dados",
    description: "Como planejar seu banco.",
    duration: "12 min",
    category: "Modelagem"
  }
];

export default function BancoDeDados() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>
      <Text style={styles.titulo}>Banco de Dados</Text>
      <LessonsCarousel lessons={dbLessons} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  voltar: { fontSize: 16, color: "#007AFF", marginBottom: 12 },
});