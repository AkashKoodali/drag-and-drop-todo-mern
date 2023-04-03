import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./styles.css"

type Props = {};

const Register = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    try {
      await axios.post("/api/auth/register", user);
      toast.success("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="register">
      <form className="authForm" onSubmit={register}>
      <h1 className="title">Register</h1>
    <div className="inputs">
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
       
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            required
          />
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <h6 className="label_link" onClick={() => navigate("/auth/signin")}>Already have a new account?</h6>
      </form>
    </div>
  );
};

export default Register;
