import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { Home, Compass, User } from "lucide-react-native";
import AppHeader from "../../src/components/AppHeader";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function AppLayout() {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !token) {
            router.replace("/(auth)/login");
        }
    }, [token, loading]);

    return (
        <Tabs
            screenOptions={{
                header: () => <AppHeader />,   // ← use custom header
                tabBarActiveTintColor: "#4F46E5",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6",
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 64,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="job/[id]"
                options={{ href: null }}
            />
            <Tabs.Screen name="index" options={{ href: null }} />
        </Tabs>
    );
}