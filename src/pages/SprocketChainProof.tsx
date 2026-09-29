import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ImageReveal from "@/components/ImageReveal";
import mechanismPlaceholder from "@/assets/sprocket-proof-placeholder-1.png";
import proofPlaceholder from "@/assets/sprocket-proof-placeholder-2.png";

const ProofImage = ({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) => (
  <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-xl">
    <ImageReveal src={src} alt={alt} className="h-full w-full object-cover" style={{ aspectRatio: `${width} / ${height}` }} />
  </div>
);

const Equation = ({ children }: { children: React.ReactNode }) => (
  <p className="my-8 overflow-x-auto text-center font-serif text-xl text-foreground sm:text-2xl" aria-label={`Equation: ${String(children)}`}>
    {children}
  </p>
);

const SprocketChainProof = () => (
  <>
    <Helmet>
      <title>Sprocket and Chain Proof — Noah Mercier</title>
      <meta name="description" content="A mechanical proof for a continuously variable bicycle steering gain using sprockets and chains." />
    </Helmet>
    <Layout>
      <main className="page-transition min-h-screen px-6 py-16 lg:px-10 lg:py-24">
        <article className="mx-auto max-w-5xl border-x-2 border-border px-6 py-10 font-[Arial] lg:px-10 lg:py-16">
          <Link
            to="/projects/steer-by-wire-bicycle"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Steer-by-wire Bicycle
          </Link>

          <header className="mt-10 border-b border-border pb-10">
            <p className="text-sm font-medium uppercase text-muted-foreground">Mechanical concept</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-foreground lg:text-5xl">Sprocket and Chain Proof</h1>
          </header>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground lg:text-lg lg:leading-loose">
            <section>
              <p>
                My mechanical approach to continuously variable steering gain is to translate a steering arc into a rotation. At stage 1, sprocket A is fixed in place on the headtube to cause the planet sprocket to rotate when the handlebars are turned. This rotation is then moved to the sun sprocket on the headtube where it can be used to drive the wheel. Varying the distance x to the planet will increase the arc length it rotates through, altering the output rotation. For simplicity, the diagram below does not include the chain tensioner needed to vary the distance.
              </p>
              <ProofImage src={mechanismPlaceholder} width={745} height={821} alt="Placeholder for the sprocket and chain steering mechanism diagram" />
            </section>

            <section className="pt-8">
              <h2 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Dimension Proof</h2>
              <p className="mt-4">
                The following is a proof of the sprocket dimensions to create the desired gear ratio of 1 to 2. Stage 1 has been simplified as the planet rotating about an internal gear. The chain connecting the planet and sun has also been omitted.
              </p>
              <ProofImage src={proofPlaceholder} width={1607} height={1599} alt="Placeholder for the sprocket dimension proof diagram" />

              <div className="mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm sm:text-base">
                  <caption className="sr-only">Variables used in the sprocket dimension proof</caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="py-3 pr-6 font-semibold">Parameter</th>
                      <th scope="col" className="py-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {definitions.map(([symbol, description]) => (
                      <tr key={symbol} className="border-b border-border/70">
                        <th scope="row" className="py-3 pr-6 font-serif text-lg font-normal">{symbol}</th>
                        <td className="py-3">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-8">
                Consider the clockwise rotation of the arm through angle α, which effectively rotates the planet through angle α as well. This creates the clockwise rotation δ of the sun. Similarly, the planet rolls along arc length a and creates the counterclockwise rotation β on the planet and ω on the sun.
              </p>
            </section>

            <section className="pt-8">
              <h2 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Derivation</h2>
              <p className="mt-4">
                The desired quantity is the ratio of the <em>net</em> rotation in the sun compared to the rotation of the arm. The fundamental property linking the rotations is the equivalence of the arc lengths. The following relationship expresses the net rotation of the sun in terms of the two arc lengths.
              </p>
              <Equation>(ω − δ)R = a − b</Equation>
              <p>The arc length a is defined by the radius of the internal sprocket and the angle of the arm. Arc length b is the result of the effective rotation of the planet by the arm.</p>
              <Equation>a = α(x + r)　　b = αr</Equation>
              <p>Combining these relationships and simplifying gives the following conclusion, where the negative sign indicates that the output is in the opposite direction of the arm.</p>
              <Equation>Gain = (ω − δ) / α = −x / R</Equation>
              <p>
                Interestingly, a gain of 1 is not possible. To fix this, a gear reduction after the sun gear would be needed. Another concern is whether the mechanism is too long. Using #25 chains, a 10-tooth planet sprocket, and a 25-tooth sun sprocket, the total length would be approximately 3.5 inches. Very reasonable.
              </p>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  </>
);

export default SprocketChainProof;