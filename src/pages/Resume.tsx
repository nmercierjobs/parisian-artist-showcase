import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const education = [
  {
    degree: "MFA in Painting",
    school: "École des Beaux-Arts, Paris",
    year: "2012 – 2014",
  },
  {
    degree: "BFA in Fine Arts",
    school: "École Supérieure d'Art et Design, Lyon",
    year: "2008 – 2012",
  },
];

const exhibitions = [
  { title: "Solo — Lumières du Matin", venue: "Galerie Perrotin, Paris", year: "2024" },
  { title: "Group — Visions Contemporaines", venue: "Fondation Louis Vuitton, Paris", year: "2023" },
  { title: "Solo — Portraits de la Vie", venue: "Thaddaeus Ropac, Paris", year: "2022" },
  { title: "Group — French Perspectives", venue: "Christie's Paris", year: "2021" },
  { title: "Solo — Couleurs du Sud", venue: "Galerie Templon, Paris", year: "2020" },
];

const awards = [
  { title: "Prix des Jeunes Créateurs", organization: "Ministère de la Culture", year: "2019" },
  { title: "Residency Fellowship", organization: "Cité Internationale des Arts, Paris", year: "2017" },
  { title: "Emerging Artist Grant", organization: "Centre National des Arts Plastiques", year: "2015" },
];

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>Resume — Émile Laurent</title>
        <meta
          name="description"
          content="View the resume of Émile Laurent, including education, exhibitions, awards, and collections."
        />
      </Helmet>

      <Layout>
        <div className="page-transition px-6 py-10 lg:px-10 lg:py-12">
          <div 
            className="mx-auto max-w-3xl"
            style={{
              opacity: 0,
              animation: "staggerFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              animationDelay: "0ms"
            }}
          >
            <header className="mb-10">
              <h1 className="font-display text-3xl font-medium tracking-tight text-foreground lg:text-4xl">
                Resume
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                Education, exhibitions, and selected honors
              </p>
            </header>

            {/* Education */}
            <section className="mb-12">
              <h2 className="mb-6 font-display text-lg font-medium tracking-tight text-foreground">
                Education
              </h2>
              <div className="space-y-5">
                {education.map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col justify-between gap-1 border-b border-border/60 pb-5 sm:flex-row sm:items-center"
                    style={{
                      opacity: 0,
                      animation: "staggerFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      animationDelay: `${100 + index * 80}ms`
                    }}
                  >
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.degree}</h3>
                      <p className="text-sm text-muted-foreground">{item.school}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Exhibitions */}
            <section className="mb-12">
              <h2 className="mb-6 font-display text-lg font-medium tracking-tight text-foreground">
                Exhibitions
              </h2>
              <div className="space-y-5">
                {exhibitions.map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col justify-between gap-1 border-b border-border/60 pb-5 sm:flex-row sm:items-center"
                    style={{
                      opacity: 0,
                      animation: "staggerFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      animationDelay: `${300 + index * 80}ms`
                    }}
                  >
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.venue}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards */}
            <section>
              <h2 className="mb-6 font-display text-lg font-medium tracking-tight text-foreground">
                Awards & Residencies
              </h2>
              <div className="space-y-5">
                {awards.map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col justify-between gap-1 border-b border-border/60 pb-5 sm:flex-row sm:items-center"
                    style={{
                      opacity: 0,
                      animation: "staggerFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      animationDelay: `${500 + index * 80}ms`
                    }}
                  >
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.organization}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Resume;
