export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  year?: string;
  category?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Honey",
    description: "A small, embeddable programming language built in Zig",
    tags: ["Zig", "Programming Language"],
    github: "https://github.com/honey-lang/honey",
    demo: "https://honey-lang.github.io/playground",
    featured: true,
    year: "2024",
    category: "Languages & Tools",
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
export const getProjectsByYear = (year: string) => projects.filter(p => p.year === year);
