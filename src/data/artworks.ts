import support3dCamera from "/images/normals_4_3.png";
import supportSteerBike from "/images/bike_cad_4_3.png";
import supportTorqueSensor from "@/assets/support-torque-sensor.jpg";
import supportWirelessSync from "@/assets/support-wireless-sync.jpg";

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
  research: string;
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
    research: "I evaluated structured light, time-of-flight LiDAR, and passive stereo vision. Stereo vision emerged as the best balance of cost, accuracy, and complexity for my constraints.",
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
    research: "I studied bicycle self-stability, torque-based steering actuation, and existing academic steer-by-wire prototypes. Safety redundancy was the biggest open question.",
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
    research: "I compared foil strain gauges, MEMS torque cells, and capacitive sensing. Strain gauges offered the best accuracy and were easy to integrate with a Wheatstone bridge.",
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
    research: "I surveyed existing radio time-sync protocols, clock skew estimation methods, and low-power wireless stacks. Precision timing with low duty cycle was the central trade-off.",
    finalApproach: "A beacon node broadcasted reference timestamps over a 2.4 GHz link. Slave nodes recorded local timer values on receipt and applied a linear regression to estimate and correct clock skew.",
    problems: "Packet jitter and missed beacons introduced spikes in the skew estimate. I implemented outlier rejection and a Kalman-style filter to smooth the clock correction.",
    results: "Five nodes maintained synchronization within 0.5 ms over a 20-minute test. The system ran on coin-cell power and recovered quickly from temporary wireless dropouts.",
  },
];

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.slug === slug);
};
