import { Course, useCourseStore } from '@/store/course';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const { getCourseById, loadCourses, courses } = useCourseStore();
  const [course, setCourse] = useState<Course | undefined>();

  useEffect(() => {
    const courseId = Number(id);
    if (courses.length === 0) {
      // If courses aren't loaded yet, load them first
      loadCourses();
    } else {
      // Get the course from the store
      const foundCourse = getCourseById(courseId);
      setCourse(foundCourse);
    }
  }, [id, courses, getCourseById, loadCourses]);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text variant="headlineLarge">Course Not Found</Text>
        <Text variant="bodyMedium">TODO: Add loading state or error handling</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: course.coverImgUrl }} />
          <Card.Title title={course.name} />
          <Card.Content>
            <Text variant="bodyLarge" style={styles.description}>
              {course.description}
            </Text>
            <Text variant="headlineSmall" style={styles.lessonsTitle}>
              Lessons ({course.lessons?.length || 0})
            </Text>
            {course.lessons?.map((lesson) => (
              <Card key={lesson.id} style={styles.lessonCard}>
                <Card.Content>
                  <Text variant="titleMedium">{lesson.name}</Text>
                  <Text variant="bodyMedium">{lesson.description}</Text>
                </Card.Content>
              </Card>
            ))}
            <Text variant="bodyMedium" style={styles.todo}>
              TODO: Add video player and lesson navigation
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  description: {
    marginBottom: 20,
  },
  lessonsTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  lessonCard: {
    marginBottom: 8,
    elevation: 2,
  },
  todo: {
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
}); 