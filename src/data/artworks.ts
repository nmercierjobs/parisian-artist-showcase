import support3dCamera from "/images/normals_4_3.png";
import supportSteerBike from "/images/bike_cad_4_3.png";
import supportTorqueSensor from "@/assets/support-torque-sensor.jpg";
import supportWirelessSync from "@/assets/support-wireless-sync.jpg";

export interface Approach {
  title: string;
  text: string;
  subPoints: [string, string];
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  image: string;
  detailImage: string;
  supportImage: string;
  supportCaption: string;
  summary: string;
  problem: string;
  requirements: string[];
  research: Approach[];
  finalApproach: string;
  problems: string;
  results: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "3D Camera Distance Sensor",
    slug: "3d-camera-distance-sensor",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    detailImage: `${import.meta.env.BASE_URL}artworks/chromatic-tension.jpg`,
    supportImage: support3dCamera,
    supportCaption: "Stereo camera rig and checkerboard calibration target used during depth testing.",
    summary: "A personal exploration into low-cost depth sensing. This project built a 3D camera distance sensor capable of measuring real-world object positions using stereo vision and custom calibration.",
    problem: "Off-the-shelf depth cameras were either too expensive, too bulky, or lacked the precision needed for small-scale robotics projects. I needed a compact, affordable alternative.",
    requirements: [
      "Sub-centimeter accuracy at close range",
      "Real-time frame output",
      "Compatibility with a standard microcontroller",
      "Reliable performance under indoor lighting",
    ],
    research: [
      {
        title: "Structured light",
        text: "Projects a known pattern onto the scene and infers depth from how the pattern deforms on surfaces.",
        subPoints: [
          "High accuracy in controlled indoor environments.",
          "Struggles with ambient infrared and reflective or textured surfaces.",
        ],
      },
      {
        title: "Time-of-flight LiDAR",
        text: "Measures the round-trip time of emitted light pulses to build a dense depth map.",
        subPoints: [
          "Fast update rates and long range out of the box.",
          "Expensive sensors and prone to multipath errors indoors.",
        ],
      },
      {
        title: "Passive stereo vision",
        text: "Uses two calibrated cameras and triangulation to recover depth from disparity.",
        subPoints: [
          "Low cost and works with standard camera hardware.",
          "Requires good scene texture and careful baseline calibration.",
        ],
      },
    ],
    finalApproach: "A dual-camera rig with synchronized shutters, checkerboard calibration, and a disparity-to-depth pipeline computed on a host PC. I wrote the calibration routine in Python and optimized matching with OpenCV.",
    problems: "Ambient light caused inconsistent feature matching, and the cameras had to be kept perfectly aligned or the calibration drifted. I added IR-filtered lenses and a printed mounting bracket to stabilize the baseline.",
    results: "The sensor achieved reliable measurements within 5 mm at distances up to 1.5 m, running at 15 frames per second. The final setup cost under $80 in parts.",
  },
  {
    id: "2",
    title: "Steer-by-wire Bicycle",
    slug: "steer-by-wire-bicycle",
    image: "/images/reverse_black.gif",
    detailImage: `${import.meta.env.BASE_URL}artworks/equilibre-instable.jpg`,
    supportImage: supportSteerBike,
    supportCaption: "Handlebar torque sensor and fork actuator mounted on the test frame.",
    summary: "An experimental bicycle that replaces the mechanical steering linkage with an electronic steer-by-wire system, exploring how software can change bicycle handling dynamics.",
    problem: "Traditional bicycle steering is fixed mechanically. I wanted to test how programmable steering response could affect stability, lane keeping, and rider feel.",
    requirements: [
      "Safe fallback to manual control",
      "Low-latency sensor feedback",
      "Adjustable steering maps",
      "Rugged prototype that could survive repeated outdoor testing",
    ],
    research: [
      {
        title: "Mechanical linkage modifications",
        text: "Change head angle, fork trail, or handlebar geometry to alter handling characteristics.",
        subPoints: [
          "Simple to implement and easy to reverse.",
          "Cannot vary steering feel in real time or under different riding conditions.",
        ],
      },
      {
        title: "Torque-based steering actuation",
        text: "Apply motor torque to the fork based on rider input, speed, and lean angle.",
        subPoints: [
          "Enables fully programmable steering response maps.",
          "Adds latency and demands a robust fail-safe design.",
        ],
      },
      {
        title: "Academic steer-by-wire prototypes",
        text: "Reviewed prior art for control strategies, safety redundancy, and rider-interface findings.",
        subPoints: [
          "Provided proven starting points for control laws.",
          "Often too complex or expensive to replicate directly as a personal project.",
        ],
      },
    ],
    finalApproach: "A handlebar-mounted torque sensor measured rider intent, a brushless motor drove the fork, and a microcontroller applied programmable torque assist or damping based on speed and lean angle.",
    problems: "Latency between rider input and wheel response made the bike feel unnatural at low speeds. I tuned the control loop with a derivative term and added a mechanical fail-safe clutch.",
    results: "The prototype demonstrated stable low-speed balancing with adjustable steering weight. It became a platform for testing control algorithms and rider-interface concepts.",
  },
  {
    id: "3",
    title: "USB Torque Sensor",
    slug: "usb-torque-sensor",
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=800&q=80",
    detailImage: `${import.meta.env.BASE_URL}artworks/fragments-of-silence.jpg`,
    supportImage: supportTorqueSensor,
    supportCaption: "Strain-gauge shaft and 3D-printed enclosure with USB-C interface.",
    summary: "A compact USB torque sensor for measuring rotational loads directly from a laptop. It combines a strain-gauge transducer with an integrated USB data acquisition interface.",
    problem: "Lab-grade torque sensors required bulky instrumentation amplifiers and separate DAQ hardware. I wanted a single device that plugged in and streamed calibrated torque over USB.",
    requirements: [
      "±5 Nm range",
      "1 kHz sampling",
      "USB-C connectivity",
      "Plug-and-play HID or serial interface",
      "Fully enclosed 3D-printed housing",
    ],
    research: [
      {
        title: "Foil strain gauges",
        text: "Bond metal-foil gauges to a shaft and wire them in a Wheatstone bridge to sense torsion.",
        subPoints: [
          "Mature, accurate, and inexpensive transducer technology.",
          "Requires careful temperature compensation and strain-relief cabling.",
        ],
      },
      {
        title: "MEMS torque cells",
        text: "Use compact silicon-based transducers with integrated signal conditioning.",
        subPoints: [
          "Easy integration and low power consumption.",
          "Lower accuracy and limited overload tolerance compared to foil gauges.",
        ],
      },
      {
        title: "Capacitive sensing",
        text: "Measure shaft deflection through changes in capacitance between patterned plates.",
        subPoints: [
          "High sensitivity and inherently low drift.",
          "Requires precise mechanical tolerances and is sensitive to electrical noise.",
        ],
      },
    ],
    finalApproach: "A custom shaft with four strain gauges wired in a full Wheatstone bridge, a 24-bit ADC, and an ARM-based USB interface that streamed calibrated torque values to a Python logger.",
    problems: "Temperature drift and electrical noise from the motor under test corrupted readings. I added temperature compensation and shielded cables, then oversampled and filtered in firmware.",
    results: "The sensor resolved torque to 0.01 Nm with stable USB streaming. The final device fit in the palm of a hand and was used in multiple motor characterization tests.",
  },
  {
    id: "4",
    title: "Wireless MCU Timer Synchronization",
    slug: "wireless-mcu-timer-synchronization",
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&q=80",
    detailImage: `${import.meta.env.BASE_URL}artworks/paris-layers.jpg`,
    supportImage: supportWirelessSync,
    supportCaption: "Five synchronized sensor nodes arranged for the timing test.",
    summary: "A protocol and firmware stack for synchronizing timers across multiple microcontrollers over a wireless link, enabling distributed sensing and actuation with sub-millisecond alignment.",
    problem: "Multiple battery-powered nodes had to act in unison, but each ran from its own crystal oscillator. Clock drift made coordinated actions impossible without a shared time base.",
    requirements: [
      "Sub-millisecond synchronization across at least five nodes",
      "Low power consumption",
      "Tolerance to packet loss",
      "No wired connection between devices",
    ],
    research: [
      {
        title: "Wired clock distribution",
        text: "Distribute a shared oscillator or pulse-per-second signal over physical cables.",
        subPoints: [
          "Simplest implementation and highest precision.",
          "Violates the constraint of no wired connection between nodes.",
        ],
      },
      {
        title: "Existing radio time-sync protocols",
        text: "Adopt standards such as PTP or custom beacon schemes over packet radio.",
        subPoints: [
          "Well documented and often scalable to many nodes.",
          "Most are designed for higher-power radios than coin-cell sensor nodes.",
        ],
      },
      {
        title: "Clock skew estimation methods",
        text: "Estimate and correct each node's clock drift using received reference timestamps.",
        subPoints: [
          "Fits low-power, intermittent beaconing schedules.",
          "Requires outlier rejection to handle packet jitter and missed beacons.",
        ],
      },
    ],
    finalApproach: "A beacon node broadcasted reference timestamps over a 2.4 GHz link. Slave nodes recorded local timer values on receipt and applied a linear regression to estimate and correct clock skew.",
    problems: "Packet jitter and missed beacons introduced spikes in the skew estimate. I implemented outlier rejection and a Kalman-style filter to smooth the clock correction.",
    results: "Five nodes maintained synchronization within 0.5 ms over a 20-minute test. The system ran on coin-cell power and recovered quickly from temporary wireless dropouts.",
  },
];

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.slug === slug);
};
