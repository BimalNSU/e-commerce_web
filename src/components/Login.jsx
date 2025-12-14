import React, { useState } from "react";
import api from "../api/api";
import { useAuthStore } from "../store/auth.store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
