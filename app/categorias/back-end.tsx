import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import LessonsCarousel from "./carrosel";

const backEndLessons = [
  {
    id: "b1",
    title: "Lógica de Programação",
    description: "Como pensar como um dev.",
    duration: "10 min",
    category: "Lógica"
  },
  {
    id: "b2",
    title: "APIs com Node.js",
    description: "Criando serviços com Express.",
    duration: "14 min",
    category: "Node / APIs"
  },
  {
    id: "b3",
    title: "Middleware e Rotas",
    description: "Organizando sua aplicação.",
    duration: "12 min",
    category: "Rotas"
  },
  {
    id: "b4",
    title: "Autenticação",
    description: "Login seguro com tokens.",
    duration: "16 min",
    category: "Auth"
  }
];

export default function Backend() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>
      <Text style={styles.titulo}>Back-end</Text>
      <LessonsCarousel lessons={backEndLessons} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  voltar: { fontSize: 16, color: "#007AFF", marginBottom: 12 },
});
