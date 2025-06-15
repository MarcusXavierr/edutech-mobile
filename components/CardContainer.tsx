import { Course } from "@/store/course";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from 'react-native-paper';
import httpAPI from '@/services/httpApi'

const { width: screenWidth } = Dimensions.get('window');

export default function CardContainer({ course }: { course: Course }) {
  const router = useRouter();
  const theme = useTheme();
  const baseUrl = httpAPI.defaults.baseURL

  const handleViewDetails = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={5}>
        <Card.Cover
          source={{ uri: `${baseUrl}${course.coverImgUrl}` }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']}
          style={styles.gradientOverlay}
        />

        <Card.Content style={styles.content}>
          <Text
            variant="headlineSmall"
            style={[styles.title, { color: theme.colors.onSurface }]}
            numberOfLines={2}
          >
            {course.name}
          </Text>

          <Text
            variant="bodyMedium"
            style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
            numberOfLines={3}
          >
            {course.description}
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleViewDetails}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Ver Detalhes
          </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    width: screenWidth > 768 ? '45%' : '90%',
    maxWidth: 400,
    minWidth: 280,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  coverImage: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    marginBottom: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  actions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 24,
    minWidth: 120,
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
})
