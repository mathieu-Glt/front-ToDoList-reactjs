import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "@/pages/login";
import ProtectedRoute from "@/components/auth/protectedRoute";
import Content from "@/pages/content";
import SignUp from "@/pages/signUp";

function App() {
  return (
    <Router>
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Content />}/>
            </Route>

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/fail" element={<>Internal server error</>}/>
      </Routes>
    </Router>
  );
}

export default App;
