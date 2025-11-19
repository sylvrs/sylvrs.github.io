import { createSignal, For } from "solid-js";
import { Github, ExternalLink } from "lucide-solid";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  year?: string;
  category?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  projects: Project[];
}

export default function ProjectCard(props: ProjectCardProps) {
  const [hoveredId, setHoveredId] = createSignal<number | null>(null);
  const [selectedFilter, setSelectedFilter] = createSignal<string>("all");

  const categories = () => {
    const cats = new Set(props.projects.map(p => p.category).filter(Boolean));
    return ["all", ...Array.from(cats)] as string[];
  };

  const filteredProjects = () => {
    const filter = selectedFilter();
    if (filter === "all") return props.projects;
    return props.projects.filter(p => p.category === filter);
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div class="flex flex-wrap gap-3 mb-12 justify-center">
        <For each={categories()}>
          {(category) => (
            <button
              onClick={() => setSelectedFilter(category)}
              class={`
                px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all
                ${selectedFilter() === category
                  ? "bg-primary text-base-300 scale-105"
                  : "bg-base-300 border-2 border-base-content/20 text-base-content hover:border-primary hover:text-primary"
                }
              `}
            >
              {category}
            </button>
          )}
        </For>
      </div>

      {/* Projects Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={filteredProjects()}>
          {(project, index) => (
            <div 
              class={`
                group relative card bg-gradient-to-br from-base-200 to-base-300 border-2 
                transition-all duration-300 cursor-pointer rounded-xl overflow-hidden card-hover-effect
                ${hoveredId() === project.id 
                  ? "border-accent shadow-lg shadow-accent/50 -translate-y-3" 
                  : "border-primary/30 shadow-md"
                }
              `}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                "animation": "slideUp 0.6s ease-out forwards",
                "animation-delay": `${index() * 0.1}s`,
                "opacity": "0"
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div class="absolute top-4 right-4 z-20">
                  <span class="px-3 py-1 bg-gradient-to-r from-accent to-secondary text-base-300 text-xs font-bold rounded-full shadow-lg shadow-accent/50">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Category and Year */}
              <div class="absolute top-4 left-4 z-20 flex items-center gap-2">
                {project.category && (
                  <span class="px-3 py-1 bg-accent/10 border border-accent text-accent text-xs font-semibold rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span class="px-3 py-1 bg-primary/10 border border-primary text-primary text-xs font-semibold rounded-full backdrop-blur-sm">
                    {project.year}
                  </span>
                )}
              </div>

              {/* Gradient Overlay on Hover */}
              <div 
                class={`
                  absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 
                  transition-opacity duration-300 pointer-events-none
                  ${hoveredId() === project.id ? "opacity-100" : "opacity-0"}
                `}
              />

              <div class="relative card-body p-8 pt-16 z-10">

                <h2 class="card-title text-base-content text-2xl font-bold flex items-start gap-2 group-hover:text-accent transition-colors mb-4 leading-tight">
                  <span>{project.title}</span>
                </h2>
                
                <p class="text-base-content/80 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div class="flex flex-wrap gap-2 mb-6">
                  <For each={project.tags.slice(0, 4)}>
                    {(tag) => (
                      <span class="px-3 py-1 text-xs font-semibold bg-primary/10 border border-primary text-primary rounded-full hover:bg-primary hover:text-base-300 transition-all cursor-default">
                        {tag}
                      </span>
                    )}
                  </For>
                  {project.tags.length > 4 && (
                    <span class="px-3 py-1 text-xs font-semibold bg-secondary/10 border border-secondary text-secondary rounded-full">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div class="flex gap-3 mt-auto">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex-1 text-center px-4 py-3 text-sm font-bold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-base-300 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span class="flex items-center justify-center gap-2">
                        <Github size={16} />
                        GitHub
                      </span>
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex-1 text-center px-4 py-3 text-sm font-bold bg-gradient-to-r from-accent to-secondary text-base-300 rounded-lg hover:scale-105 transition-all hover:shadow-lg hover:shadow-accent/50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span class="flex items-center justify-center gap-2">
                        <ExternalLink size={16} />
                        Live Demo
                      </span>
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <div class="flex-1 text-center px-4 py-3 text-sm font-semibold bg-base-300 text-base-content/50 rounded-lg cursor-not-allowed">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div 
                class={`
                  absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary
                  transition-all duration-300
                  ${hoveredId() === project.id ? "opacity-100" : "opacity-0"}
                `}
              />
            </div>
          )}
        </For>
      </div>

      {filteredProjects().length === 0 && (
        <div class="text-center py-20">
          <p class="text-accent text-2xl font-bold mb-4">No projects found in this category</p>
          <p class="text-base-content/70">Try selecting a different filter</p>
        </div>
      )}
    </div>
  );
}
