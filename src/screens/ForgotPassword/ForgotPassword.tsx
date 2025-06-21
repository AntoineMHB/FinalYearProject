import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/forgotPassword', { email });
      setMessage("Check your email for the reset link.");
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
      <button type="submit">Send Reset Link</button>
      <p>{message}</p>
    </form>
  );
};

export default ForgotPassword;
