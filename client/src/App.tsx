import React from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from "./components/PrivateRoutes"
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {

  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
