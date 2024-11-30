import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Vikas VIKAS",
  initials: "Mr.",
  location: "Hanumangarh, Rajasthan, India",
  locationLink: "https://www.google.com/maps/place/Wrocław",
  about:
    "Full Stack Software Developer focused on building products with extra attention to detail",
  summary:
    "As a Full Stack Engineer, I have successfully taken multiple products from 0 to 1. I lead teams effectively, ensuring an environment where people can do their best work. Currently, I work mostly with TypeScript, React, Node.js, and GraphQL. I have over 8 years of experience in working remotely with companies all around the world.",
  avatarUrl: "https://avatars.githubusercontent.com/u/1017620?v=4",
  personalWebsiteUrl: "https://jarocki.me",
  contact: {
    email: "vikasarya1889@gmail.com",
    tel: "+919983340125",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/vikasutf8",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vikas-arya-3a9177229/",
        icon: LinkedInIcon,
      },
      // {
      //   name: "X",
      //   url: "https://x.com/BartoszJarocki",
      //   icon: XIcon,
      // },
    ],
  },
  education: [
    {
      school: "PDPM Indian Institute of Information Technology Design and Manufacturing, Jabalpur",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      start: "2021",
      end: "2025",
    },
  ],
  work: [
    {
      company: "OctaNet Services Pvt. Ltd",
      link: " ",
      badges: ["Remote"],
      title: "Full Stack Developer",
      logo: ParabolLogo,
      start: "July 2024",
      end: "Sep",
      description:
        " integrated private routing for two web routes using React.js, achieving a 10% improvement in search result speed. Additionally, I revamped two Mongoose data schemas to include new categories, resulting in a 4% reduction in load time. My work also involved developing user interfaces utilizing Redux Toolkit for streamlined state management.Technologies: MongoDB, Express.js, Node.js, React.js, Tailwind CSS, Multer",
    },
    {
      company: "Fusion ",
      link: " ",
      badges: ["IIITDM Jabalpur"],
      title: "Software Developer",
      logo: ClevertechLogo,
      start: "Decembar 2023",
      end: "May 2024",
      description:
        "Orchestrated a website redesign by collaborating closely with two designers, five developers, and testers, following the Software Development Life Cycle (SDLC) and employing two development models to deliver a visually appealing interface. Optimized API development and authentication, implementing efficient caching across five APIs, resulting in a fourfold improvement in response times and reduced latency. Additionally, created detailed documentation, including reports, README files, and comprehensive diagrams such as SRS and ER diagrams for 14 use cases using draw.io.Technologies: React.js, REST API, Django, PostgreSQL, Figma, Postman",
    },
    
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "C/C++",
    "Python",
    "JavaScript",
    "HTML5",
    "CSS3",
    "SQL",
    "React.js",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "Shadcn/UI",
    "Node.js",
    "Express.js",
    "Prisma ORM",
    "REST API",
    "WebSockets",
    "JWT",
    "OAuth2",
    "Web3Auth",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Cloudinary",
    "AWS",
    "Git",
    "GitHub",
    "VSCode",
    "Postman",
    "Figma",
  ],
  
  projects: [
    {
      title: "Consultly",
      techStack: [
        "Side Project",
        "TypeScript",
        "Next.js",
        "Vite",
        "GraphQL",
        "WebRTC",
      ],
      description: "A platform to build and grow your online business",
      logo: ConsultlyLogo,
      link: {
        label: "consultly.com",
        href: "https://consultly.com/",
      },
    },
    {
      title: "Monito",
      techStack: ["Side Project", "TypeScript", "Next.js", "Browser Extension"],
      description:
        "Browser extension that records everything happening in a web application",
      logo: MonitoLogo,
      link: {
        label: "monito.dev",
        href: "https://monito.dev/",
      },
    },
    {
      title: "Jarocki.me",
      techStack: ["Side Project", "Next.js", "MDX"],
      description:
        "My personal website and blog. Built with Next.js and Notion API",
      logo: JarockiMeLogo,
      link: {
        label: "github.com",
        href: "https://jarocki.me/",
      },
    },
    {
      title: "Minimal",
      techStack: ["Side Project", "Next.js", "Puppeteer"],
      description:
        "Minimalist calendars, habit trackers and planners generator",
      logo: Minimal,
      link: {
        label: "useminimal.com",
        href: "https://useminimal.com/",
      },
    },
    {
      title: "Barepapers",
      techStack: ["Side Project", "Next.js", "Puppeteer"],
      description:
        "Generates beautiful wallpapers using random shapes and gradients",
      logo: BarepapersLogo,
      link: {
        label: "barepapers.com",
        href: "https://barepapers.com/",
      },
    },
    {
      title: "Year progress",
      techStack: ["Side Project", "TypeScript", "Next.js"],
      description: "Tracks current year progress and displays a countdown",
      logo: YearProgressLogo,
      link: {
        label: "getyearprogress.com",
        href: "https://getyearprogress.com/",
      },
    },
    {
      title: "Parabol",
      techStack: [
        "Full Stack Developer",
        "TypeScript",
        "React",
        "Node.js",
        "GraphQL",
      ],
      description:
        "The Agile meeting co-pilot that delivers better meetings with less effort",
      logo: ParabolLogo,
      link: {
        label: "github.com",
        href: "https://parabol.co/",
      },
    },
    {
      title: "Evercast",
      techStack: [
        "Lead Frontend Developer",

        "TypeScript",
        "React",
        "Node.js",
        "GraphQL",
      ],
      description:
        "Creative collaboration platform that combines video conferencing and HD media streaming",
      logo: EvercastLogo,
      link: {
        label: "evercast.us",
        href: "https://www.evercast.us/",
      },
    },
    {
      title: "Mobile Vikings",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application for leading virtual mobile operator in Poland",
      logo: MobileVikingsLogo,
      link: {
        label: "mobilevikings.pl",
        href: "https://mobilevikings.pl/",
      },
    },
    {
      title: "Howdy",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Howdy is a place for you to join communities you care about",
      logo: Howdy,
      link: {
        label: "play.google.com",
        href: "https://howdy.co/",
      },
    },
    {
      title: "Tastycloud",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application for managing and displaying restaurant menus in kiosk mode",
      logo: TastyCloudLogo,
      link: {
        label: "tastycloud.fr",
        href: "https://www.tastycloud.fr/",
      },
    },
    {
      title: "Ambit",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application that helps with sharing your contact details",
      logo: AmbitLogo,
    },
    {
      title: "Bim",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application that helps with booking a table in a restaurants",
      logo: BimLogo,
    },
    {
      title: "Canal Digital GO",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Video streaming mobile application for Canal Digital subscribers",
      logo: CDGOLogo,
    },
  ],
} as const;
