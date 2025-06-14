import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 24, color }}>
              {}
             🏠
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="we"
        options={{
          title: "Sobre Nós",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 24, color }}>
              {}
              👥
            </Text>
          ),
        }}
      />

      <Tabs.Screen name="login" options={{ href: null }} />
      <Tabs.Screen name="carrosel" options={{ href: null }} />
    </Tabs>
  );
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
};
