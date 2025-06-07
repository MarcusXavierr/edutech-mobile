import { Text, View, StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { useCourseStore } from "@/store/course"

export default function Index() {
  const courseStore = useCourseStore()
  return (
    <View style={styles.view}>
      <Text>TODO: Implementar a página inicial</Text>
      <Button mode="contained" onPress={courseStore.loadCourses}>
        Clica aqui
      </Button>
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
