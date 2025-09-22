import { Link } from "react-router";

const HeroPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <header className="absolute inset-x-0 top-0 z-50 p-6 flex justify-between items-center">
        <a href="/" className="text-white font-bold text-xl">
          <img src="/vite.svg" alt="Your Company Logo" className="w-10 h-10" />
        </a>
        <nav className="hidden lg:flex space-x-8 text-white font-semibold">
          <Link to="/login" className="hover:underline">
            Log in
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-white text-5xl sm:text-6xl font-extrabold max-w-4xl leading-tight">
          Your Yield Curve Command Center
        </h1>
        <p className="mt-6 text-gray-400 max-w-2xl text-lg sm:text-xl">
          Navigate interest rate markets with confidence. Visualize term
          structures and act precisely — all in one unified dashboard.
        </p>

        <Link
          to="/login"
          className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default HeroPage;
