import { useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import GenericsPage from "./pages/GenericsPage";
import HelpersPage from "./pages/HelpersPage";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import TrackerPage from "./pages/TrackerPage";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/tracker", label: "Tracker" },
  { to: "/generics", label: "Generics" },
  { to: "/helpers", label: "Helpers" },
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("project-tracker-theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M12 3v2.25M12 18.75V21M4.72 4.72l1.6 1.6M17.68 17.68l1.6 1.6M3 12h2.25M18.75 12H21M4.72 19.28l1.6-1.6M17.68 6.32l1.6-1.6M15.75 12A3.75 3.75 0 1 1 8.25 12a3.75 3.75 0 0 1 7.5 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3c.34 0 .67.02 1 .06A7 7 0 0 0 21 12.79Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem("project-tracker-theme", theme);
  }, [theme]);

  function handleThemeToggle(): void {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="app-nav-wrap flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p className="app-brand text-sm font-semibold">
            Project Tracker Workspace
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <ul className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      [
                        "btn-base",
                        isActive
                          ? "btn-primary"
                          : "btn-ghost",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleThemeToggle}
              className="btn-base btn-ghost gap-2"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span className="hidden sm:inline">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/generics" element={<GenericsPage />} />
          <Route path="/helpers" element={<HelpersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
