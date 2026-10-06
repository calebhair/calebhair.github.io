import * as THREE from 'three';
import { tagDefinitions as TAGS } from './tags';

/**
 * Converts a list of strings to a single bullet pointed string.
 * @param {string[]} textList
 */
function bulletPoints(textList) {
  const items = textList.map((text, index) => {
    return `<li class="project-list-item ${index === textList.length - 1 ? 'project-last-list-item' : ''}">${text}</li>`;
  }).join('');
  return `<ul class="project-list">${items}</ul>`;
}

/**
 * Returns the text in bold.
 */
function b(text) {
  return `<b>${text}</b>`;
}

function date(year) {
  return `<span class="project-date">${year}</span>`;
}

function heading(text) {
  return `<h2 class="project-heading">${text}</h2>`;
}

function github(link) {
  return `<a class="project-github" href="${link}" target="_blank">GitHub</a>`;
}

/**
 * Project definitions
 * @type {[
 * { name: string,
 *   description: string,
 *   images: [ { url: string, altText: string } ],
 *   tags: [],
 *   iconPath: string,
 *   modelPath: string,
 *   planetSize: number,
 *   orbitRadius: number,
 *   orbitStartingAngle: number,
 *   orbitSpeed: number,
 *   planetRotationSpeed: THREE.Euler,
 *   orbitOrientation: THREE.Euler,
 *   orbitCentre: THREE.Vector3 },
 * ]}
 */
