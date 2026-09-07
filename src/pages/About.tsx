import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import ImageReveal from "@/components/ImageReveal";

const ARTIST_EMAIL = "hello@emilelaurent.art";

const clients = [
  "Galerie Perrotin",
  "Château de Versailles",
  "Musée d'Orsay",
  "Fondation Louis Vuitton",
  "Christie's Paris",
  "Sotheby's",
  "Artcurial",
  "Galerie Templon",
  "Kamel Mennour",
  "Thaddaeus Ropac",
  "Private Collections",
  "Hôtel Le Bristol",
];

const About = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText(ARTIST_EMAIL);
    toast.success("Email copied to clipboard!", {
      description: ARTIST_EMAIL,
    });
  };

  return (
    <>
      <Helmet>
        <title>About — Émile Laurent</title>
        <meta
          name="description"
          content="Learn about Émile Laurent, a Paris-based visual artist whose work explores color, light and the beauty of everyday moments through oil painting."
        />
      </Helmet>

      <Layout>
        <div className="page-transition px-6 py-10 lg:px-10 lg:py-12">
          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            {/* Portrait */}
            <div 
              className="overflow-hidden rounded-2xl bg-card"
              style={{
                opacity: 0,
                animation: "staggerFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                animationDelay: "0ms"
              }}
            >
              <ImageReveal
                src="/megan-ruth-8ZxCjA3DTrM-unsplash.jpg"
                alt="Émile Laurent in her studio"
                className="h-full w-full object-cover"
                style={{ minHeight: "500px", maxHeight: "700px" }}
              />
            </div>

            {/* Bio Content */}
            <div 
              className="flex flex-col justify-start"
              style={{
                opacity: 0,
                animation: "staggerFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                animationDelay: "150ms"
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <h1 className="font-display text-3xl font-medium tracking-tight text-foreground lg:text-4xl">
                  Hello, I'm Émile
                </h1>
                <p className="mt-1 text-base text-muted-foreground">
                  Visual Artist
                </p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px w-full bg-border" />

              {/* Bio Text */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground/80">
                <p>
                  Born in Lyon and now based in Paris, I've dedicated the last fifteen years to exploring the intersection of classical technique and contemporary vision. My journey began at the École des Beaux-Arts, where I fell in love with the Old Masters.
                </p>
                <p>
                  I paint what moves me—the way morning light falls through a window, the quiet dignity of a weathered face, the vibrant chaos of a flower market. Each canvas is an invitation to pause and notice the beauty we often overlook.
                </p>
                <p>
                  My work lives in private collections across Europe, the United States, and Asia. I've been fortunate to collaborate with prestigious galleries and institutions who share my belief that art should stir something deep within us.
                </p>
                <p>
                  When I'm not in the studio, you'll find me wandering through museums, tending to my garden in Montmartre, or hunting for the perfect croissant. I believe the best paintings come from a life fully lived.
                </p>
              </div>
            </div>
          </div>

          {/* Clients Section */}
          <div 
            className="mt-16"
            style={{
              opacity: 0,
              animation: "staggerFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              animationDelay: "300ms"
            }}
          >
            <h2 className="mb-8 font-display text-lg font-medium tracking-tight text-foreground">
              Exhibitions & Collections
            </h2>
            
            {/* Clients Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {clients.map((client, index) => (
                <span
                  key={index}
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground link-underline w-fit"
                  style={{
                    opacity: 0,
                    animation: "staggerFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    animationDelay: `${400 + index * 50}ms`
                  }}
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
