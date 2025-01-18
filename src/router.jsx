import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./components/LogoutBar";
import ErrorPage from "./components/Error";
import Revise from "./components/Revise";
import { useState } from "react";
import { checkEnv } from "./utils/checkEnv";
import ConfigPage from "./components/ConfigPage";

const Layout = (props) => {
  return (
    <ProtectedRoute>
      <div className="bg-[#1a1a19] h-full w-full">
        <Logout />
        {props.children}
      </div>
    </ProtectedRoute>
  );
};

const LoginConfig = () => {
  const [hasConfigurations, setHasConfigurations] = useState(false);

  return (
    <>
      {!checkEnv() && !hasConfigurations ? (
        <ConfigPage setHasConfigurations={setHasConfigurations} />
      ) : (
        <Login />
      )}
    </>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginConfig />} />
        <Route
          path="/pages"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/revise"
          element={
            <Layout>
              <Revise />
            </Layout>
          }
        />
        <Route
          path="/error"
          element={
            <ProtectedRoute>
              <ErrorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
