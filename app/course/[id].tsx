import { Course, useCourseStore } from '@/store/course';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getYouTubeVideoId } from '@/utils/youtube'

const { width: screenWidth } = Dimensions.get('window');

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
        <Text variant="headlineLarge">Curso Não Encontrado</Text>
        <Text variant="bodyMedium">TODO: Adicionar estado de carregamento ou tratamento de erro</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Card style={styles.heroCard}>
          <Card.Cover
            source={{ uri: course.coverImgUrl }}
            style={styles.heroImage}
          />
        </Card>
        <View style={styles.titleSection}>
          <Text variant="headlineLarge" style={styles.courseTitle}>
            {course.name}
          </Text>
          <Text variant="bodyLarge" style={styles.courseDescription}>
            {course.description}
          </Text>
        </View>
      </View>

      {/* Lessons Section */}
      <View style={styles.lessonsSection}>
        <Text variant="headlineSmall" style={styles.lessonsTitle}>
          Aulas ({course.lessons?.length || 0})
        </Text>

        {course.lessons?.map((lesson, index) => {
          const videoId = getYouTubeVideoId(lesson.videoUrl);

          return (
            <Card key={lesson.id} style={styles.lessonCard} onPress={() => { router.push(`/course/lesson/${lesson.id}`) }}>
              <Card.Content style={styles.lessonContent}>
                <Text variant="titleMedium" style={styles.lessonNumber}>
                  Aula {index + 1}
                </Text>
                <Text variant="titleLarge" style={styles.lessonTitle}>
                  {lesson.name}
                </Text>
                <Text variant="bodyMedium" style={styles.lessonDescription}>
                  {lesson.description}
                </Text>

                {/* YouTube Player */}
                <View style={styles.videoPlayerContainer}>
                  {videoId.success ? (
                    <YoutubePlayer
                      height={200}
                      videoId={videoId.data}
                      onError={(e: string) => console.log('YouTube player error:', e)}
                    />
                  ) : (
                    <View style={styles.videoError}>
                                             <Text variant="bodySmall" style={styles.errorText}>
                         ❌ {videoId.error.message}
                       </Text>
                      <Text variant="bodySmall" style={styles.videoUrl}>
                        {lesson.videoUrl}
                      </Text>
                    </View>
                  )}
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heroSection: {
    marginBottom: 20,
  },
  heroCard: {
    borderRadius: 0,
    elevation: 0,
  },
  heroImage: {
    height: 250,
    borderRadius: 0,
  },
  titleSection: {
    padding: 20,
    backgroundColor: 'white',
  },
  courseTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  courseDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },
  lessonsSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  lessonsTitle: {
    marginBottom: 15,
    fontWeight: 'bold',
  },
  lessonCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  lessonContent: {
    padding: 16,
  },
  lessonNumber: {
    color: '#666',
    marginBottom: 4,
  },
  lessonTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lessonDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  videoPlayerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  videoError: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#d32f2f',
  },
  videoUrl: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});
