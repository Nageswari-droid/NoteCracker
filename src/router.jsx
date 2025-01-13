import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./components/LogoutBar";
import ErrorPage from "./components/Error";
import Revise from "./components/Revise";

const homePage = () => {
  return (
    <div className="bg-[#1a1a19] h-full w-full">
      <Logout />
      <Home />
    </div>
  );
};

const revisionPage = () => {
  return (
    <div className="bg-[#1a1a19] h-full w-full">
      <Logout />
      <Revise />
    </div>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/pages"
          element={<ProtectedRoute>{homePage()}</ProtectedRoute>}
        />
        <Route
          path="/revise"
          element={<ProtectedRoute>{revisionPage()}</ProtectedRoute>}
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
          element={<ProtectedRoute>{homePage()}</ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
