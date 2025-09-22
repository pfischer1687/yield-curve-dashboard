import { useAuth } from "../hooks/useAuth";
import YieldCurveDashboard from "../components/YieldCurveDashboard";
import { Link, useNavigate } from "react-router";

const YieldCurvePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center text-white bg-gray-900 z-30 px-4 h-16 border-b border-gray-700">
        <span className="font-bold text-2xl">Welcome, {user!.username}</span>
        <Link
          to="/"
          className="hover:underline font-semibold"
          onClick={handleLogout}
        >
          Log out
        </Link>
      </header>
      <YieldCurveDashboard userId={user!.id} />
    </div>
  );
};

export default YieldCurvePage;
