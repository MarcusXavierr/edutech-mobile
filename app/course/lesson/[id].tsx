import { Lesson, useCourseStore } from "@/store/course"
import { Result } from "@/types/result"
import { errorToast } from "@/utils/toast"
import { getYouTubeVideoId } from "@/utils/youtube"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import YoutubePlayer from "react-native-youtube-iframe"

export default function LessonPage() {
  const { id } = useLocalSearchParams()
  const { getLessonById } = useCourseStore()

  const [lesson, setLesson] = useState<Lesson>()
  const [videoId, setVideoId] = useState<Result<string, Error>>()
  useEffect(() => {
    const result = getLessonById(+id)
    if (!result) {
      errorToast("Aula não encontrada")
    }
    setLesson(result)
    setVideoId(getYouTubeVideoId(result!.videoUrl))
  }, [])

  return (
    <View>
      <Text variant="headlineSmall">{lesson?.name}</Text>

      <View style={styles.videoPlayerContainer}>
        {videoId?.success ? (
          <YoutubePlayer
            height={200}
            videoId={videoId.data}
            onError={(e: string) => console.log("YouTube player error:", e)}
          />
        ) : (
          <View style={styles.videoError}>
            <Text variant="bodySmall" style={styles.errorText}>
              ❌ {videoId?.error.message ?? "Vídeo não encontrado"}
            </Text>
            <Text variant="bodySmall" style={styles.videoUrl}>
              {lesson?.videoUrl}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  videoPlayerContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  videoUrl: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
  videoError: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#d32f2f",
  },
})
