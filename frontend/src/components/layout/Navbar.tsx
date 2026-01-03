import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ isLoggedIn = false, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isLandingPage = location.pathname === "/";
  
  const navLinks = isLoggedIn
    ? [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Trips", path: "/trips" },
        { name: "Calendar", path: "/calendar" },
        { name: "Community", path: "/community" },
        { name: "Search", path: "/search" },
      ]
    : [
        { name: "Features", path: "#features" },
        { name: "How it works", path: "#how-it-works" },
        { name: "Destinations", path: "#destinations" },
      ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLandingPage ? "bg-transparent" : "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              isLandingPage 
                ? "bg-primary-foreground/20 group-hover:bg-primary-foreground/30" 
                : "bg-primary/10 group-hover:bg-primary/20"
            }`}>
              <Globe className={`h-6 w-6 ${isLandingPage ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <span className={`font-display text-xl font-bold ${
              isLandingPage ? "text-primary-foreground" : "text-foreground"
            }`}>
              GlobeTrotter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body text-sm font-medium transition-colors duration-200 ${
                  isLandingPage
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button variant={isLandingPage ? "hero-outline" : "ghost"} size="sm">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant={isLandingPage ? "hero-outline" : "ghost"} 
                  size="sm"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant={isLandingPage ? "hero-outline" : "ghost"} size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant={isLandingPage ? "hero" : "default"} size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isLandingPage 
                ? "text-primary-foreground hover:bg-primary-foreground/10" 
                : "text-foreground hover:bg-muted"
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg animate-fade-up">
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-2 px-4 font-body text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="default" className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
