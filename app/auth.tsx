import LoadingSplash from "@/components/LoadingSplash"
import { LoginResponse } from "@/services/auth.service"
import { useAuth } from "@/store/auth-context"
import { HttpError } from "@/types/http-error"
import { isFailure, isSuccess, Result } from "@/types/result"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"

import { Button, Text, TextInput, useTheme } from "react-native-paper"

export default function AuthScreen() {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [error, setError] = useState<string | null>()
  const theme = useTheme()
  const authContext = useAuth()

  const handleAuth = async () => {
    const validateFill = (isLoginScreen: boolean) => {
      if(isLoginScreen)
        return !password || !username
      return !email || !password || !username
    }

    if (validateFill(isSignedUp)) {
      setError("Por favor, preencha o formulário corretamente")
      return
    }

    if (password.length < 6) {
      setError("A senha precisa ter mais de 6 dígitos")
      return
    }

    setError(null)
    let data: Result<LoginResponse, HttpError>
    if (isSignedUp) {
      data = await authContext.signIn({ username, password })
    } else {
      data = await authContext.signUp({ email, password, username })
    }

    if (isFailure(data)) {
      setError(data.error.userMessage)
      console.log(data.error)
    }

    if (isSuccess(data)) {
      console.log("data", data)
    }
  }

  const handleSwitch = () => setIsSignedUp((prev) => !prev)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LoadingSplash visible={authContext.isLoading} />
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignedUp ? "Bem vindo de volta" : "Criar conta"}
        </Text>
        <TextInput
          style={styles.input}
          label="Nome"
          autoCapitalize="none"
          mode="outlined"
          onChangeText={setUsername}
        />

        {
          !isSignedUp &&  // Gambiarra pq não temos v-if
          <TextInput
            style={styles.input}
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="email@example.com"
            mode="outlined"
            onChangeText={setEmail}
          />
        }

        <TextInput
          style={styles.input}
          label="Senha"
          autoCapitalize="none"
          secureTextEntry
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
            ? "Ainda não tem uma conta? Faça seu cadastro!"
            : "Já tem uma conta? Faça o Login!"}
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
