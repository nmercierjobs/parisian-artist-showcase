import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import ImageReveal from "@/components/ImageReveal";
import { getArtworkBySlug, artworks, type CaseStudyImage } from "@/data/artworks";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

const sections = [
  { key: "summary" as const, label: "Summary" },
  { key: "problem" as const, label: "The Problem" },
  { key: "requirements" as const, label: "Requirements" },
  { key: "research" as const, label: "Approaches Considered" },
  { key: "finalApproach" as const, label: "Chosen Approach: Steer-by-wire" },
  { key: "results" as const, label: "Results" },
];

const CaseStudyPhoto = ({ image, className = "" }: { image: CaseStudyImage; className?: string }) => (
  <div
    className={`max-w-full mx-auto overflow-hidden rounded-xl ${className}`}
    style={{ width: `${image.displayWidthPercent}%` }}
  >
    <ImageReveal
      src={image.src}
      alt={image.alt}
      className="h-full w-full object-cover"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    />
  </div>
);

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
              className="relative mx-auto max-w-full overflow-hidden rounded-2xl aspect-[3/4] lg:aspect-auto lg:h-[85vh]"
              style={{
                width: `${artwork.detailImageWidthPercent}%`,
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
          <div className="border-x-2 border-border mx-auto max-w-6xl flex-1 px-6 py-12 lg:px-10 lg:py-24 font-[Arial]">
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

              <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground lg:text-lg lg:leading-loose">
                {sections.map(({ key, label }) => (
                  <section key={key} id={key}>
                    <h2 className="font-display text-2xl font-medium tracking-tight text-foreground lg:text-3xl">
                      {key === "finalApproach" && artwork.cameraFinalApproachDetails ? "Chosen approach: 3D Camera" : label}
                    </h2>
                    {key === "summary" ? (
                      <div className="mt-4">
                        {/* Supporting Image - Half page width, floated within the text */}
                        <div
                          className="float-right ml-6 mb-4 max-w-full shrink-0 overflow-hidden rounded-xl"
                          style={{
                            width: `${artwork.supportImageWidthPercent}%`,
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
                      <ol className="mt-4 list-decimal list-inside space-y-4">
                        {artwork.research.map((approach, index) => (
                          <li key={index}>
                            <span className="font-medium text-foreground">{approach.title}</span>
                            <p className="-mt-4 rounded-lg bg-background px-0 py-4 text-foreground/80">
                              {approach.text}
                            </p>
                            <ul className="-mt-2 list-disc list-inside space-y-1 pl-10 text-foreground/80">
                              {approach.subPoints.map((point, pIndex) => (
                                <li key={pIndex}>{point}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ol>
                    ) : key === "finalApproach" ? (
                      artwork.cameraFinalApproachDetails ? (
                        <div className="mt-4 space-y-12">
                          {artwork.cameraFinalApproachDetails.map((section) => (
                            <section key={section.title}>
                              <h3 className="font-display text-2xl font-medium text-foreground lg:text-3xl">{section.title}</h3>
                              <div className="mt-4 space-y-5">
                                {section.blocks.map((block, index) =>
                                  block.type === "text" ? (
                                    <p key={index}>{block.content}</p>
                                  ) : block.type === "list" ? (
                                    <ul key={index} className="list-disc space-y-2 pl-6">
                                      {block.points.map((point) => <li key={point}>{point}</li>)}
                                    </ul>
                                  ) : (
                                    <CaseStudyPhoto key={index} image={block.image} />
                                  ),
                                )}
                              </div>
                              {section.topics && (
                                <div className="mt-8 space-y-7">
                                  {section.topics.map((topic) => (
                                    <div key={topic.title}>
                                      <h4 className="font-semibold text-foreground">{topic.title}</h4>
                                      <p className="mt-2">{topic.text}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </section>
                          ))}
                        </div>
                      ) : artwork.bicycleFinalApproachDetails ? (
                        <div className="mt-4 space-y-14">
                          <div>
                            <p>{artwork.finalApproach}</p>
                            <ul className="mt-3 list-disc space-y-1 pl-6">
                              {artwork.bicycleFinalApproachDetails.summaryPoints.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          <section>
                            <h3 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Mechanical Design</h3>
                            <p className="mt-4">{artwork.bicycleFinalApproachDetails.mechanical.intro}</p>
                            <ol className="mt-4 list-decimal space-y-2 pl-6">
                              {artwork.bicycleFinalApproachDetails.mechanical.steps.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                            <CaseStudyPhoto image={artwork.bicycleFinalApproachDetails.mechanical.image} className="mt-6" />
                            <div className="mt-8 space-y-6">
                              {artwork.bicycleFinalApproachDetails.mechanical.topics.map((topic) => (
                                <div key={topic.title}>
                                  <h4 className="font-semibold text-foreground">{topic.title}</h4>
                                  <p className="mt-2">{topic.text}</p>
                                </div>
                              ))}
                            </div>
                          </section>

                          <section>
                            <h3 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Electrical Design</h3>
                            <div className="mt-4 space-y-7">
                              {artwork.bicycleFinalApproachDetails.electrical.topics.map((topic) => (
                                <div key={topic.title}>
                                  <h4 className="font-semibold text-foreground">{topic.title}</h4>
                                  <p className="mt-2">{topic.text}</p>
                                  {topic.image && <CaseStudyPhoto image={topic.image} className="mt-5" />}
                                  {topic.steps && (
                                    <ol className="mt-4 list-decimal space-y-2 pl-6">
                                      {topic.steps.map((step) => <li key={step}>{step}</li>)}
                                    </ol>
                                  )}
                                </div>
                              ))}
                            </div>
                          </section>

                          <section>
                            <h3 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Software Design</h3>
                            <p className="mt-4">{artwork.bicycleFinalApproachDetails.software.intro}</p>
                            <div className="mt-7 space-y-10">
                              <div>
                                <h4 className="font-semibold text-foreground">{artwork.bicycleFinalApproachDetails.software.control.title}</h4>
                                <p className="mt-2">{artwork.bicycleFinalApproachDetails.software.control.textBeforeFirstImage}</p>
                                <CaseStudyPhoto image={artwork.bicycleFinalApproachDetails.software.control.firstImage} className="mt-5" />
                                <p className="mt-5">{artwork.bicycleFinalApproachDetails.software.control.textBeforeSecondImage}</p>
                                <CaseStudyPhoto image={artwork.bicycleFinalApproachDetails.software.control.secondImage} className="mt-5" />
                                <p className="mt-5">{artwork.bicycleFinalApproachDetails.software.control.textBeforeList}</p>
                                <ul className="mt-3 list-disc space-y-1 pl-6">
                                  {artwork.bicycleFinalApproachDetails.software.control.points.map((point) => <li key={point}>{point}</li>)}
                                </ul>
                                <p className="mt-5">{artwork.bicycleFinalApproachDetails.software.control.textBeforeThirdImage}</p>
                                <CaseStudyPhoto image={artwork.bicycleFinalApproachDetails.software.control.thirdImage} className="mt-5" />
                                <p className="mt-5">{artwork.bicycleFinalApproachDetails.software.control.closingText}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{artwork.bicycleFinalApproachDetails.software.tuning.title}</h4>
                                <p className="mt-2">{artwork.bicycleFinalApproachDetails.software.tuning.text}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{artwork.bicycleFinalApproachDetails.software.integration.title}</h4>
                                <p className="mt-2">{artwork.bicycleFinalApproachDetails.software.integration.intro}</p>
                                <CaseStudyPhoto image={artwork.bicycleFinalApproachDetails.software.integration.image} className="mt-5" />
                                <p className="mt-5">{artwork.bicycleFinalApproachDetails.software.integration.closingText}</p>
                              </div>
                            </div>
                          </section>

                          <section>
                            <h3 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Challenges</h3>
                            <p className="mt-4">{artwork.bicycleFinalApproachDetails.challenges.intro}</p>
                            <CaseStudyPhoto image={artwork.bicycleFinalApproachDetails.challenges.image} className="mt-5" />
                            <p className="mt-5">{artwork.bicycleFinalApproachDetails.challenges.closingText}</p>
                          </section>
                        </div>
                      ) : artwork.torqueSensorFinalApproachDetails ? (
                        <div className="mt-4 space-y-10">
                          <p>{artwork.finalApproach}</p>
                          <CaseStudyPhoto image={artwork.torqueSensorFinalApproachDetails.assemblyImage} />
                          {artwork.torqueSensorFinalApproachDetails.topics.map((topic, index) => (
                            <section key={topic.title}>
                              <h3 className="font-display text-xl font-medium text-foreground lg:text-2xl">
                                {topic.title}
                              </h3>
                              <p className="mt-4">{topic.text}</p>
                              {index === 1 && "image" in topic && "closingText" in topic && (
                                <>
                                  <CaseStudyPhoto image={topic.image} className="mt-5" />
                                  <p className="mt-5">{topic.closingText}</p>
                                </>
                              )}
                            </section>
                          ))}
                        </div>
                      ) : artwork.finalApproachDetails ? (
                        <div className="mt-4 space-y-10">
                          <div>
                            <h3 className="font-display text-xl font-medium tracking-tight text-foreground lg:text-2xl mb-4">
                              How it works
                            </h3>
                            <div className="space-y-6">
                              {artwork.finalApproachDetails.howItWorks.map((block, index) => (
                                block.type === "text" ? (
                                  <p key={index} className="text-foreground/80">
                                    {block.content}
                                  </p>
                                ) : (
                                  <div
                                    key={index}
                                    className="mx-auto max-w-full overflow-hidden rounded-xl"
                                    style={{ width: `${block.displayWidthPercent}%` }}
                                  >
                                    <ImageReveal
                                      src={block.src}
                                      alt={block.alt}
                                      className="w-full object-cover"
                                      style={{ aspectRatio: `${block.width} / ${block.height}` }}
                                    />
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-display text-xl font-medium tracking-tight text-foreground lg:text-2xl mb-4">
                              Challenges
                            </h3>
                            <p className="text-foreground/80">
                              {artwork.finalApproachDetails.challenges}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-lg bg-background p-0">
                          <p className="text-foreground/80">{artwork.finalApproach}</p>
                        </div>
                      )
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
