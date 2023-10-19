import React from "react";
import Login from "./pages/Login";
import Admindashboard from "./pages/Admindashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Teacher from "./pages/Teacher";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import Setting from "./pages/Setting";
import AdminStudent from "./pages/AdminStudent";
import UserAccount from "./pages/UserAccount";

import Contactadmin from "./buttons/Contactadmin";
import Report from "./pages/Report";

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route path="admindashboard" element={<Admindashboard />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="adminstudent" element={<AdminStudent />} />
            <Route path="useraccount" element={<UserAccount />} />
            <Route path="setting" element={<Setting />} />
            <Route path="contactadmin" element={<Contactadmin />} />
            <Route path="report" element={<Report />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
