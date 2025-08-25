import { Link, useLocation } from "wouter";
import { Home, Users, ClipboardList, Mail } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Accueil", icon: Home, testId: "nav-accueil" },
    { path: "/presentation", label: "Présentation de la MAM", icon: Users, testId: "nav-presentation" },
    { path: "/pre-inscription", label: "Pré inscription", icon: ClipboardList, testId: "nav-inscription" },
    { path: "/contact", label: "Contact", icon: Mail, testId: "nav-contact" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
      {navItems.map(({ path, label, icon: Icon, testId }) => (
        <Link key={path} href={path}>
          <button
            className={`tab-button px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
              location === path ? "active" : ""
            }`}
            data-testid={testId}
          >
            <Icon className="inline mr-2 h-4 w-4" />
            {label}
          </button>
        </Link>
      ))}
    </nav>
  );
}
