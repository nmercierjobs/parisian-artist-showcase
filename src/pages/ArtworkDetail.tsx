import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import ImageReveal from "@/components/ImageReveal";
import { getArtworkBySlug, artworks } from "@/data/artworks";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

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
          content={`${artwork.title} by Émile Laurent. ${artwork.description.substring(0, 150)}...`}
        />
      </Helmet>

      <Layout>
        <div className="page-transition flex flex-col px-6 py-10 lg:px-10 lg:py-12">
          {/* Hero Image - With margins and rounded corners */}
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

          {/* Content Section */}
          <div className="py-6 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Title and Description */}
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

                <p className="mt-6 text-base leading-relaxed text-foreground/80">
                  {artwork.description}
                </p>
              </div>

              {/* Right Column - Details and CTA */}
              <div 
                style={{
                  opacity: 0,
                  animation: "staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                  animationDelay: "300ms"
                }}
              >
              </div>
            </div>

            {/* Navigation */}
            <div 
              className="mt-16 flex items-center justify-between border-t border-border pt-8"
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
