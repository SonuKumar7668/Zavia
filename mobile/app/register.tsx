import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import axios from "axios";
import { router } from "expo-router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://YOUR_IP:5000/register", {
        name,
        email,
        password,
      });

      router.replace("/login");
    } catch (err: any) {
      console.log(err.response?.data?.msg);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}