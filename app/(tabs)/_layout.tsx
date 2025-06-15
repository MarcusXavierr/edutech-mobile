import { useAuth } from "@/store/auth-context"
import event from "@/utils/event"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { Tabs } from "expo-router"
import { useEffect } from "react"

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

  return (
    <>
      <Tabs screenOptions={tabOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="home" size={24} color={color} />
            },
          }}
        />
        <Tabs.Screen
          name="we"
          options={{
            title: "User",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="user" size={24} color={color} />
            },
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
