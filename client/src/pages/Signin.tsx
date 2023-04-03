import axios from "../utils/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"

type Props = {};

const Signin = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form className="authForm" onSubmit={login}>
      <h1 className="title">Login</h1>
        <label htmlFor="email">Hey, Enter your details to get sign in to your account</label>
        <div className="inputs">
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        
      
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      
        <button type="submit">Login</button>
        <h6 className="label_link" onClick={() => navigate("/auth/register")}>Create a new account?</h6>
      </form>
      
    </div>
  );
};

export default Signin;
