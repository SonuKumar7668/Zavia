import { Slot, Redirect } from "expo-router";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

function RootLayoutNav() {
  const { userToken, loading } = useContext(AuthContext);

// if (loading) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" />
//     </View>
//   );
// }

  // 🔥 Core Logic
  // if (!userToken) {
  //   return <Redirect href="/login" />;
  // }

  return <Slot />; // go to tabs
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}