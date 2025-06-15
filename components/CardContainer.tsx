import { Course } from "@/store/course";
import { useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from 'react-native-paper';

export default function CardContainer({ course }: { course: Course }) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={5}>
        <Card.Title title={course.name} />
        <Card.Content>
          <Text>{course.description}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: course.coverImgUrl }} />
        <Card.Actions>
          <Button mode="contained" onPress={handleViewDetails}>
            Ver Detalhes
          </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    width: '90%',
    maxWidth: 400,
  },
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
})
