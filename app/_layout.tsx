import { AuthProvider } from "@/plugins/auth-context";
import { Stack, useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import "../global.css";

function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    // Small delay to ensure the navigator is mounted
    // BUG: Fix this later
    const timer = setTimeout(() => {
      if (!isAuth) {
        router.replace("/auth");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuth, router]);

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
