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
    supportCaption: "..Normal vectors visualized using 7x7 pixel subregions",
    summary: "A personal exploration into low-cost depth sensing. This project built a 3D camera distance sensor capable of measuring real-world object positions using stereo vision and custom calibration.",
    problem: "How do you measure an object's height above a flat surface while in motion?",
    requirements: [
      "Used over outdoor surfaces: Sidewalks, roads, etc",
      "All electronics must be mounted on the object",
      "Frequently speeds up, slows down, and rotates",
      "Can record measurements at least 30 times each second",
      "Height accurate to within 5 millimeters",
      "Smaller than a hard drive",
      "Costs under $500"
    ],
    research: [
      {
        title: "Inertial measuring unit (IMU)",
        text: "Measures acceleration, angular velocity, and heading to determine positional information",
        subPoints: [
          "Key advantage: Cheap",
          "Main concern: Measurements drift over time",
        ],
      },
      {
        title: "Simultaneous localization and mapping (SLAM)",
        text: "Uses 3D camera to map the environment improving IMU measurements",
        subPoints: [
          "Key advantage: Reduced measurement drift",
          "Main concern: Measurement drift still occurs",
        ],
      },
      {
        title: "Real time kinematic GPS",
        text: "A fixed base station uses its known position to calculate satellite measurement errors and transmits corrections to the mounted GPS to achieve the required positioning accuracy.",
        subPoints: [
          "Key advantage: No measurement drift",
          "Main concern: Cost",
        ],
      },
      {
        title: "Distance sensor",
        text: "Measures distances from three points to the ground to define a plane. Height is determined by projecting the sensor-to-plane vector onto the plane’s normal vector",
        subPoints: [
          "Key advantage: No measurement drift",
          "Main concern: Robustness",
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
    problem: "How to make a bicycle wheel move twice as much as the handlebars and in the opposite direction?",
    requirements: [
      "Steering gain of 1 and 2",
      "Reverse steering mode",
      "Every combination of steering mode must be configurable and quick to toggle",
      "Robust to damage",
      "Prioritize straight line driving",
      "Cost not to exceed $500"
    ],
    research: [
      {
        title: "Planetary gearbox - Gain  (Learn more)",
        text: "Replace the ring gear with a chain to allow translating the planet gear and changing the amount it rotates",
        subPoints: [
          "Key advantage: Continuous gain adjustments",
          "Main concern: System complexity",
        ],
      },
      {
        title: "Expanding pulley - Gain",
        text: "A series of cams expands or contracts the pulley segments, changing the pulley ratio",
        subPoints: [
          "Key advantage: Continuous gain adjustments",
          "Main concern: Manufacturing complexity",
        ],
      },
      {
        title: "Variable speed belt drive - Gain",
        text: "Two cone-shaped pulleys oriented in opposite directions connected with a belt. Shifting the belt’s position along the pulleys changes the pulley ratio",
        subPoints: [
          "Key advantage: Continuous gain adjustments",
          "Main concern: Gain setting repeatability",
        ],
      },
      {
        title: "Hydraulic - Reversing",
        text: "Use a series of solenoid valves with hydraulic actuators to reverse flow direction. Connect actuators to pinions",
        subPoints: [
          "Key advantage: Instantaneous adjustment",
          "Main concern: Cost",
        ],
      },
      {
        title: "Idler gears - Reversing",
        text: "Add the ability to toggle an additional idler gear into the gear train to reverse the output rotation",
        subPoints: [
          "Key advantage: Simplicity",
          "Main concern: Consistent gear meshing when toggling",
        ],
      },
      {
        title: "Steer-by-wire",
        text: "Use a motor to steer the wheel based on the handlebar input measured by a rotary encoder",
        subPoints: [
          "Key advantage: Combines gain and reversing subsystems",
          "Main concern: Excessive position error",
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
    problem: "How can torque measurements collected using a sensor be graphed and analyzed?",
    requirements: [
      "±3% Accuracy",
      "Measuring range from 0-200Nm",
      "Material costs under $100",
    ],
    research: [
      {
        title: "Rotary load cell",
        text: "Purchase a ready made load cell cable of computer communication",
        subPoints: [
          "Key advantage: Requires no modifications",
          "Main concern: Cost",
        ],
      },
      {
        title: "Custom load cell",
        text: "Create and calibrate a load cell myself utilizing a wheatstone bridge",
        subPoints: [
          "Key advantage: Inexpensive",
          "Main concern: Calibration accuracy",
        ],
      },
      {
        title: "Torque Adapter",
        text: "Purchase a torque adapter with LCD screen and record measurements manually",
        subPoints: [
          "Key advantage: Requires no modifications",
          "Main concern: Time consuming to use",
        ],
      },
      {
        title: "Torque Adapter",
        text: "Decode the LCD screen on a torque adapter with a microcontroller",
        subPoints: [
          "Key advantage: Inexpensive",
          "Main concern: Limited resources on the subject",
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
    problem: "How to match the timers on two microcontrollers wirelessly?",
    requirements: [
      "Synchronization accuracy of 1 microsecond",
      "Automatic synchronization on power up",
      "Correction events every 1 minute",
    ],
    research: [
      {
        title: "Reference Broadcast Synchronization (RBS)",
        text: "Uses an additional transmitter with two receivers to eliminate send time variability. The transmitter emits a signal that both receivers timestamp and then exchange to determine one another’s offset",
        subPoints: [
          "Eliminates sender-side uncertainty by using a shared reference broadcast",
          "Requires two receivers to exchange timestamps after the broadcast",
        ],
      },
      {
        title: "Timing-sync Protocol for Sensor Networks (TPSN)",
        text: "Minimizes both send and receive time variability by timestamping packets as close as possible to the actual transmission and reception events. Designed for synchronizing a large network of microcontrollers",
        subPoints: [
          "Timestamping happens at the radio hardware level to remove software latency",
          "Suitable for synchronizing many nodes in a sensor network",
        ],
      },
      {
        title: "Flooding Time Synchronization Protocol (FTSP)",
        text: "Similar to TPSN with advancements made to make large-scale synchronization more reliable.",
        subPoints: [
          "Builds on TPSN but adds robustness for larger networks",
          "Uses multiple reference beacons to tolerate node failures",
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
