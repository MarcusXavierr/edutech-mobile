import { AuthProvider, useAuth } from "@/plugins/auth-context";
import { Stack, useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import "../global.css";

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
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
