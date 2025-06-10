import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/auth/forgot-password", { email });
      setMessage("✅ OTP sent to your email. Redirecting...");
      setTimeout(() => navigate("/verify-otp", { state: { email } }), 2000);
    } catch (err) {
      setMessage("❌ Failed to send reset email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      {message && <p className="mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
