import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import ImageReveal from "@/components/ImageReveal";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

// Adjust the portrait photo size here (percentage of its column width)
const PORTRAIT_WIDTH_PERCENT = 75;

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
        <title>About — Noah Mercier</title>
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
                width: `${PORTRAIT_WIDTH_PERCENT}%`,
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
              className="flex flex-col justify-start w-[750px]"
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
                  Jack of All Trades Engineer
                </p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px w-full bg-border" />

              {/* Bio Text */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground font-[Arial] text-[14px]">
                <p>
                  Growing up, I have always built things with varying degrees of success. My early failures were caused by a lack of understanding of the underlying theory, so I chose to become an engineer to gain the ability to turn my ideas into successful creations. In that same spirit, I am drawn to the core engineering disciplines (mechanical, electrical, and software) so that I can recognize and execute the most effective approach to bringing my inventions to life.
                </p>
                <p>
                  I love finding the best solution to a difficult problem. To me, that means copious research, hand calculations, and prototyping. I use all the resources at my disposal — textbooks, scientific articles, online courses, forums, datasheets, regulatory documentation, and whitepapers — to understand the problem and the approaches commonly used to solve it. I then dissect those approaches to understand why they are favored for their respective use cases, gauge their applicability to my problem, and determine what, if any, modifications may be necessary. Understanding math is fundamental to this process as it allows me to better understand my research, assess feasibility, and validate results. But, no amount of research or calculations can substitute for prototyping’s ability to reveal complications. Where this approach really shines is when complications inevitably arise. I have the knowledge to quickly diagnose the issue, the analytical skills to develop a solution, and the hands-on experience to bring it to life.
                </p>
                <p>
                  Stuff costs money, and I wanted the financial freedom and free time to really delve into my personal projects to expand my skillset beyond my mechanical engineering degree. This led me to pursue the ever-elusive notion of easy money. I began by reselling consumer products on eBay that I sourced from garage sales, expanded to flea markets, and have now switched gears to purchasing second-hand recalled consumer products and submitting them to retailers for a refund or replacement. I am currently achieving an hourly wage exceeding $100/hr albeit with limited annual earnings. I met my goal from the start but the challenge to keep improving is exciting.
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
