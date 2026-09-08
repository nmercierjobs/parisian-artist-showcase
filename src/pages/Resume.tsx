import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const projects = [
  {
    title: "3D Camera Distance Sensor",
    meta: "2025 · C · RPi5",
    details: [
      "Achieved distance measurements to a semi-planar surface with an angle of incidence up to 40° at 90 Hz with millimeter accuracy.",
      "Programmed normal vector calculation from scratch by computing the least-variance eigenvector of the covariance matrix using its singular value decomposition (SVD).",
      "Robustified estimation by subdividing the point cloud into NxN regions and selecting the final plane as the largest set of coplanar subregions pointed in the same direction; tolerates up to 60% contamination.",
      "Implemented the Theil–Sen estimator for 2D kinematics applications, providing redundancy and increasing contamination tolerance.",
    ],
  },
  {
    title: "Steer-by-wire Bicycle",
    meta: "2026 · C · Arduino",
    details: [
      "Engineered a closed-loop stepper motor steering system with PID control, enabling configurable steering gains up to 2x and reverse steering modes.",
      "Specified the motor with inertia calculations to meet size, velocity, and acceleration requirements.",
      "Designed and fabricated a modular design with GD&T optimized to improve serviceability and facilitate smooth assembly.",
      "Developed and evaluated LOESS and Savitzky–Golay digital low-pass filters, vastly improving rotary encoder velocity and acceleration estimates.",
    ],
  },
  {
    title: "USB Torque Sensor",
    meta: "2025 · C · STM32",
    details: [
      "Reverse engineered a digital torque adapter by decoding the LCD segments, enabling cost-effective USB data logging at 60 Hz.",
      "Leveraged the LCD driver datasheet to maximize the sampling rate to equal the display's refresh rate.",
    ],
  },
  {
    title: "Wireless MCU Timer Synchronization",
    meta: "2025 · C · nRF52",
    details: [
      "Eliminated non-deterministic delays using programmable hardware interconnects, achieving an accuracy of 250 ns and exceeding the 1 μs requirement.",
      "Measured and corrected relative clock drift rate with linear regression, extending correction events from milliseconds to tens of minutes.",
    ],
  },
];

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>Resume — Noah Mercier</title>
        <meta
          name="description"
          content="Noah Mercier's mechanical engineering resume, employment, technical projects, and skills."
        />
      </Helmet>

      <Layout>
        <main className="page-transition px-6 py-10 lg:px-10 lg:py-12">
          <article className="mx-auto max-w-4xl">
            <header className="mb-10 border-b border-foreground/70 pb-6 sm:flex sm:items-end sm:justify-between">
              <h1 className="font-display text-4xl font-semibold uppercase text-foreground lg:text-5xl">
                Noah Mercier
              </h1>
              <address className="mt-4 not-italic text-sm leading-6 text-muted-foreground sm:mt-0 sm:text-right">
                <a className="block transition-colors hover:text-foreground" href="tel:+19252865209">
                  (925) 286-5209
                </a>
                <a className="block transition-colors hover:text-foreground" href="mailto:nmercierjobs@gmail.com">
                  nmercierjobs@gmail.com
                </a>
              </address>
            </header>

            <section className="mb-10">
              <h2 className="mb-4 border-b border-foreground/60 pb-2 font-display text-sm font-semibold uppercase text-foreground">
                Education
              </h2>
              <div className="grid gap-1 text-sm font-semibold sm:grid-cols-[1fr_2fr]">
                <p>Davis, CA</p>
                <p>University of California</p>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/90">
                <li>B.S.E. in Mechanical Engineering, June 2026. In-Major GPA: 3.8.</li>
                <li>Led a team of six students on a joint senior design project through effective scheduling, frequent status updates, and clearly established responsibilities.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 border-b border-foreground/60 pb-2 font-display text-sm font-semibold uppercase text-foreground">
                Employment
              </h2>
              <div className="grid gap-1 text-sm font-semibold sm:grid-cols-3">
                <h3>Recall Reseller</h3>
                <p>Self-Employed</p>
                <p className="sm:text-right">2022 – Present</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">
                Procurement of second-hand recalled consumer products and submission to retailers for refund or replacement.
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/90">
                <li>Automated product sourcing with web scraping, increasing second-year earnings by 212%.</li>
                <li>Improved sourcing further using a custom optical character recognition (OCR) search program, increasing third-year earnings by an additional 63%.</li>
                <li>Optimized profit margins using profit-per-hour calculations to reduce workload by 357%.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 border-b border-foreground/60 pb-2 font-display text-sm font-semibold uppercase text-foreground">
                Technical Experience
              </h2>
              <h3 className="mb-4 text-sm font-semibold">Projects</h3>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.title}>
                    <h4 className="text-sm font-semibold text-foreground">
                      {project.title} <span className="font-normal text-muted-foreground">({project.meta})</span>
                    </h4>
                    <ul className="mt-2 list-[circle] space-y-2 pl-7 text-sm leading-6 text-foreground/90">
                      {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-b border-foreground/60 pb-2 font-display text-sm font-semibold uppercase text-foreground">
                Languages and Technologies
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/90">
                <li>C, Python, MATLAB, R, SQL; BLAS, LAPACK</li>
                <li>Nordic nRF, STM32, Arduino, Raspberry Pi</li>
                <li>SolidWorks, Autodesk Fusion, Linux, Zephyr, Excel</li>
              </ul>
            </section>
          </article>
        </main>
      </Layout>
    </>
  );
};

export default Resume;
