import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/reset-password", { token, newPassword });
      setMessage("Password reset successful.");
    } catch {
      setMessage("Reset failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password" required />
      <button type="submit">Reset Password</button>
      <p>{message}</p>
    </form>
  );
};
