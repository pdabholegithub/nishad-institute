export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  technologies: string[];
  features: string[];
  price: string;
  popular?: boolean;
};

export const coursesData: Course[] = [
  {
    id: "qa-automation",
    title: "QA Automation Engineering",
    description: "Master automated testing from scratch using Java, Selenium, Playwright, and CI/CD tools to ensure software quality.",
    duration: "4 Months",
    level: "Beginner",
    technologies: ["Java", "Selenium", "Playwright", "TestNG", "Jenkins"],
    features: ["Real-world project testing", "Interview prep", "Resume building", "Live classes"],
    price: "₹15,000",
    popular: true,
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Web Development",
    description: "Build scalable web applications front-to-back using the modern MERN stack. Become a versatile developer.",
    duration: "6 Months",
    level: "Intermediate",
    technologies: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
    features: ["E-commerce build", "System design basics", "API architecture", "1-on-1 mentorship"],
    price: "₹25,000",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Mastery",
    description: "Automate infrastructure, learn CI/CD pipelines, and master AWS to bridge the gap between development and operations.",
    duration: "5 Months",
    level: "Advanced",
    technologies: ["AWS", "Docker", "Kubernetes", "Linux", "Terraform"],
    features: ["AWS Certification prep", "Microservices setup", "Cloud cost optimization"],
    price: "₹20,000",
  }
];
