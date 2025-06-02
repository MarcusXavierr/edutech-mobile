import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function TabsLayout() {
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
          name="user"
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
  headerTitleAlign: "center",
}
