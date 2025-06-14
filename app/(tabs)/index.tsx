import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import LessonsCarousel from "./carrosel";

export default function Index() {
  const router = useRouter();

  const categorias = [
    {
      id: "1",
      title: "Front-end",
      description: "Aprenda interfaces incríveis",
      duration: "4 aulas",
      category: "React / UI",
      route: "/categorias/front-end"
    },
    {
      id: "2",
      title: "Back-end",
      description: "Lógica, API e servidores",
      duration: "4 aulas",
      category: "Node / APIs",
      route: "/categorias/back-end"
    },
    {
      id: "3",
      title: "Banco de Dados",
      description: "Guarde e consulte seus dados",
      duration: "4 aulas",
      category: "SQL / NoSQL",
      route: "/categorias/banco-de-dados"
    },
    {
      id: "4",
      title: "Data & Analytics",
      description: "Entenda o mundo com dados",
      duration: "4 aulas",
      category: "Big Data / BI",
      route: "/categorias/data"
    },
  ];

 return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Bem-vindo de Volta!</Text>
    <Text style={styles.subtitle}>Nossos Cursos</Text>
    <LessonsCarousel
      lessons={categorias.map((cat) => ({
        ...cat,
        onPress: () => router.push(cat.route as any),
      }))}
      isCategory
    />
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: { paddingVertical: 16, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 18, fontWeight: "600", color: "#444", marginBottom: 8 },
});