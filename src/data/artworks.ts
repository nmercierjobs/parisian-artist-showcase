import support3dCamera from "/images/normals_4_3.png";
import supportSteerBike from "/images/bike_cad_4_3.png";
import wirelessHowItWorks1 from "/images/tx_final.png";
import wirelessHowItWorks2 from "/images/mcu_sync_simplified.png";
import bicycleMechanicalOverview from "/images/bike_cad_components.png";
import bicycleElectricalSystem from "/images/UI.png";
import bicycleSoftwareControlLoop from "/images/sg_gif.gif";
import bicycleSoftwareTuning from "/images/least_squares_matrix.png";
import bicycleSoftwareValidation from "/images/combined_graphs_no_header.png";
import bicycleSoftwareIntegration from "/images/program_flowchart.png";
import bicycleChallenges from "/images/shaft_angle_error.png";
import usbTorqueSensorAssembly from "/images/decoded_stylized.png";
import usbTorqueSensorValidation from "/images/COM0_waveform.png";

import supportTorqueSensor from "@/assets/support-torque-sensor.jpg";
import supportWirelessSync from "@/assets/support-wireless-sync.jpg";

export interface Approach {
  title: string;
  text: string;
  subPoints: [string, string];
}

export type FinalApproachBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; width: number; height: number; alt: string; displayWidthPercent: number };

export interface FinalApproachDetails {
  howItWorks: FinalApproachBlock[];
  challenges: string;
}

export interface CaseStudyImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  displayWidthPercent: number;
}

export interface BicycleDesignTopic {
  title: string;
  text: string;
  image?: CaseStudyImage;
  steps?: string[];
}

export interface BicycleFinalApproachDetails {
  summaryPoints: string[];
  mechanical: {
    intro: string;
    steps: string[];
    image: CaseStudyImage;
    topics: BicycleDesignTopic[];
  };
  electrical: {
    topics: BicycleDesignTopic[];
  };
  software: {
    intro: string;
    control: {
      title: string;
      textBeforeFirstImage: string;
      firstImage: CaseStudyImage;
      textBeforeSecondImage: string;
      secondImage: CaseStudyImage;
      textBeforeList: string;
      points: string[];
      textBeforeThirdImage: string;
      thirdImage: CaseStudyImage;
      closingText: string;
    };
    tuning: BicycleDesignTopic;
    integration: {
      title: string;
      intro: string;
      image: CaseStudyImage;
      closingText: string;
    };
  };
  challenges: {
    intro: string;
    image: CaseStudyImage;
    closingText: string;
  };
}

