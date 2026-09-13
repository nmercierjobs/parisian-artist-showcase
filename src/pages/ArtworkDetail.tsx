import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import ImageReveal from "@/components/ImageReveal";
import { getArtworkBySlug, artworks } from "@/data/artworks";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

const sections = [
  { key: "summary" as const, label: "Summary" },
  { key: "problem" as const, label: "The Problem" },
  { key: "requirements" as const, label: "Requirements" },
  { key: "research" as const, label: "Approaches Considered" },
  { key: "finalApproach" as const, label: "Final Approach" },
  { key: "problems" as const, label: "Problems" },
  { key: "results" as const, label: "Results" },
];

const ArtworkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const artwork = getArtworkBySlug(slug || "");

  if (!artwork) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <h1 className="font-display text-3xl text-foreground">Artwork not found</h1>
          <Link
            to="/"
            className="mt-6 text-sm text-muted-foreground link-underline hover:text-foreground"
          >
            Return to gallery
          </Link>
        </div>
      </Layout>
    );
  }

  const currentIndex = artworks.findIndex((a) => a.slug === slug);
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  const copyEmail = () => {
    const subject = encodeURIComponent(`Inquiry: ${artwork.title}`);
    navigator.clipboard.writeText(`${ARTIST_EMAIL}?subject=${decodeURIComponent(subject)}`);
    toast.success("Email copied to clipboard!", {
      description: ARTIST_EMAIL,
    });
  };

  return (
    <>
      <Helmet>
        <title>{artwork.title} — Émile Laurent</title>
        <meta
          name="description"
          content={`${artwork.title} by Émile Laurent. ${artwork.summary.substring(0, 150)}...`}
        />
      </Helmet>

      <Layout>
        <div className="page-transition flex min-h-screen flex-col py-16 lg:py-24">
          {/* Hero Image - Contained with rounded corners */}
          <div className="px-6 lg:px-10">
            <div
              className="relative w-full overflow-hidden rounded-2xl aspect-[3/4] lg:aspect-auto lg:h-[85vh]"
              style={{
                opacity: 0,
                animation: "staggerFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                animationDelay: "0ms"
              }}
            >
              <ImageReveal
                src={artwork.detailImage}
                alt={artwork.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Content Section - Full page width */}
          <div className="flex-1 px-6 py-12 lg:px-10 lg:py-24">
            <div
              style={{
                opacity: 0,
                animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                animationDelay: "200ms"
              }}
            >
              <h1 className="font-display text-4xl font-medium tracking-tight text-foreground lg:text-5xl">
                {artwork.title}
              </h1>

              <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/80 lg:text-lg lg:leading-loose">
                {sections.map(({ key, label }) => (
                  <section key={key} id={key}>
                    <h2 className="font-display text-2xl font-medium tracking-tight text-foreground lg:text-3xl">
                      {label}
                    </h2>
                    {key === "summary" ? (
                      <div className="mt-4">
                        {/* Supporting Image - Half page width, floated within the text */}
                        <div
                          className="float-right ml-6 mb-4 w-1/2 shrink-0 overflow-hidden rounded-xl"
                          style={{
                            opacity: 0,
                            animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                            animationDelay: "280ms"
                          }}
                        >
                          <ImageReveal
                            src={artwork.supportImage}
                            alt={`${artwork.title} supporting view`}
                            className="aspect-[4/3] w-full object-cover"
                          />
                          <p className="mt-2 text-sm text-muted-foreground italic">
                            {artwork.supportCaption}
                          </p>
                        </div>
                        {artwork.summary}
                      </div>
                    ) : key === "requirements" ? (
                      <ul className="mt-4 list-disc list-inside space-y-2">
                        {artwork.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : key === "research" ? (
                      <>
                        <ol className="mt-4 list-decimal list-inside space-y-4">
                          {artwork.research.map((approach, index) => (
                            <li key={index}>
                              <span className="font-medium text-foreground">{approach.title}</span>
                              <p className="-mt-4 rounded-lg bg-background px-0 py-4 text-foreground/80">
                                {approach.text}
                              </p>
                              <ul className="-mt-2 list-disc list-inside space-y-1 pl-10 text-muted-foreground">
                                {approach.subPoints.map((point, pIndex) => (
                                  <li key={pIndex}>{point}</li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ol>
                        <div className="mt-8 rounded-lg bg-background p-0">
                          <p className="text-foreground/80">{artwork.finalApproach}</p>
                        </div>
                      </>
                    ) : (
                      <p className="mt-4">{artwork[key]}</p>
                    )}
                  </section>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div 
              className="mt-32 flex items-center justify-between border-t border-border pt-12"
              style={{
                opacity: 0,
                animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                animationDelay: "400ms"
              }}
            >
              {prevArtwork ? (
                <button
                  onClick={() => navigate(`/projects/${prevArtwork.slug}`)}
                  className="btn-pill-outline flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  <span className="hidden sm:inline">{prevArtwork.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <div />
              )}

              {nextArtwork ? (
                <button
                  onClick={() => navigate(`/projects/${nextArtwork.slug}`)}
                  className="btn-pill-outline flex items-center gap-2"
                >
                  <span className="hidden sm:inline">{nextArtwork.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtworkDetail;
