import { NavLink } from "@/components/NavLink";
import { Linkedin } from "lucide-react";
import { toast } from "sonner";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

const Sidebar = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText(ARTIST_EMAIL);
    toast.success("Email copied to clipboard!", {
      description: ARTIST_EMAIL,
    });
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-background px-8 py-10 lg:w-72">
      {/* Logo / Artist Name */}
      <div 
        className="mb-16"
        style={{
          opacity: 0,
          animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          animationDelay: "0ms"
        }}
      >
        <NavLink to="/" className="block w-fit">
          <h1 className="font-display text-5xl font-medium tracking-tight text-foreground lg:text-6xl">
            Noah Mercier
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Jack Of All Trades Engineer
          </p>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav 
        className="flex flex-col gap-2"
        style={{
          opacity: 0,
          animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          animationDelay: "100ms"
        }}
      >
        <NavLink
          to="/"
          end
          className="btn-pill-outline w-fit"
          activeClassName="!bg-secondary !text-foreground"
        >
          Projects
        </NavLink>
        <NavLink
          to="/about"
          className="btn-pill-outline w-fit"
          activeClassName="!bg-secondary !text-foreground"
        >
          About
        </NavLink>
        <NavLink
          to="/resume"
          className="btn-pill-outline w-fit"
          activeClassName="!bg-secondary !text-foreground"
        >
          Resume
        </NavLink>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA Button + Social Icons */}
      <div 
        className="mb-8 flex items-center gap-3"
        style={{
          opacity: 0,
          animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          animationDelay: "200ms"
        }}
      >
        <button
          onClick={copyEmail}
          className="btn-pill bg-secondary text-foreground"
        >
          Email
        </button>

        <a
          href="https://www.linkedin.com/in/noah-mercier-453940421/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} strokeWidth={1.5} />
        </a>
      </div>

    </aside>
  );
};

export default Sidebar;
