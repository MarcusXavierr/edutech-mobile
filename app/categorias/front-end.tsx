import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import LessonsCarousel from "./carrosel";

const frontEndLessons = [
  {
    id: "f1",
    title: "Componentes React",
    description: "Como criar e reutilizar componentes.",
    duration: "10 min",
    category: "React"
  },
  {
    id: "f2",
    title: "Estilização com StyleSheet",
    description: "Dando estilo ao seu app.",
    duration: "12 min",
    category: "CSS-in-JS"
  },
  {
    id: "f3",
    title: "Hooks no Front",
    description: "useEffect e useState na prática.",
    duration: "15 min",
    category: "Hooks"
  },
  {
    id: "f4",
    title: "Navegação com React Navigation",
    description: "Como se mover entre telas.",
    duration: "18 min",
    category: "Navegação"
  }
];

export default function FrontEnd() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>
      <Text style={styles.titulo}>Front-end</Text>
      <LessonsCarousel lessons={frontEndLessons} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  voltar: { fontSize: 16, color: "#007AFF", marginBottom: 12 },
});