export interface TorqueSensorFinalApproachDetails {
  assemblyImage: CaseStudyImage;
  topics: [
    BicycleDesignTopic,
    BicycleDesignTopic & { image: CaseStudyImage; closingText: string },
    BicycleDesignTopic,
  ];
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  image: string;
  detailImage: string;
  detailImageWidthPercent: number;
  supportImage: string;
  supportImageWidthPercent: number;
  supportCaption: string;
  summary: string;
  problem: string;
  requirements: string[];
  research: Approach[];
  finalApproach: string;
  finalApproachDetails?: FinalApproachDetails;
  bicycleFinalApproachDetails?: BicycleFinalApproachDetails;
  torqueSensorFinalApproachDetails?: TorqueSensorFinalApproachDetails;
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
    detailImageWidthPercent: 100,
    supportImage: support3dCamera,
    supportImageWidthPercent: 50,
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
    detailImageWidthPercent: 100,
    supportImage: supportSteerBike,
    supportImageWidthPercent: 50,
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
    finalApproach: "Among the various motor types considered — stepper, servo, and brushless DC (BLDC) — a cursory cost analysis indicated that only a stepper motor was economically viable. To determine the required motor size, I reviewed research papers to establish the torque required to turn mountain bike handlebars. These studies reported a maximum steering torque of 2 N·m. I then used published values for maximum human hand speed and acceleration to estimate the corresponding maximum handlebar angular velocity and acceleration. Combined with the measured fork and wheel inertia, these values were used to calculate the torque required to achieve the desired steering performance. Additional research and calculations were also used to establish design requirements for latency and battery life.",
    bicycleFinalApproachDetails: {
      summaryPoints: [
        "Torque greater than or equal to 5 N·m",
        "Output angular velocity of at least 70rpm",
        "Under 20 millisecond input delay",
        "At least 1 hour battery life"
      ],
      mechanical: {
        intro: "My design philosophy is to maximize adaptability to help tackle the inevitable issues and changes. This was especially imperative to achieve the budget requirement. The following list outlines the major mechanical components and how they were designed with this principle in mind.",
        steps: [
          "Additional Head Tube: Attachment point kept as long as possible in case removal and re-attachement was required.",
          "Encoder Shaft: Press fit with a three ten-thousandths interference for easy repositioning and removal. Both shaft lengths were made longer to account for any changes in encoder mounting position.",
          "Encoder Mount: Slot implemented for back and forth variability in the final encoder shaft location.",
          "Encoder Mount Extender: Width toleranced for encoder mount side to side movement to account for misalignment of the weld.",
          "Fork Shaft: Plug welded to forks for easier removal. Both shafts lengths were made longer for changes in the position or bevel gear ratio.",
          "Motor Mounts: Utilized the full slot width of the motor brackets to allow gearbox or bevel gear ratio changes.",
        ],
        image: { src: bicycleMechanicalOverview, width: 1980, height: 1407, alt: "Steer-by-wire bicycle mechanical components arranged for assembly", displayWidthPercent: 70 },
        topics: [
          { title: "Handlebar Input", text: "The handlebars rotate on their own bearing-supported shaft. This preserves familiar rider ergonomics while allowing the input angle to be measured independently from the front wheel." },
          { title: "Fork Actuation", text: "A compact brushless motor and timing-belt reduction apply torque to the fork shaft. The reduction increases available steering torque while keeping backlash low." },
          { title: "Bearing Supports", text: "Paired bearings constrain each shaft against radial and axial loads. Their spacing was selected to minimize flex without restricting the bicycle’s steering range." },
          { title: "Mounting Brackets", text: "Machined aluminum brackets locate the motor, encoder, and shaft supports from existing frame features. Slotted interfaces provide belt tension and alignment adjustment." },
          { title: "Mechanical Safety", text: "Hard stops prevent over-rotation, while guarded moving parts and accessible fasteners make inspection straightforward before every test ride." },
        ],
      },
      electrical: {
        topics: [
          { title: "Rider Input Sensing", text: "An absolute rotary encoder measures handlebar angle at startup and throughout operation, eliminating the need for a homing movement before the bicycle can be controlled." },
          { title: "Wheel Position Feedback", text: "A second encoder measures fork angle directly. Comparing commanded and measured position gives the controller the error signal required for closed-loop steering." },
          { title: "Motor Drive", text: "A brushless motor controller converts low-voltage steering commands into three-phase motor current. Current limiting protects the actuator when the wheel encounters an obstruction." },
          {
            title: "Power and Signal Architecture",
            text: "The battery feeds separate protected branches for motor power and low-voltage logic. Star grounding, twisted signal pairs, and physical separation between power and encoder wiring reduce electrical noise.",
            image: { src: bicycleElectricalSystem, width: 2058, height: 764, alt: "Steer-by-wire bicycle electrical system arranged as a signal chain", displayWidthPercent: 75 },
            steps: [
              "Route battery power through the main fuse and emergency cutoff.",
              "Supply the motor controller from the protected high-current branch.",
              "Regulate a separate low-voltage rail for the microcontroller and encoders.",
              "Read handlebar and fork position through shielded encoder cables.",
              "Send the requested motor command over the isolated control connection.",
              "Monitor current, supply voltage, and controller status during operation.",
              "Remove motor torque and report a fault whenever a safety limit is exceeded.",
            ],
          },
          { title: "Emergency Controls", text: "A latching cutoff removes actuator power independently of software. The controller also defaults to zero torque after communication loss, invalid sensor data, or low supply voltage." },
        ],
      },
      software: {
        intro: "The firmware converts measured handlebar motion into a wheel-angle target, closes the motor position loop, and supervises every input for conditions that require a safe shutdown.",
        control: {
          title: "Steering Control Loop",
          textBeforeFirstImage: "Each control cycle samples both encoders, unwraps their angular positions, applies the selected gain and direction, and produces a target fork angle.",
          firstImage: { src: bicycleSoftwareControlLoop, width: 688, height: 279, alt: "Bench setup representing the bicycle steering control loop", displayWidthPercent: 50 },
          textBeforeSecondImage: "A cascaded controller turns position error into a requested motor current. Feed-forward compensates for predictable friction, while proportional and derivative terms correct tracking error without making the handlebars oscillate.",
          secondImage: { src: bicycleSoftwareTuning, width: 1743, height: 902, alt: "Bicycle steering controller being tuned from recorded response plots", displayWidthPercent: 30 },
          textBeforeList: "The control loop was tuned around the behaviors a rider notices most directly:",
          points: [
            "Low delay between handlebar motion and wheel response",
            "Smooth reversal through the center position",
            "Stable tracking at both 1:1 and 2:1 gain",
            "Predictable torque limits near the steering stops",
          ],
          textBeforeThirdImage: "Bench tests swept the handlebar through repeatable inputs while logging target angle, measured wheel angle, current, and loop timing. The results were reviewed before each increase in speed or torque limit.",
          thirdImage: { src: bicycleSoftwareValidation, width: 2037, height: 708, alt: "Steer-by-wire bicycle mounted in a bench validation fixture", displayWidthPercent: 80 },
          closingText: "This staged process exposed instability safely and produced a conservative baseline tune before the first supported riding tests.",
        },
        tuning: {
          title: "Modes and Tuning",
          text: "A configuration layer selects normal or reverse direction and a steering gain of one or two. Mode changes are accepted only near center with low wheel speed, preventing an abrupt target-angle jump while riding.",
        },
        integration: {
          title: "Fault Handling and Integration",
          intro: "A supervisory state machine checks encoder plausibility, loop timing, supply voltage, motor status, and command limits. Any failed check moves the system to a zero-torque fault state that requires deliberate reset.",
          image: { src: bicycleSoftwareIntegration, width: 947, height: 1661, alt: "Integrated steer-by-wire bicycle prototype in the workshop", displayWidthPercent: 25 },
          closingText: "The integrated prototype stores diagnostic values for review after each test, making intermittent wiring, alignment, and controller faults easier to reproduce and correct.",
        },
      },
      challenges: {
        intro: "The hardest problem was balancing immediate steering response with stability. Backlash, frame flex, sensor noise, and actuator delay all changed the feel at the handlebars and could amplify one another at higher controller gains.",
        image: { src: bicycleChallenges, width: 685, height: 504, alt: "Steer-by-wire bicycle steering assembly during troubleshooting", displayWidthPercent: 30 },
        closingText: "I addressed these effects through repeated alignment checks, stiffer brackets, filtered velocity estimates, current limits, and progressively faster bench tests. The resulting tune favored predictable straight-line behavior and graceful fault handling over maximum response speed.",
      },
    },
    problems: "Latency between rider input and wheel response made the bike feel unnatural at low speeds. I tuned the control loop with a derivative term and added a mechanical fail-safe clutch.",
    results: "The prototype demonstrated stable low-speed balancing with adjustable steering weight. It became a platform for testing control algorithms and rider-interface concepts.",
  },
  {
    id: "3",
    title: "USB Torque Sensor",
    slug: "usb-torque-sensor",
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=800&q=80",
    detailImage: `${import.meta.env.BASE_URL}artworks/fragments-of-silence.jpg`,
    detailImageWidthPercent: 100,
    supportImage: supportTorqueSensor,
    supportImageWidthPercent: 50,
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
    torqueSensorFinalApproachDetails: {
      assemblyImage: {
        src: usbTorqueSensorAssembly,
        width: 1354,
        height: 1162,
        alt: "Custom USB torque sensor assembly with machined housing and signal-conditioning electronics",
        displayWidthPercent: 50,
      },
      topics: [
        {
          title: "Mechanical Sensor Design",
          text: "The sensing shaft was sized for the full 200 N·m measurement range while concentrating torsional strain where the gauges were bonded. A rigid aluminum housing supports the shaft bearings, protects the gauge wiring, and provides repeatable mounting at both ends.",
        },
        {
          title: "Signal Conditioning and Calibration",
          text: "Four strain gauges form a full Wheatstone bridge so torsional strain produces a differential voltage while common temperature effects largely cancel. A low-noise 24-bit converter amplifies and digitizes this signal before the microcontroller applies zero-offset and scale corrections.",
          image: {
            src: usbTorqueSensorValidation,
            width: 921,
            height: 218,
            alt: "USB torque sensor calibration setup with motor, load arm, and measurement equipment",
            displayWidthPercent: 70,
          },
          closingText: "Calibration loads were applied through a known lever arm and compared against the digitized output across the operating range. A fitted calibration curve converts bridge counts into torque, while repeated loading cycles quantify linearity, hysteresis, and measurement uncertainty.",
        },
        {
          title: "USB Data Acquisition",
          text: "The microcontroller packages each calibrated sample with a timestamp and streams it over USB to a Python application. The desktop tool plots live torque, records tests to a file, and allows the sensor to be zeroed without interrupting acquisition.",
        },
      ],
    },
    problems: "Temperature drift and electrical noise from the motor under test corrupted readings. I added temperature compensation and shielded cables, then oversampled and filtered in firmware.",
    results: "The sensor resolved torque to 0.01 Nm with stable USB streaming. The final device fit in the palm of a hand and was used in multiple motor characterization tests.",
  },
  {
    id: "4",
    title: "Wireless MCU Timer Synchronization",
    slug: "wireless-mcu-timer-synchronization",
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&q=80",
    detailImage: `${import.meta.env.BASE_URL}artworks/paris-layers.jpg`,
    detailImageWidthPercent: 100,
    supportImage: supportWirelessSync,
    supportImageWidthPercent: 50,
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
    finalApproachDetails: {
      howItWorks: [
        { type: "text", content: "The system centers on a single beacon node that periodically broadcasts a reference timestamp over a 2.4 GHz radio link. Every broadcast is timestamped at the radio hardware level so that send-time variability is minimized." },
        { type: "image", src: wirelessHowItWorks1, width: 1808, height: 880, alt: "Beacon node broadcasting reference timestamps to three slave nodes", displayWidthPercent: 70 },
        { type: "text", content: "Each slave node captures its own local timer value the moment it receives the beacon packet. By comparing the received reference time to the local timestamp, the node computes an offset estimate and begins tracking how its clock diverges over time." },
        { type: "image", src: wirelessHowItWorks2, width: 1920, height: 640, alt: "Row of synchronized wireless sensor nodes on a lab bench", displayWidthPercent: 70 },
        { type: "text", content: "Over many beacon cycles, each slave applies a linear regression to the offset data to estimate both offset and drift, then gently adjusts its timer so all nodes stay aligned within the target microsecond window." },
      ],
      challenges: "Packet jitter and missed beacons introduced spikes in the skew estimate. I implemented outlier rejection and a Kalman-style filter to smooth the clock correction. The protocol also had to recover automatically when nodes powered up or temporarily lost signal, requiring a state machine that could re-acquire the beacon without user intervention.",
    },
    problems: "Packet jitter and missed beacons introduced spikes in the skew estimate. I implemented outlier rejection and a Kalman-style filter to smooth the clock correction.",
    results: "Five nodes maintained synchronization within 0.5 ms over a 20-minute test. The system ran on coin-cell power and recovered quickly from temporary wireless dropouts.",
  },
];

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.slug === slug);
};
