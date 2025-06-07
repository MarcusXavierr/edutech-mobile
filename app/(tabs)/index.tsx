import CardContainer from "@/components/CardContainer"
import LoadingSplash from "@/components/LoadingSplash"
import { useCourseStore } from "@/store/course"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from 'react-native-paper'

export default function Index() {
  const { courses, isLoading, loadCourses } = useCourseStore()

  useEffect(() => {
    loadCourses()
  }, [])

  return (
    <View style={styles.view}>
      <LoadingSplash visible={isLoading} />
      <Text variant="headlineMedium">Cursos</Text>
      {
          courses.map((course) => <CardContainer key={course.id} course={course} />)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    backgroundColor: "coral",
    borderRadius: 8,
    alignSelf: "center",
  },
})
