import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Linkedin, Menu, X } from "lucide-react";
import { toast } from "sonner";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(ARTIST_EMAIL);
    toast.success("Email copied to clipboard!", {
      description: ARTIST_EMAIL,
    });
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background px-6 py-5 lg:hidden">
        <NavLink to="/" className="block">
          <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
            Noah Mercier
          </h1>
          <p className="text-xs text-muted-foreground">
            Jack Of All Trades Engineer
          </p>
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-110"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={`btn-pill-outline text-lg transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            activeClassName="!bg-secondary !text-foreground"
            style={{ 
              transitionDelay: isOpen ? "100ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`btn-pill-outline text-lg transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            activeClassName="!bg-secondary !text-foreground"
            style={{ 
              transitionDelay: isOpen ? "150ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            About
          </NavLink>
          <NavLink
            to="/resume"
            onClick={() => setIsOpen(false)}
            className={`btn-pill-outline text-lg transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            activeClassName="!bg-secondary !text-foreground"
            style={{ 
              transitionDelay: isOpen ? "175ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            Resume
          </NavLink>

          <button
            onClick={() => {
              copyEmail();
              setIsOpen(false);
            }}
            className={`btn-pill mt-4 bg-foreground text-background transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ 
              transitionDelay: isOpen ? "200ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            Email
          </button>

          <div
            className={`mt-6 flex items-center gap-4 transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ 
              transitionDelay: isOpen ? "250ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </div>

        </nav>
      </div>
    </>
  );
};

export default MobileHeader;
