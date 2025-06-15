import { useAuth } from "@/store/auth-context";
import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';

export default function LoginScreen() {
  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Página temporária do usuário
        </Text>
        <Button onPress={signOut} mode="contained">
          Fazer Logout
        </Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  }
})
