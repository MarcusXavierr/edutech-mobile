import { useAuth } from "@/plugins/auth-context"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native"

import { Text, TextInput, Button, useTheme } from "react-native-paper"

export default function AuthScreen() {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string|null>()
  const theme = useTheme()
  const authContext = useAuth()

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Por favor, preencha o formulário corretamente")
    }

    if (password.length < 6) {
      setError("A senha precisa ter mais de 6 dígitos")
    }

    setError(null)
    let data
    if (isSignedUp) {
      data = await authContext.signIn({ email, password })
    } else {
      data = await authContext.signUp({ email, password })
    }

    console.log('data', data)
  }

  const handleSwitch = () => setIsSignedUp((prev) => !prev)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignedUp ? "Bem vindo de volta" : "Criar conta"}
        </Text>
        <TextInput
          style={styles.input}
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email@example.com"
          mode="outlined"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          label="Senha"
          autoCapitalize="none"
          keyboardType="visible-password"
          mode="outlined"
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignedUp ? "Entrar" : "Registrar"}
        </Button>
        <Button
          mode="text"
          onPress={handleSwitch}
          style={styles.switchModeButton}
        >
          {isSignedUp
            ? "Já tem uma conta? Faça o Login!"
            : "Ainda não tem uma conta? Faça seu cadastro!"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
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
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
})