export const projectContent = [
  {
    name: 'Portfolio',
    description: bulletPoints([
      'Designed and developed a personal website for showcasing programming projects',
      `Utilised ${b('HTML')}, ${b('CSS')}, ${b('JavaScript')}, ${b('React')}, ${b('Three.JS')}, `
      + `${b('Vite')}, and ${b('ESLint')} to create an engaging and unique portfolio, frequently requesting feedback and criticism from family and friends to gain insight into user experience and preferences`,
    ]) + github('https://github.com/calebhair/calebhair.github.io') + date(2025),

    images: [],
    tags: [
      TAGS.HTML,
      TAGS.CSS,
      TAGS.JAVASCRIPT,
      TAGS.REACT,
      TAGS.PERSONAL,
    ],
    iconPath: 'projects/portfolio/icon.svg',

    planetSize: 20,
    placeholderModelSize: 0.01,
    orbitRadius: 0.01,
  },

  {
    name: 'CCTV Setup',
    description: bulletPoints([
      `Responsible for setup of CCTV network cameras and servers, conferring familiarity with ${b('networks')}`,
      `Designed bespoke tools in ${b('Python')} to automate repetitive setup procedures, streamlining workload and eliminating human error, by combining ${b('openpyxl')} to load spreadsheet data and ${b('PyAutoGUI')} and ${b('Selenium')} to execute tasks`,
    ]) + date('2021-22'),

    images: [],
    tags: [
      TAGS.PYTHON,
      TAGS.SELENIUM,
    ],
    iconPath: 'projects/cctvsetup/icon.svg',
    modelPath: 'projects/cctvsetup/model.glb',

    planetSize: 5,
    orbitRadius: 80,
    orbitStartingAngle: 0,
    orbitSpeed: 7,
  },

  {
    name: 'Moon Rover',
    description: bulletPoints([
      '8-month challenge to create an autonomous and manually operable moon rover robot capable of transferring sediment',
      `Applied ${b('ROS 2')} with ${b('Python')}, ${b('Bash')}, and ${b('C++')} to develop a software solution, taking advantage of ROS 2’s microservice architecture to use Gazebo for simulation during robot construction`,
      'Focused on developer tools to accelerate development and reduce toil, IP network communication, and hardware integration; applied Git knowledge and demonstrated quick problem-solving to fix issues during the competition',
      'Won first place, strengthened communication skills, worked under pressure, broadened technical understanding',
    ]) + github('https://github.com/jsmith-exe/lunabotics') + date(2026),

    images: [
      { url: 'projects/rover/rover1.JPG', altText: 'The rover, focused on the drum bucket for excavation.' },
      { url: 'projects/rover/rover2.JPG', altText: 'The rover\'s frame, without the drum bucket.' },
      { url: 'projects/rover/rover3.JPG', altText: 'The front of the rover.' },
      { url: 'projects/rover/rover4.JPG', altText: 'A closeup of a wheel of the rover.' },
      { url: 'projects/rover/rover5.JPG', altText: 'The back of the rover.' },
      { url: 'projects/rover/rover_rviz.png', altText: 'A screenshot of the basestation - the cameras are showing a simulated environment.' },
    ],
    tags: [
      TAGS.PYTHON,
      TAGS.CPP,
    ],
    iconPath: 'projects/rover/icon.svg',
    modelPath: 'projects/rover/model.glb',

    planetSize: 5,
    orbitRadius: 140,
    orbitStartingAngle: 270,
    orbitSpeed: 2,
  },

  {
    name: 'MAC',
    description: heading('Marine Autonomy Challenge') + bulletPoints(['6-month challenge to create an autonomous software system controlling a small catamaran, in a team of five',
      `Used ${b('Python')} to send commands and receive sensor data and video across serial port, ${b('TCP')}, and ${b('UDP')} connections to achieve autonomous navigation, obstacle avoidance, berthing, and object recognition and position estimation`,
      `Constructed communication API for the team to use, a robust obstacle avoidance system, used ${b('YOLOv11')} to identify objects and calculate their positions from live video, and assisted with ${b('PyQt')} GUI and navigation system implementation`,
      'Won first place, experienced working with other disciplines, improved understanding of communication methods, solved challenging problems, and strengthened software architecture skills',
    ]) + date('2024-25'),

    images: [
      { url: 'projects/mac/c1.JPG', altText: 'Navigating waypoints.' },
      { url: 'projects/mac/c2.JPG', altText: 'Avoiding obstacles.' },
      { url: 'projects/mac/c4.JPG', altText: 'Mapping pollution.' },
      { url: 'projects/mac/c5.JPG', altText: 'Locating the position and type of objects.' },
      { url: 'projects/mac/boat.jpeg', altText: 'A (far away) picture of the boat.' },
    ],
    tags: [
      TAGS.PYTHON,
      TAGS.GUI,
      TAGS.TEAMWORK,
    ],
    iconPath: 'projects/mac/icon.svg',
    modelPath: 'projects/mac/model.glb',

    planetSize: 5,
    orbitRadius: 140,
    orbitStartingAngle: 150,
    orbitSpeed: 2,
  },

  {
    name: 'Ekhaya Go',
    description: bulletPoints([
      'Worked with six other students in coursework to design an end-to-end solution for a real-world problem situated in Makers Valley, Johannesburg, South Africa, followed by creating a gamification of our solution',
      `Provided guidance and criticism on solutions, diagrams, and software design; expanded on solution execution; collaborated to create ${b('user stories')}, with a custom ${b('sprint')} tracking spreadsheet system to evaluate progress; implemented ${b('Java')} classes, created ${b('Swing')} GUI dialogs, ${b('pair programmed')}; assisted with poster design and ${b('JUnit')} testing`,
      `Gained experience in communication, ${b('agile')} development, and designing software as a team; project graded ${b('89%')}`,
    ]) + date('2024-25'),

    images: [
      { url: 'projects/ekhayago/game1.png', altText: 'The game board and main interface.' },
      { url: 'projects/ekhayago/game2.png', altText: 'The game setup page, where the number of players and their names can be set.' },
      { url: 'projects/ekhayago/game3.png', altText: 'After landing on a task square; tasks must be completed in a sequence to win the game.' },
      { url: 'projects/ekhayago/sprintsheet1.png', altText: 'The spreadsheet used for sprint planning; this shows an overview of sprints and metrics surrounding them.' },
      { url: 'projects/ekhayago/sprintsheet2.png', altText: 'The spreadsheet used for sprint planning; this shows a sprint, and the stories that people are taking on.' },
    ],
    tags: [
      TAGS.JAVA,
      TAGS.GUI,
      TAGS.TEAMWORK,
      TAGS.COURSEWORK,
    ],
    iconPath: 'projects/ekhayago/icon.svg',
    modelPath: 'projects/ekhayago/EkhayaGo.glb',

    planetSize: 5,
    orbitRadius: 120,
    orbitStartingAngle: 300,
    orbitSpeed: 5,
  },

  {
    name: 'MIP',
    description: heading('Modpack Installer Python') + bulletPoints([
      'Completed over a few days to guide people through installing a Minecraft mod-pack, simplifying the process, due to manual installation being complex and existing solutions being bloated',
      `Implemented in ${b('Python')}, featuring a ${b('tkinter')} GUI, automated backups, and added thorough exception handling to provide clear feedback to users; deployed for MacOS and Windows via ${b('PyInstaller')}, hosted on MEGA`,
      'Updated based on feedback to support multi-drive computers; software performed as intended',
    ]) + github('https://github.com/calebhair/ModpackInstallerPy') + date(2024),

    images: [
      { url: 'projects/mip/img1.png', altText: 'The introduction window.' },
      { url: 'projects/mip/img2.png', altText: 'Detailed instructions, so the user knows exactly what to expect.' },
      { url: 'projects/mip/img3.png', altText: 'If a modpack was replaced, it would be backed up. This completion popup shows the user where they can remove them.' },
    ],
    tags: [
      TAGS.PYTHON,
      TAGS.GUI,
      TAGS.PERSONAL,
    ],
    iconPath: 'projects/mip/icon.svg',
    modelPath: 'projects/mip/model.glb',

    planetSize: 5,
    orbitRadius: 140,
    orbitStartingAngle: 30,
    orbitSpeed: 2,
  },

  {
    name: 'SSS',
    description: heading('Sensible Substitution System') + bulletPoints([
      'Designed an online grocery substitution system to automatically determine sensible substitutes to send customers',
      'Identified a problem, gathered requirements from stakeholders, designed, implemented, tested, and evaluated a solution for A-Level coursework',
      `Implemented in ${b('Python')}, the system compared similar products via price, serving size, and manually assigned attributes; tested via a ${b('SQLite')} database simulating a supermarket and ${b('PyQt5')} GUI`,
      `Surveyed 96 people with 90% of proposed substitutions acceptable, received an examined mark of 62/70 (89%)`,
    ]) + github('https://github.com/calebhair/sensubsys') + date('2022-23'),

    images: [
      { url: 'projects/sss/img1.png', altText: 'The tag modification window; tags help model key comparative characteristics of products.' },
      { url: 'projects/sss/img2.png', altText: 'The product creation window; a grocery store database was simulated and populated via this GUI' },
      { url: 'projects/sss/img3.png', altText: 'A list of products, for simulated testing.' },
    ],
    tags: [
      TAGS.PYTHON,
      TAGS.GUI,
      TAGS.SQL,
      TAGS.COURSEWORK,
    ],
    iconPath: 'projects/sss/icon.svg',
    modelPath: 'projects/sss/model.glb',

    planetSize: 5,
    orbitRadius: 160,
    orbitStartingAngle: 30,
  },

  {
    name: 'BroadbandBug',
    description: bulletPoints([
      'Designed a tool for detecting broadband problems by monitoring broadband upload and download speed',
      `Built in ${b('Python')}, timestamped broadband speed recordings were saved in a file and plotted on a ${b('matplotlib')} graph`,
      'Proved clients’ broadband unreliability, obliging the ISP to investigate disputes',
    ]) + github('https://github.com/calebhair/BroadbandBug') + date(2020),

    images: [
      { url: 'projects/broadbandbug/1.png', altText: 'Example output; this graph shows the download speed is consistently no more than 14, and drops out frequently. There is a serious problem with the X axis labelling!' },
      { url: 'projects/broadbandbug/2.png', altText: 'A very large collection of readings. The broadband continually drops out throughout the day.' },
    ],
    tags: [
      TAGS.PYTHON,
      TAGS.MATPLOTLIB,
      TAGS.PERSONAL,
    ],
    iconPath: 'projects/broadbandbug/icon.svg',
    modelPath: 'projects/broadbandbug/model.glb',

    planetSize: 5,
    orbitRadius: 160,
    orbitStartingAngle: 210,
  },

  {
    name: 'WebXR Tremor Sim',
    description: bulletPoints([
      `Developed a ${b('full-stack')} ${b('WebXR')} tool for simulating tremors so developers can experience websites as users with motor disabilities, using ${b('A-Frame, TypeScript, Playwright and Socket.IO')} to simulate a browser in a virtual environment`,
      `Independently evaluated ${b('XR SDKs and UX')} and proposed features beyond the initial brief (e.g. grip calibration); work led to co-authorship on a forthcoming paper`,
    ]) + github('https://github.com/calebhair/webxr-motor-disability-media') + date(2026),

    images: [
      { url: 'https://github.com/calebhair/webxr-motor-disability-media/blob/main/media/1_setup-ezgif.com-optimize.gif?raw=true', altText: 'Setup and height adjustment' },
      { url: 'https://github.com/calebhair/webxr-motor-disability-media/blob/main/media/2_phone-ezgif.com-optimize.gif?raw=true', altText: 'Virtual phone' },
      { url: 'https://github.com/calebhair/webxr-motor-disability-media/blob/main/media/3_tremor-ezgif.com-optimize.gif?raw=true', altText: 'Tremor' },
      { url: 'https://github.com/calebhair/webxr-motor-disability-media/blob/main/media/4_calibration-ezgif.com-optimize.gif?raw=true', altText: 'Calibration setup for palm grip' },
      { url: 'https://github.com/calebhair/webxr-motor-disability-media/blob/main/media/5_calibrated_use-ezgif.com-optimize.gif?raw=true', altText: 'Use of calibration with tremor' },
    ],
    tags: [
      TAGS.XR,
      TAGS.TYPESCRIPT,
    ],
    iconPath: 'projects/webxrtremorsim/icon.svg',
    modelPath: 'projects/webxrtremorsim/model.glb',

    planetSize: 5,
    orbitRadius: 185,
    orbitStartingAngle: 270,
  },

  {
    name: 'MacUp',
    description: bulletPoints([
      'Created backup software for copying files from one location to another, with a complex filtering system and GUI',
      `Developed multiple versions, first in ${b('Python')} with ${b('PyQt5')} and a custom file scanning system,
      again in ${b('Java')} with ${b('JavaFX')} and Apache Commons IO, and thirdly, another ${b('Python')} version with ${b('tkinter')} using a standard library function for copying (which was submitted as part of the CS50 online course on edX)`,
    ]) + github('https://github.com/calebhair/MacUp') + date('2022-23'),

    images: [],
    tags: [
      TAGS.PYTHON,
      TAGS.JAVA,
      TAGS.GUI,
      TAGS.PERSONAL,
    ],
    iconPath: 'projects/macup/icon.svg',
    modelPath: undefined, // TODO,

    planetSize: 5,
    orbitRadius: 250,
    orbitStartingAngle: 30,
    orbitSpeed: 10,
    planetRotationSpeed: new THREE.Euler(0.5, 0.5, 0),
    orbitOrientation: new THREE.Euler(10, 30, 0),
  },
];
