import { Lesson, useCourseStore } from "@/store/course"
import { Result } from "@/types/result"
import { errorToast } from "@/utils/toast"
import { getYouTubeVideoId } from "@/utils/youtube"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { Button, Card, Chip, Divider, ProgressBar, Text } from "react-native-paper"
import YoutubePlayer from "react-native-youtube-iframe"

const { width: screenWidth } = Dimensions.get('window');

export default function LessonPage() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { getLessonById, getLessonNavigation } = useCourseStore()

  const [lesson, setLesson] = useState<Lesson>()
  const [videoId, setVideoId] = useState<Result<string, Error>>()
  const [navigationInfo, setNavigationInfo] = useState<any>(null)

  useEffect(() => {
    const lessonId = +id
    const result = getLessonById(lessonId)
    const navInfo = getLessonNavigation(lessonId)
    
    if (!result) {
      errorToast("Aula não encontrada")
      return
    }
    
    setLesson(result)
    setNavigationInfo(navInfo)
    setVideoId(getYouTubeVideoId(result.videoUrl))
  }, [id])

  const handlePreviousLesson = () => {
    if (navigationInfo?.previousLesson) {
      router.replace(`/course/lesson/${navigationInfo.previousLesson.id}`)
    }
  }

  const handleNextLesson = () => {
    if (navigationInfo?.nextLesson) {
      router.replace(`/course/lesson/${navigationInfo.nextLesson.id}`)
    }
  }

  const handleBackToCourse = () => {
    router.back()
  }

  if (!lesson || !navigationInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text variant="bodyLarge">Carregando aula...</Text>
      </View>
    )
  }

  const progress = (navigationInfo.currentIndex + 1) / navigationInfo.totalLessons

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Button 
            mode="text" 
            onPress={handleBackToCourse}
            icon="arrow-left"
            contentStyle={styles.backButton}
          >
            {navigationInfo.course.name}
          </Button>
        </View>
        
        <View style={styles.progressSection}>
          <Text variant="bodySmall" style={styles.progressText}>
            Aula {navigationInfo.currentIndex + 1} de {navigationInfo.totalLessons}
          </Text>
          <ProgressBar progress={progress} style={styles.progressBar} />
        </View>
      </View>

      <Card style={styles.mainCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.titleSection}>
            <Chip style={styles.lessonChip}>
              Aula {navigationInfo.currentIndex + 1}
            </Chip>
            <Text variant="headlineMedium" style={styles.lessonTitle}>
              {lesson.name}
            </Text>
            {lesson.description && (
              <Text variant="bodyLarge" style={styles.lessonDescription}>
                {lesson.description}
              </Text>
            )}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.videoSection}>
            <Text variant="titleMedium" style={styles.videoTitle}>
              Vídeo da Aula
            </Text>
            <View style={styles.videoPlayerContainer}>
              {videoId?.success ? (
                <YoutubePlayer
                  height={220}
                  videoId={videoId.data}
                  onError={(e: string) => console.log("YouTube player error:", e)}
                />
              ) : (
                <View style={styles.videoError}>
                  <Text variant="bodyMedium" style={styles.errorText}>
                    ❌ {videoId?.error.message ?? "Vídeo não encontrado"}
                  </Text>
                  <Text variant="bodySmall" style={styles.videoUrl}>
                    {lesson.videoUrl}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.navigationSection}>
        <View style={styles.navigationButtons}>
          <Button
            mode="outlined"
            onPress={handlePreviousLesson}
            disabled={!navigationInfo.previousLesson}
            icon="chevron-left"
            contentStyle={styles.navButtonContent}
            style={[styles.navButton, styles.prevButton]}
          >
            {navigationInfo.previousLesson ? "Anterior" : "Primeira aula"}
          </Button>

          <Button
            mode="contained"
            onPress={handleNextLesson}
            disabled={!navigationInfo.nextLesson}
            icon="chevron-right"
            contentStyle={[styles.navButtonContent, styles.nextButtonContent]}
            style={[styles.navButton, styles.nextButton]}
          >
            {navigationInfo.nextLesson ? "Próxima" : "Última aula"}
          </Button>
        </View>

        {navigationInfo.nextLesson && (
          <Card style={styles.nextLessonCard}>
            <Card.Content style={styles.nextLessonContent}>
              <Text variant="bodySmall" style={styles.nextLessonLabel}>
                Próxima aula:
              </Text>
              <Text variant="titleMedium" style={styles.nextLessonTitle}>
                {navigationInfo.nextLesson.name}
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTop: {
    marginBottom: 12,
  },
  backButton: {
    flexDirection: 'row-reverse',
  },
  progressSection: {
    gap: 8,
  },
  progressText: {
    color: '#666',
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  mainCard: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  lessonChip: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  lessonTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 36,
  },
  lessonDescription: {
    color: '#666',
    lineHeight: 26,
  },
  divider: {
    marginBottom: 20,
  },
  videoSection: {
    gap: 12,
  },
  videoTitle: {
    fontWeight: '600',
  },
  videoPlayerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 2,
  },
  videoError: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#d32f2f',
    textAlign: 'center',
  },
  videoUrl: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  navigationSection: {
    paddingHorizontal: 16,
    gap: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    borderRadius: 8,
  },
  navButtonContent: {
    paddingVertical: 8,
  },
  nextButtonContent: {
    flexDirection: 'row-reverse',
  },
  prevButton: {
    borderColor: '#6200ea',
  },
  nextButton: {
    backgroundColor: '#6200ea',
  },
  nextLessonCard: {
    borderRadius: 12,
    backgroundColor: '#f3e5f5',
    borderWidth: 1,
    borderColor: '#e1bee7',
  },
  nextLessonContent: {
    padding: 16,
  },
  nextLessonLabel: {
    color: '#6200ea',
    marginBottom: 4,
    fontWeight: '600',
  },
  nextLessonTitle: {
    color: '#4a148c',
    fontWeight: '500',
  },
})
