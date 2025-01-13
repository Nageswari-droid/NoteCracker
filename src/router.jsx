import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./components/LogoutBar";
import ErrorPage from "./components/Error";
import Revise from "./components/Revise";

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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
