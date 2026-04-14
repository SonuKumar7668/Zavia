import { View, TextInput, Button, Text } from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { router } from "expo-router";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://YOUR_IP:5000/login", {
        email,
        password,
      });

      const token = res.data.token;

      await login(token);

      router.replace("/"); // go to tabs
    } catch (err: any) {
      console.log(err.response?.data?.msg);
    }
  };

  return (
    <View>
      <Text>Login</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Button title="Login" onPress={handleLogin} />

      <Button title="Go to Register" onPress={() => router.push("/register")} />
    </View>
  );
}