import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ImageReveal from "@/components/ImageReveal";
import mechanismPlaceholder from "/images/reverse_bike/sprocket_and_chain_diagram.png";
import proofPlaceholder from "/images/reverse_bike/sprocket_and_chain_proof.png";
import equation1 from "/images/reverse_bike/eqn1.png";
import equation2 from "/images/reverse_bike/eqn2.png";
import equation3 from "/images/reverse_bike/eqn3.png";

// Width of each diagram as a percentage of the article column.
// Adjust these values to scale the two diagrams independently.
const DIAGRAM_WIDTH_PERCENT = {
  mechanism: 80,
  proof: 90,
};

// Width of each equation image as a percentage of the article column.
// Adjust these values to scale each equation independently.
const EQUATION_WIDTH_PERCENT = {
  netRotation: 35,
  arcLengths: 50,
  gain: 45,
};

const ProofImage = ({
  src,
  width,
  height,
  alt,
  widthPercent,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  widthPercent: number;
}) => (
  <figure className="mx-auto mt-8" style={{ width: `${widthPercent}%` }}>
    <div className="overflow-hidden rounded-xl">
      <ImageReveal
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </div>
    <figcaption className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{alt}</figcaption>
  </figure>
);

const EquationImage = ({ src, alt, widthPercent }: { src: string; alt: string; widthPercent: number }) => (
  <figure className="my-8 text-center">
    <div className="flex justify-center overflow-x-auto">
      <img
        src={src}
        alt={alt}
        style={{ width: `${widthPercent}%` }}
        className="h-auto rounded-lg"
      />
    </div>
    <figcaption className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{alt}</figcaption>
  </figure>
);

const SprocketChainProof = () => {
  return (
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

            <h1 className="mt-8 font-display text-2xl font-medium tracking-tight text-foreground lg:text-3xl">
              Sprocket and Chain Approach to Gain
            </h1>

            <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground lg:text-lg lg:leading-loose">
              <section>
                <p>
                  My mechanical approach to continuously variable steering gain is to translate a steering arc into a rotation. At stage 1, sprocket A is fixed in place on the head tube to cause the planet sprocket to rotate when the handlebars are turned. This rotation is then moved to the sun sprocket on the head tube where it can be used to drive the wheel. Varying the distance x to the planet will increase the arc length it rotates through, altering the output rotation. For simplicity, the diagram below does not include the chain tensioner needed to vary the distance.
                </p>
                <ProofImage
                  src={mechanismPlaceholder}
                  width={745}
                  height={821}
                  alt="Mechanical approach to continuously variable bicycle steering gain"
                  widthPercent={DIAGRAM_WIDTH_PERCENT.mechanism}
                />
              </section>

              <section className="pt-8">
                <h2 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Proof</h2>
                <p className="mt-4">
                  The following is a proof of the sprocket dimensions to create the desired gear ratio of 1 to 2. Stage 1 has been simplified as the planet rotating about an internal gear. The chain connecting the planet and sun has also been omitted.
                </p>
                <ProofImage
                  src={proofPlaceholder}
                  width={1607}
                  height={1599}
                  alt="Superposition of rotations created by steering and rolling of the planet sprocket"
                  widthPercent={DIAGRAM_WIDTH_PERCENT.proof}
                />

                <p className="mt-8">
                  Consider the clockwise rotation of the arm through angle α, which effectively rotates the planet through angle α as well. This creates the clockwise rotation δ of the sun. Similarly, the planet rolls along arc length a and creates the counterclockwise rotation β on the planet and ω on the sun.
                </p>
              </section>

              <section className="pt-8">
                <h2 className="font-display text-2xl font-medium text-foreground lg:text-3xl">Derivation</h2>
                <p className="mt-4">
                  The desired quantity is the ratio of the <em>net</em> rotation of the sun compared to the rotation of the arm. The fundamental property linking the rotations is the equivalence of the arc lengths. The following relationship expresses the net rotation of the sun in terms of the two arc lengths.
                </p>
                <EquationImage src={equation1} alt="" widthPercent={EQUATION_WIDTH_PERCENT.netRotation} />
                <p>The arc length a is defined by the radius of the internal sprocket and the angle of the arm. Arc length b is the result of the effective rotation of the planet by the arm.</p>
                <EquationImage src={equation2} alt="" widthPercent={EQUATION_WIDTH_PERCENT.arcLengths} />
                <p>Combining these relationships and simplifying gives the following conclusion. The negative sign indicates that the output is in the opposite direction of the arm.</p>
                <EquationImage src={equation3} alt="" widthPercent={EQUATION_WIDTH_PERCENT.gain} />
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
};

export default SprocketChainProof;
