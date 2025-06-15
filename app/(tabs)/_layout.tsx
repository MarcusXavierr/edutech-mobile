import { useAuth } from "@/store/auth-context"
import event from "@/utils/event"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { Tabs } from "expo-router"
import React, { useEffect } from "react"
import { Text, TouchableOpacity } from "react-native"

export default function TabsLayout() {
  const authStore = useAuth()

  useEffect(() => {
    event.on('shouldLogout', async (logout) => {
      if (logout) {
        await authStore.signOut()
      }
    })

    return () => {
      event.off('shouldLogout')
    }
  }, [authStore])

  const handleCustomAction = async () => {
    await authStore.signOut()
  }

  return (
    <>
      <Tabs screenOptions={tabOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => {
              return <Text style={{ fontSize: 24, color }}>🏠</Text>
            },
          }}
        />
        <Tabs.Screen
          name="we"
          options={{
            title: "Sobre nós",
            tabBarIcon: ({ color }) => {
              return <Text style={{ fontSize: 24, color }}>👥</Text>
            },
          }}
        />
        <Tabs.Screen
          name="custom-action"
          options={{
            title: "Logout",
            tabBarIcon: ({ color }) => {
              return <Text style={{ fontSize: 24, color }}>👋</Text>
            },
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={handleCustomAction}
                style={props.style}
                accessibilityRole={props.accessibilityRole}
                accessibilityState={props.accessibilityState}
                accessibilityLabel={props.accessibilityLabel}
                testID={props.testID}
              >
                {props.children}
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </>
  )
}

const tabOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: "coral",
  tabBarInactiveTintColor: "black", // Se quiser garantir o preto quando não ativo
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
  tabBarStyle: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 60,
    paddingBottom: 6,
    paddingTop: 4,
  },
  headerTitleAlign: "center",
}
