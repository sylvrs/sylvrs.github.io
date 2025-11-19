export interface Config {
  first_name: string;
  last_name: string;
  name: string;
  role: string;
  email: string;
  location: string;
  availability: string;
  
  bio: {
    greeting: string;
    loading: string[];
    status: string;
    specialties: string[];
  };
  
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  
  stats: {
    [key: string]: {
      value: string;
      description: string;
    }
  } 
  skills: string[];
}

const config: Config = {
  first_name: "Em",
  last_name: "Jordan",
  name: "Em Jordan",
  role: "Full-Stack Developer",
  email: "hire@emjordan.xyz",
  location: "Stillwater, OK, USA",
  
  bio: "Hello! I'm Em and I am a passionate developer who loves building systems and low-level software. I primarily work in Zig but feel free to check out the projects to see my full experience!",
  
  social: {
    github: "https://github.com/sylvrs",
    linkedin: "https://linkedin.com/in/em-jordan",
    twitter: "https://twitter.com",
    website: "https://emjordan.xyz",
  },
  
  stats: {
    experience: {
      value: "5+ Years",
      description: "of professional experience in software development",
    },
  },

  skills: [
    "JavaScript/TypeScript",
    "React/Solid/Vue",
    "Node.js/Bun/Deno",
    "Python/Go/Rust",
    "PostgreSQL/MongoDB",
    "Docker/Kubernetes",
    "AWS/Azure/GCP",
    "CI/CD/DevOps"
  ],
};

export default config;
