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

import cameraRegionOfInterest from "/images/3d_camera/ROI.png";
import cameraNormalEstimation from "/images/3d_camera/summed_area_table.png";
import cameraNormalField from "/images/3d_camera/covariance_matrix_stylized.png";
import cameraFilteredCloud from "/images/3d_camera/kurvature.png";
import cameraNormalFilter from "/images/3d_camera/projected_height.png";


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
  challenges: string[];
}

export interface CaseStudyImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  displayWidthPercent: number;
  /** Inner inset (px) so rounded corners don't clip image edges */
  framePaddingPx?: number;
}

export interface BicycleDesignTopic {
  title: string;
  text: string;
  additionalParagraphs?: string[];
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
      additionalTextBeforeFirstImage?: string;
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

export interface TorqueSensorLink {
  text: string;
  href: string;
}

export interface TorqueSensorFinalApproachDetails {
  assemblyImage: CaseStudyImage;
  introParagraphs: string[];
  topics: [
    { title: string; paragraphs: string[]; link?: TorqueSensorLink },
    { title: string; paragraphs: string[]; image: CaseStudyImage; closingText: string; link?: TorqueSensorLink },
    { title: string; paragraphs: string[]; link?: TorqueSensorLink },
  ];
}

export type CameraApproachBlock =
  | { type: "text"; content: string }
  | { type: "image"; image: CaseStudyImage }
  | { type: "list"; points: string[] };

export interface CameraApproachSection {
  title: string;
  blocks: CameraApproachBlock[];
  topics?: { title: string; text: string; additionalParagraphs?: string[] }[];
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
  researchConclusion: string | string[];
  finalApproach: string;
  finalApproachDetails?: FinalApproachDetails;
  bicycleFinalApproachDetails?: BicycleFinalApproachDetails;
  torqueSensorFinalApproachDetails?: TorqueSensorFinalApproachDetails;
  cameraFinalApproachDetails?: CameraApproachSection[];
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
    summary: "TODO",
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
    researchConclusion: [
      "I quickly learned that no sensor combination with an IMU would be able to achieve the desired accuracy for any reasonable period of time, eliminating all those options. Likewise, a real time kinematic GPS would far exceed the budget. Thus, only distance sensors remained viable.",
      "To ensure I met the requirements, I began by calculating the overall measurement error with an uncertainty analysis. I found that, of the main methods for measuring distance — time-of-flight, ultrasonic, single-point LiDAR, and radar — only time-of-flight and LiDAR provided the precision I needed. However, I realized that in a real environment surface variations and obstacles could make any single measurement unreliable. To identify these incorrect measurements, I would need to collect a large number of points.",
      "A 3D camera can measure the positions of thousands of points simultaneously. This provides enough data to distinguish points belonging to the main surface from those caused by obstacles or surface irregularities. There are time-of-flight, LiDAR, and stereo vision 3D cameras to choose from. I initially tested a time-of-flight camera (pico flexx) but discovered their performance deteriorates in strong sunlight. LiDAR was rejected for the price leaving stereo vision as the only option. ",
    ],
    finalApproach: "A dual-camera rig with synchronized shutters, checkerboard calibration, and a disparity-to-depth pipeline computed on a host PC. I wrote the calibration routine in Python and optimized matching with OpenCV.",
    cameraFinalApproachDetails: [
      {
        title: "Hardware",
        blocks: [
          { type: "text", content: "Among the companies that offer a 3D camera capable of 90 Hz are Intel realsense, Luxonis, and Stereolabs. They are all reputable brands with differing ideal use cases but for this application it did not really matter. They all met the accuracy requirement and were more or less the same size. I ended up selecting the Intel Realsense D435 camera simply because I managed to get a used one for $50. In retrospect, I would buy another as the whitepapers and support they provide are very informative." },
          { type: "text", content: "To meet the size requirements, I explored single-board computer (SBC) options to pair with the camera. At the time, the most performant option in the typical SBC form factor was the Orange Pi 6. However, when paired with the camera, the combined size exceeded the requirement. Instead, I discovered the Raspberry Pi 5 Compute Module and paired it with Waveshare’s nano base board. This combination reduced the overall form factor by 3.5× while retaining most of the computational performance, allowing it to meet the size requirement." },
        ],
      },
      {
        title: "Region of Interest",
        blocks: [
          { type: "text", content: "The first part of the program selects a region of interest (ROI) in the image to the desired real-world size. Implementing this proved challenging because 3D cameras operate according to the pinhole camera principle in which the point-to-point distance increases with depth. Consequently, each quadrant of the ROI can consist of a different number of points." },
          { type: "text", content: "To address this, I implemented a function that iterates upward, downward, leftward, and rightward from the center row and column to determine the pixel dimensions of the ROI for each frame. To improve robustness, the function iterates along the entire row or column with the median distance used. My application has a maximum operating distance of 1.5 meters which provides a lower bound on the ROI’s dimensions. I leveraged this constraint to optimize the iteration process by initializing each search at this minimum dimension rather than starting from the center. This reduces the number of iterations required, helping meet the 90 Hz sampling requirement." },
          { type: "image", image: { src: cameraRegionOfInterest, width: 536, height: 644, alt: "Schematic of a camera depth frame with a selected ground region of interest", displayWidthPercent: 40, framePaddingPx: 8 } },
        ],
      },
      {
        title: "Subdivisioning",
        blocks: [
          { type: "text", content: "The goal of breaking the surface into smaller chunks is to identify and remove undesirable regions. For example, if a branch or leaf is present in the image, the corresponding regions can be excluded so they do not influence the plane fit. The subregion size essentially determines the resolution at which surface variation can be captured. Smaller regions capture finer details but too small and the measurement noise becomes problematic. In practice, I found that a 7×7 pixel subregion provided a good tradeoff for this application." },
          { type: "text", content: "There is also a question of step size, or how far the subregion moves between measurements. Initially, I subdivided the surface and shifted the region by the entire width for each subsequent measurement. However, shifting the region by only 1 pixel proved far more effective at capturing surface detail, since adjacent regions overlap and provide much denser coverage of the surface." },
        ],
      },
      {
        title: "Normal Vectors",
        blocks: [
          { type: "text", content: "I chose the principal component analysis (PCA) plane-fit approach to determine the normal vectors. I initially considered more robust methods, however, they were not feasible given the required sampling rate and I did not want to pursue approaches that relied on randomization. PCA provides a least-squares fit by calculating the orthogonal eigenvectors of the covariance matrix. In other words, it identifies the directions of variance with the direction of least variance used as the normal vector to the fitted plane." },
          { type: "text", content: "A critical optimization I incorporated to achieve the 90 Hz requirement was the use of summed-area tables to compute the normal vectors for each subregion. To implement this, an array of cumulative sums is precomputed where each element contains the sum of all values above and to the left of it. Example below." },
          { type: "image", image: { src: cameraNormalEstimation, width: 1395, height: 749, alt: "Diagram of local plane fitting and normal vectors on depth samples", displayWidthPercent: 50 } },
          { type: "text", content: "Using a summed-area table, the sum of any rectangular region — or in this case square — can be computed using only addition and subtraction of the four corner elements. This eliminates the need to iterate over every pixel within the region each time a sum is required. In my implementation, I created nine separate summed-area tables to substantially accelerate the computation of the covariance matrices for the subregions. The summation breakdown of a covariance matrix is shown below. When processing the entire depth image (848 × 480 pixels), this optimization reduces the number of required operations by approximately 10× when using 7 × 7 pixel subregions." },
          { type: "image", image: { src: cameraNormalField, width: 1690, height: 931, alt: "Point-cloud visualization of computed surface normal vectors", displayWidthPercent: 70 } },
        ],
      },
      {
        title: "Filtering",
        blocks: [
          { type: "text", content: "With the directional variances already calculated, filtering non-planar subregions is quite straight-forward. If the proportion of variance in the direction of the normal vector is small compared to the total variance, the region can be considered planar. In other words, the fraction of the smallest eigenvalue to the sum of all eigenvalues." },
          { type: "image", image: { src: cameraFilteredCloud, width: 2172, height: 724, alt: "Illustration comparing raw depth samples with filtered ground candidates", displayWidthPercent: 40 } },
          { type: "text", content: "There is also a need to distinguish regions that are planar but not coplanar with the majority plane. To determine the plane a subregion lies on I use the magnitude of the camera-to-normal vector projected onto the normal of the subregion, as shown below. I call this the projected height. This approach is only valid when applied to a set of normal vectors orientated in the same direction." },
          { type: "image", image: { src: cameraNormalFilter, width: 752, height: 361, alt: "Diagram showing aligned surface normals retained and inconsistent normals rejected", displayWidthPercent: 80 } },
        ],
      },
      {
        title: "Region Growing",
        blocks: [
          { type: "text", content: "I was now left with a set of scattered subregions that needed to be combined to form the majority plane. Initially, I selected a subregion as a seed and expanded outward, adding neighboring subregions whose normal vectors fell within an angular threshold. I soon realized that finding the largest possible set would require considering every subregion as a potential seed. This was computationally infeasible given the 90 Hz requirement." },
          { type: "text", content: "Instead, I implemented histograms to substantially reduce the number of computations. Early on I converted the cartesian vectors into spherical coordinates thinking this would simplify the process. Nope. When the measured plane is parallel to the camera the measurement noise causes the normal vectors to disperse randomly around the azimuth direction. Using cosine direction angles instead resolved this issue." },
          { type: "text", content: "The cosine direction angle histogram is dimensioned so that each voxel spans 1°x1°x1°. Each voxel contains an array storing the normal vector’s subregion index, defined by its center point, along with its projected height. Once all normal vectors have been added, each occupied voxel is expanded to its neighbors within the angular threshold to form clusters. The voxel arrays within each cluster are then concatenated and a histogram of projected heights formed. For each cluster, a sliding window is applied to the projected height histogram to identify the largest set of coplanar subregions oriented in the same direction. PCA is then reapplied to this set of points to obtain a robust normal vector which is used to calculate the sensor’s height and orientation." },
          { type: "text", content: "A number of optimizations were needed for this method to be successful. First, not all voxels are expanded to form clusters, and not all clusters generate projected height histograms. Only those containing enough vectors proceed to the next stage. Additionally, when clusters are formed, a new array containing all of the voxel data is not created. Instead, each cluster maintains an array of pointers to the existing voxel arrays, avoiding the need to copy the data. Lastly, memory arenas were implemented to enable fast runtime allocation." },
        ],
      },
      {
        title: "Kinematic Modeling",
        blocks: [
          { type: "text", content: "Wanting to explore adding quadratic regression for 2D kinematics applications, I delved into robust regression approaches to provide an additional layer of redundancy. The ability of these methods to ignore outliers is quantified by a metric called the breakdown point. It measures the percentage of points that can be corrupted before the fitted model is substantially affected. The noteworthy methods I researched are:" },
          { type: "list", points: [
            "Least Median of Squares (LMedS): Minimizes the median of the squared residual. 50% breakdown point.",
            "Least Trimmed Squares(LTS): Computes the best fitting least squares solution among a subset of the data. Up to 50% breakdown point.",
            "Theil–Sen: Computes the median of each coefficient by fitting every possible pair of points. 29.3% breakdown point.",
          ] },
          { type: "text", content: "I was particularly intrigued by methods with high breakdown points. These methods are rarely used in practice, primarily because of the computational workload they require. My application uses such a small sample size — around 30 points — that implementing them was feasible, or so I thought. Despite the small number of points the LTS method would require an exhaustive search of all subsets of 15 points for a total of 155 million computations. Not going to happen. The top of the line algorithm for LMedS is much faster but uses a complex branch and bound algorithm to achieve it. I believe this approach could have been successful but I soon learned about the tradeoff of high breakdown methods. Essentially, these methods are only beneficial if outliers actually exist in the data. Far fewer outliers will exist in my data making these methods a poor choice." },
          { type: "text", content: "To achieve a lower breakdown point, I could simply sample a larger subset using LTS. However, even a subset of 22 points requires approximately 6 million computations. The Theil–Sen method achieves the same breakdown point while using subsets of only 3 points, requiring just 4,096 computations. I proceeded with the Theil-Sen approach. This was still computationally challenging, as it required finding the median of three arrays, each containing 4,096 elements. To reduce this computational cost, I implemented each array as a histogram. The median is then found by computing the median only among the data contained within the histogram’s median bin." },
        ],
      },
      {
        title: "Optimizing Camera",
        blocks: [
          { type: "text", content: "Where possible, I like to tailor equipment to the project at hand to maximize performance. Even when additional performance is not necessary, I find that doing so provides valuable insight into the underlying operation of the hardware. In this case, the options were extensive." },
        ],
        topics: [
          { title: "Dot Projector", text: "The D435 uses a projector that shines thousands of dots onto the scene to improve performance. I discovered the default power is 150 milliwatts but can be increased to 360 for a reasonable reduction in the depth noise. Intel also provided a whitepaper that outlined further reducing depth noise with an extra external dot projector. I was intrigued and wanted to test the performance gains myself but the available dot projectors are too expensive. To overcome this, I purchased a set of broken xbox kinects for cheap and scrapped them for their dot projectors. These turned out to be on the weaker side and provided minimal improvement." },
          { title: "Post-Processing Filters", text: "TODO",},
          { title: "Configuration Presets", text: "Intel provides a set of configuration files that adjust various settings in the stereo-matching algorithm. These settings can also be modified manually — I have experimented with doing so — but Intel provides no documentation describing their individual functions. Some of the available presets include high accuracy, high density, and hand tracking. I use the high accuracy preset for whatever additional robustness it may provide", additionalParagraphs: ["TODO"] },
          { title: "Optical Filters", text: "My interest in applying an optical filter was to increase the contrast of the dot projector. Intel demonstrated a reduction in depth noise by up to a factor of 3. I briefly tested a long-pass filter, but further testing would be needed to conclusively determine its impact. Ultimately, after achieving sufficient results through the other optimizations, I abandoned this approach." },
        ],
      },
    ],
    results: "TODO",
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
    summary: "TODO",
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
    researchConclusion: "Initially, I chose the planetary gearbox paired with the idler gears methods because the math was very unique and challenging. I am proud of the idea for its relative mechanical simplicity and it is something I really wanted to realize. But, is it the right approach? As I delved deeper analyzing the forces it became clear that many additional components would be required to guarantee sucess. And, any mistakes in the design or manufacture would be costly and potentially cause the project to exceed its budget. As a result, I transitioned to the steer-by-wire system which trades much of the mechanical complexity for software complexity.",
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
        image: { src: bicycleMechanicalOverview, width: 1980, height: 1407, alt: "Steer-by-wire bicycle mechanical components arranged for assembly", displayWidthPercent: 100 },
        topics: [
          { title: "Bevel Gears", text: "A high-quality set of gears was not feasible within the available budget. I therefore selected a pair with a 1.5 mm module and unity (1:1) gear ratio. Calculations indicated that the gears were undersized for the expected loading. That said, the low number of operating cycles, low cost, and ease of replacement made for an acceptable tradeoff. I consider this analysis to have been successful but, for reasons discussed later, the gears were ultimately replaced with a set using a 2 mm module. I chose to mesh the gears at the top to reduce the overall assembly height resulting in a more compact design." },
          { title: "Steering Feel", text: "Steering feel was anticipated to be very strange in the absence of the fork and wheel inertia. I wanted to incorporate force feedback with an additional stepper motor but it was too expensive. I considered approaches that would match the inertia but everything that would work looked terrible. My original designs used a simple bolt perpendicular to the head tube to vary the amount of friction on the inner sleeve. I quickly abandoned this when I realized I could just replace the headset bearings with o-rings which worked spectacularly well." },
          { title: "Gearbox Selection", text: "Learning all I could about optimizing motion control systems led me to discover a critical component: a gearbox. For the most responsive motion control system, the inertia of the motor’s rotor should be equivalent to load inertia. In practice, having an inertia ratio be 5 or less is sufficent. How do you match the inertias? With a gearbox! Nowhere is this spectacular property taught and it’s a crime. A gearbox reduces or increases inertia by the square of the ratio. With a nema 24 motor I managed an inertia ratio of 2.4 using a 20:1 gear reduction. At the planned 1500rpm max motor operating speed this exceeded the velocity requirement at 75rpm. A nema 34 motor did not cost much more and could have achieved the ideal inertia ratio, but a cardboard mockup revealed it would be excessively large for the bike." },
          { title: "Failures", text: "The two mounts used to bolt the motor driver to the frame are awful. I don’t know what I was thinking. You need one hand to hold the driver, one to tighten the bolts, and another using pliers to position the nut. The only redeeming factor is that there is not much reason to remove it after install as all connectors are removeable. On the other hand, I initially assumed the angle the top frame bar makes with the original head tube is 90 degrees. It is not; I measured it to be approximately 87 degrees. Thankfully I discovered this before I welded the motor mount into position." },
          { title: "Safety", text: "The bevel gears look cool. Against my better judgment, I justified leaving them exposed on the basis that being cognizant of their danger was an acceptable risk. However, it became clear that other users were not as aware of the danger they posed, which brought me to my senses and prompted the addition of a cover." },
        ],
      },
      electrical: {
        topics: [
          { 
            title: "Motor Selection", 
            text: "Driven by a desire to maximize motor performance, I wanted to understand every available avenue for improvement. I had already selected a NEMA 24 motor that met the torque requirement, but I wanted a plan for increasing performance if the initial design proved insufficient. This led me down a rabbit hole of textbooks and whitepapers covering thermal optimization, current rise time, closed-loop operation, and stepping modes.",
            additionalParagraphs: 
            [
              "At its core, a motor’s performance is fundamentally limited by its temperature and magnetic saturation. I found reports of magnetic saturation occurring in stepper motors at approximately twice the rated current. Cooling at twice the current would not be feasible with the budget but I reasoned the lower duty cycle of this application would withstand some additional current without modification. Thus, I upsized the motor driver to a nema 34 which was capable of supplying additional current at a negligible upcharge.",
              "Another choice to be made was between open and closed-loop operation. In an open-loop configuration, the motor must always be driven slightly below its maximum performance to avoid position errors. Closed-loop operation removes this requirement, making it the obvious choice given the negligible cost difference. It also simplified my program, as I no longer needed to monitor whether I was pushing the motor beyond its limits.", 
              "Lastly, microstepping is a very popular driving technique for these motors due to the noise reduction and smoother operation. However, it reduces output torque considerably with one source reporting a 30% reduction."
            ],
          },
          { title: "Driver Selection", text: "I chose the CL86T motor driver over other nema 34 models for its slightly less terrible programming software. The software exposes a wide variety of configuration parameters most of which have no description. I meticulously researched descriptions for them and managed to piece everything together with documentation provided on the original manufacturers website (leadshine). Of note, this gave me a set of PID parameters I could configure and I discovered the driver filtered inputs for 15ms which I set to zero to help achieve the input delay requirement." },
          { title: "Battery Selection", 
            text: "The upsized driver also provided an opportunity to experiment with higher drive voltages. Increasing the voltage allows current to build more quickly in the motor windings, improving acceleration. Testing with a power supply demonstrated a substantial improvement when increasing the voltage from 24 V to 36 V, while further increases yielded little additional benefit.", 
            additionalParagraphs: ["Higher voltage also helps maintain torque at high speeds. With the selected gearbox, the available torque at maximum speed was approximately twice the required torque, so additional high-speed torque was unnecessary. Based on these findings, a 36 V battery was selected. Specifically, a tool battery was chosen for its cost-effectiveness and the ability to extend runtime by swapping batteries."] },
          {
            title: "User Interface",
            text: "All components were selected based on cost, with the exception of the LCD, which was chosen for its flexibility in displaying information. The functionality of each component is described below:",
            image: { src: bicycleElectricalSystem, width: 2058, height: 764, alt: "Steer-by-wire bicycle electrical system arranged as a signal chain", displayWidthPercent: 100 },
            steps: [
              "Increases gain.",
              "Changes steering mode between normal and reverse.",
              "Decreases gain.",
              "Displays gain, direction, and error information. Asterisk indicates pending changes.",
              "Disconnects the motor driver pulse wire to allow re-alignment of the handlebar with the wheel position.",
              "Arduino power button.",
              "Zeros the encoder position.",
            ],
          },
          { title: "Safety", text: "The power supply was selected for its maximum output of 60 VDC, generally recognized as the maximum considered safe. Additionally, the Arduino power button (#6 above) was positioned for easy access, allowing it to double as an emergency stop." },
        ],
      },
      software: {
        intro: "The overall structure of my program is extremely simple. It waits until the encoder measures a steering angle change twice its resolution (0.175 degrees) and sends the pulses to the motor driver. Layered onto this is filtering, interaction with the peripheral components, safety checks, and error handling.",
        control: {
          title: "Filtering",
          textBeforeFirstImage: "I wanted to monitor the input steering velocity and acceleration for safety, debugging, and verification that the design requirements were satisfied. I initially implemented finite-difference differentiation of the encoder measurements but encountered the noise amplification inherent to numerical differentiation. I therefore explored several filtering techniques including moving averages, Gaussian filters, and regression-based approaches. I ultimately selected the regression-based method for its ability to better preserve the underlying signal.",
          additionalTextBeforeFirstImage: "The Savitzy-Golay (SG) filter curve fits a window of the data, samples the middle of the curve, and applies derivatives at the same location. The genius of the filter is its ability to precompute the majority of calculations with the trade-off that the data points need to be equally spaced. Locally Estimated Scatterplot Smoothing (LOESS) regression is essentially the same filter without the need for equally spaced data points but the requirement to recompute the least-squares solution for every window. The example below illustrates an application using a 4th-order polynomial and 45-point window size.",
          firstImage: { src: bicycleSoftwareControlLoop, width: 688, height: 279, alt: "Bench setup representing the bicycle steering control loop", displayWidthPercent: 100 },
          textBeforeSecondImage: "I had experience with least-squares quadratic regression so I chose to use the LOESS method. To optimize the approach, I computed each summation as a running sum where the next iteration subtracts the oldest value and adds the new value, substantially reducing the number of operations.",
          secondImage: { src: bicycleSoftwareTuning, width: 1743, height: 902, alt: "Bicycle steering controller being tuned from recorded response plots", displayWidthPercent: 45 },
          textBeforeList: "The implementation was very successful but I had become fascinated with adding weight functions to improve the filtering power. Implementing weight functions with LOESS required forgoing my optimization so I circled back to the SG approach. Comparing and contrasting the approaches I came to the following conclusions:",
          points: [
            "My application did not require extra filtering power",
            "Using weight functions requires a larger sampling window",
            "My LOESS implementation was slightly faster",
            "LOESS is easier to implement",
          ],
          textBeforeThirdImage: "With these findings, I ultimately preferred the LOESS approach but I later discovered it requires double precision which Arduino does not support. Thus, the SG filter was used in the final program. The following graphs depict the results when measuring the maximum expected user steering velocity and acceleration.",
          thirdImage: { src: bicycleSoftwareValidation, width: 2037, height: 708, alt: "Steer-by-wire bicycle mounted in a bench validation fixture", displayWidthPercent: 100 },
          closingText: "A drawback of this filter is that it introduces some latency due to sampling at the midpoint. The sampling point can be changed to the most recent data point but if a sudden input change occurs the qunatities will be overestimated. Configuring the sampling spacing and number of points was tricky. The least latency possible was desired but acceleration required a sizable window to capture enough detail. After much trial and error a sampling interval of 2.8ms was selected with a 19 point window resulting in a latency of 12ms; far below the requirement.",
        },
        tuning: {
          title: "Safety",
          text: "To guard against calculation errors and faulty encoder measurements, the commanded behavior is closely monitored to ensure it remains within acceptable limits. Specifically, input measurements are thresholded based on positional change, velocity, and acceleration. If any threshold is exceeded, the measurement is rejected and an error code is sent to the display. To guard against small errors accumulating over time, the motor driver monitors the motor’s position error and cuts power if it becomes excessive. Lastly, the encoder’s checksum is used to help detect corrupted measurements.",
        },
        integration: {
          title: "Complete Picture",
          intro: "The following flowchart brings these individual components together to illustrate the overall program operation.",
          image: { src: bicycleSoftwareIntegration, width: 947, height: 1661, alt: "Integrated steer-by-wire bicycle prototype in the workshop", displayWidthPercent: 40 },
          closingText: "TODO",
        },
      },
      challenges: {
        intro: "In the early testing phase, I noticed plastic deformation at the roots of many gear teeth and excessive wear of the faces. The wear pattern, shown below, indicated the gear were meshing at too shallow of an angle. This was peculiar as I had confirmed the shafts to be at the required 90 degrees. Analyzing further, I was able to determine that the gears themselves were improperly manufactured and meshed at around 85 degrees. The gears were replaced with a set having a 2 mm module to better withstand misalignment.",
        image: { src: bicycleChallenges, width: 685, height: 504, alt: "Steer-by-wire bicycle steering assembly during troubleshooting", displayWidthPercent: 60 },
        closingText: "Towards completion, I installed the motor driver revealing that its ABS side panel acted as an amplifier for the motor’s vibrations. The amplification was substantial, easily doubling the volume. At this point, available funds were dwindling, so I limited the solutions to those that required no additional cost. I first tried stiffening the panel by gluing pieces of scrap ABS between the internal ribs, providing a modest improvement. I also considered longer pulse widths and microstepping, with the latter reducing the sound to an acceptable level.",
      },
    },
    results: "TODO",
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
    summary: "TODO",
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
    researchConclusion: "I selected the torque adapter approach to decode the LCD screen as my knowledge of circuitry at this point was fairly limited and I wanted to learn more. Rotary load cells are extremely expensive and creating a custom load cell that I was confident in its accuracy would require equipment exceeding the budget. Likewise, the approach of manually recording the measurements would require an expensive gearbox if I hoped to achieve the accuracy requirement.",
    finalApproach: "Researching how to decode an LCD screen turned out to be quite tricky. Unsurprisingly, there is very little information about the subject. I began by learning all about the operation of the twisted nematic LCD displays used in these applications. I learned there are two major types: static and multiplexed displays. The static displays have one common pin plus however many segments the display has. A multiplexed display shares multiple common pins among the segment pins to reduce the total number needed to drive the screen.",
    torqueSensorFinalApproachDetails: {
      introParagraphs: 
      [
        "To simplify the project, I wanted to find a torque adapter that used a static display. I purchased four different models, selected for their unique features: the Durofix RM602-4A, Powerbuilt 940962, ANPUDS, and ThreeH. The Durofix had a backlight, the ANPUDS had a color screen, and the remaining models had different screen sizes. Unfortunately, after disassembling them, I discovered that all four used multiplexed displays. Purchasing them was not a waste, however, as I also wanted to characterize the displays’ responsiveness and refresh rates. I assembled a test rig in which I dropped a 1/2-inch socket onto the end of a socket wrench and recorded the displays in slow motion. To identify the start of the impulse, I built a simple circuit that illuminated an LED when the socket contacted the wrench. This proved extremely informative, with the ANPUDS model being substantially more responsive than the others. I later measured its frame rate directly at 60 fps and suspected that the remaining displays operated at 30 fps.", 
        "Stuck with multiplexed displays I decoded the ANPUDS screen through trial and error by applying a small dc voltage across the pins. Here is the completed table:",
      ],
      assemblyImage: {
        src: usbTorqueSensorAssembly,
        width: 1354,
        height: 1162,
        alt: "Custom USB torque sensor assembly with machined housing and signal-conditioning electronics",
        displayWidthPercent: 60,
      },
      topics: [
        {
          title: "Measuring The Segments",
          paragraphs: [
            "The screen has a total of 6 digits with only 5 of them in use by the sensor. Since my requirement is only up to 200 N·m I only needed to decode 4 of these digits. This reduced the number of segment pins I would need to measure from 10 to 8. The segment pins used 4 common pins for a total of 32 individual segments I would need to measure. To accomplish this, I implemented two 8-channel demultiplexers with one used to select among the 4 common pins and the other the 8 segment pins. I could have purchased a 4-channel demultiplexer for the common pins but the 8-channel was cheaper.",
            "The toughest part was measuring the segment voltages. These LCD screens must be driven with an AC voltage because prolonged DC damages the screen. I did a lot of testing with op amps, diodes, and comparators before realizing I made a mistake. I assumed that the AC drive voltage requirement meant that the voltage must alternate between a positive and negative voltage. The screen was actually set up to produce an AC voltage between 3.6v and 0v. With a DC bias why isn't the screen damaged? Because the polarity between the common and segments is alternated creating an average dc voltage of zero. With this, I was able to greatly simplify the circuit by just using voltage dividers to reduce the voltage to a maximum of 3.3v. I sampled both segment and common voltages independently with the adc on an STM32 and computed the difference digitally.",
          ],
        },
        {
          title: "When To Sample",
          paragraphs: [
            "At this point, the ideal approach would have been to measure the common waveforms to determine when to sample each segment. I had access to an oscilloscope at UC Davis, but I wanted to challenge myself to solve the problem without one. Without knowing how the screen was updated, I instead designed my program to continuously sample the segments and calculate their root mean squared voltage. This approach, however, reduced the effective sampling rate from 60 Hz to around 20 Hz. Additionally, transitions between certain digits could briefly produce readings corresponding to another valid digit. These corrupted measurements would have been relatively easy to remove during a post-processing step, but I wanted to achieve a faster sampling rate.",
            "Close to abandoning the oscilloscope-less approach I inspected the microcontroller on the torque adapter and managed to read its model number (BH67F5265). In it, I managed to find thorough documentation of the many LCD drive types it supported. The waveforms generated for each drive type is unique so I plotted some adc measurements to determine which one this application uses. The waveform for COM0 is shown below. The full set can be viewed here.",
          ],
          link: {
            text: "here",
            href: `${import.meta.env.BASE_URL}images/torque_adapter/lcd_drive_type.png`,
          },
          image: {
            src: usbTorqueSensorValidation,
            width: 921,
            height: 218,
            alt: "USB torque sensor calibration setup with motor, load arm, and measurement equipment",
            displayWidthPercent: 90,
          },
          closingText: "Using this information and the known frame rate of 60 fps I could time my program to sample each segment at precisely the right moment letting me achieve the full sampling rate.",
        },
        {
          title: "Challenges",
          paragraphs: [
            "Understanding when the sensor applied updates to the screen was confusing. Based on the documentation, I initially assumed that the beginning of COM0 marked the start of every frame. To avoid measuring the screen during an update, I planned to detect a change, wait for the update to complete, and then resume sampling at the beginning of the next COM0 pulse. This failed. I realized that what I called COM0 was likely not the same signal described in the documentation. I then tried starting each frame at what I called COM1, COM2, and COM3. This also failed. After considerable trial and error, I discovered that a frame could start at the beginning of any of the COM waveforms. Applying this, after detecting a segment change, I wait for one frame starting from whichever COM line drives that segment before I resume sampling.",
            "My realization that the circuit could be greatly simplified using only demultiplexers and voltage dividers opened up another opportunity: integrating all of the electronics within the original housing. To accomplish this, I cut off the original AAA battery compartment and powered the sensor directly from the microcontroller. Ordering a custom PCB would have made this far less challenging, but a mistake would have been costly and difficult to correct while also exceeding the project budget. Instead, I chose to use a prototype PCB, which gave me greater flexibility to modify and refine the circuit as I went.",
            "Over time, I have learned the importance of modular design and its ability to improve serviceability. I used to focus solely on preventing damage in the first place, often paying the price with difficult repairs. On this project, every component can be individually replaced. The custom PCB and microcontroller are connected with JST MX1.25mm connectors and the demultiplexers use socket adapters.",
          ],
        },
      ],
    },
    results: "TODO",
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
    summary: "TODO",
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
    researchConclusion: "In the end, the approach I selected operates on the same principle as TPSN. With RBS I did not want to include an additional transmitter and the advancements of FTSP were not useful to an application of three microcontrollers.",
    finalApproach: "A beacon node broadcasted reference timestamps over a 2.4 GHz link. Slave nodes recorded local timer values on receipt and applied a linear regression to estimate and correct clock skew.",
    finalApproachDetails: {
      howItWorks: [
        { type: "text", content: "My synchronization protocol uses one master device whose timer is immutable while all other devices correct themselves to match it. Each device contains two timers: one counter and the other free-running. The free-running timer is set with a somewhat arbitrary wrap point; currently using 50,000. The receivers shrink or extend this capture/compare register in order to match the master device. On each overflow, the counter is incremented. To timestamp an event I leveraged Nordic’s Programmable Peripheral Interconnect (PPI) system. It is a system that allows configuring hardware events and tasks to occur without CPU intervention, effectively eliminating timing jitter. With this, I can capture the value of both timers simultaenously and combine them for the complete timestamp." },
        { type: "text", content: "Using the idea of timestamping immediately before transmission and upon reception, I delved into the nRF52840 radio architecture to understand how I could achieve the timing precision required for this project. Leveraging the PPI system, along with the radio sequence diagram shown below, was critical to the success of this approach." },
        { type: "image", src: wirelessHowItWorks1, width: 1808, height: 880, alt: "Beacon node broadcasting reference timestamps to three slave nodes", displayWidthPercent: 100 },
        { type: "text", content: "On the transmitter side, I invoke the transmitter enable (TXEN) task and start a timer which ends after the transmitter ramp-up time (TXRU) is completed. When the timer ends, two tasks are executed. The timestamp to be sent to the receiver is captured and another timer begins to start the radio START task in exactly 10 microseconds with the PPI system. During this delay, the timestamp is written to the outgoing packet." },
        { type: "text", content: "On the receiver side, its timestamp is captured at the ADDRESS event. Therefore, when calculating the offsets, the delays in the transmitter timestamp up to this point must be accounted for. This includes the 10 microseconds between TXRU completion and START, as well as the time elapsed from START to the receiver’s ADDRESS. I measured the latter delay directly with a logic analyzer and found it to be 29.5 microseconds, resulting in a total delay of 39.5 microseconds. The complete process is summarized in the diagram below." },
        { type: "image", src: wirelessHowItWorks2, width: 1920, height: 640, alt: "Row of synchronized wireless sensor nodes on a lab bench", displayWidthPercent: 100 },
      ],
      challenges: [
        "The automatic synchronization requirement created an interesting challenge when synchronizing the counter. If the master device has been powered on for an extended period, its counter count can grow beyond what the receivers can correct. This is because the counter can only be incremented by one or reset to zero. To match the master counter, the receiver must reset its counter then increment it to match. This process can take longer than the free-running timer’s wraparound period, causing additional increments to occur before synchronization is complete. To address this, I synchronize the counter in two stages. The majority of the counts are incremented in the first stage except what is guaranteed to be correctable in the second stage.",
        "I chose Nordic’s nRF52 series of microcontrollers for this project because of the company’s strong reputation and its proprietary Enhanced ShockBurst (ESB) radio protocol. However, integrating the protocol with time synchronization proved to be a significant technical challenge. ESB requires exclusive control of the radio peripheral, while time synchronization requires direct, low-level access to the same hardware. To resolve this conflict, I implemented Nordic’s Multiprotocol Service Layer (MPSL) timeslot feature, which temporarily yields control of reserved peripherals. This also simplified correction event scheduling. Initially, achieving the system requirement of microsecond-level accuracy required correction events every few milliseconds because the timers operated at different tick rates. To reduce the frequency of these corrections, I use linear regression to estimate the clock drift rate and applied corrections between the master correction events. This extended the interval between master corrections from milliseconds to tens of minutes.",
        "ESB presented another challenge. It modifies the default radio settings, causing my timestamps to be ignored by the receiving device. After exploring my options, I determined that I would need to replicate the ESB message format when transmitting the timestamp. I scoured the nRF52 datasheet, which was useful for understanding the standard radio packet format but provided little information about ESB itself. I then turned to the nRF24 series datasheet, which documented the legacy ShockBurst protocol in greater detail, but even this information was insufficient. Ultimately, I had to reverse-engineer the format by tracing through the source code.",
        "Another challenge I encountered was an unusual race condition. The counter would occasionally be one increment too small while the free-running timer read zero. I initially implemented the free-running timer using the Nordic shortcut system, which is essentially a non-configurable version of the PPI system. I eventually discovered that the shortcut system has a shorter propagation delay, causing the free-running timer to reset ever so slightly before the counter could be incremented. Reconfiguring the free-running timer to use the PPI system equalized the propagation delays, resolving the issue.",
      ],
    },
    results: "TODO",
  },
];

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.slug === slug);
};
