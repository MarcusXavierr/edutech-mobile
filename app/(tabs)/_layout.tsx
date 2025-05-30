import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={tabOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return <FontAwesome name="home" size={24} color={color} />
              }

              return <AntDesign name="home" size={24} color={color} />
            },
          }}
        />
        <Tabs.Screen name="login" options={{ title: "Login" }} />
      </Tabs>
    </>
  );
}

const tabOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: "coral",
};
