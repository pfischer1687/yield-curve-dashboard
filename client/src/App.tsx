import { Routes, Route } from "react-router";
import HeroPage from "./pages/HeroPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import YieldCurvePage from "./pages/YieldCurvePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/yieldcurve"
        element={
          <ProtectedRoute>
            <YieldCurvePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
