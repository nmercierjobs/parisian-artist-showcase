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
                src={`${import.meta.env.BASE_URL}megan-ruth-8ZxCjA3DTrM-unsplash.jpg`}
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
                  Hello, I'm Noah
                </h1>
                <p className="mt-1 text-base text-muted-foreground">
                  Jack Of All Trades Engineer
                </p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px w-full bg-border" />

              {/* Bio Text */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground/80">
                <p>
                  1st paragraph
                </p>
                <p>
                  2nd paragraph
                </p>
                <p>
                  3rd paragraph
                </p>
                <p>
                  4th paragraph
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
