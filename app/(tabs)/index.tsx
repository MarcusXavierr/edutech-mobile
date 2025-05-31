import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>TODO: Remover isso do histórico de commits</Text>
    </View>
  );
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
});
