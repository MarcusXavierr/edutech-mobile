import { AuthProvider, useAuth } from "@/store/auth-context";
import { Stack, useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import Toast from 'react-native-toast-message'
import "../global.css";
import ToastComponent from "@/components/ToastEvent";

function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/auth");
      } else {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return null
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack screenOptions={tabOptions}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
      <ToastComponent>
        <Toast/>
      </ToastComponent>
    </AuthProvider>
  );
}


// TODO: Tipar melhor
const tabOptions = {
  headerTitleAlign: "center",
  headerTitle: 'Edutech'
} as any
