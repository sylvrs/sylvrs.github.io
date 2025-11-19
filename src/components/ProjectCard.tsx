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
                  ? "bg-gradient-to-r from-terminal-green to-terminal-cyan text-retro-darker shadow-neon-green scale-105"
                  : "bg-retro-dark border-2 border-terminal-green text-terminal-green hover:border-terminal-amber hover:text-terminal-amber hover:shadow-neon-green"
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
                group relative card bg-gradient-to-br from-retro-dark to-retro-accent border-2 
                transition-all duration-300 cursor-pointer rounded-xl overflow-hidden
                ${hoveredId() === project.id 
                  ? "border-terminal-amber shadow-neon-amber -translate-y-3 scale-105" 
                  : "border-terminal-green shadow-neon-green"
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
                  <span class="px-3 py-1 bg-gradient-to-r from-terminal-amber to-terminal-pink text-retro-darker text-xs font-bold rounded-full shadow-neon-amber">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Category and Year */}
              <div class="absolute top-4 left-4 z-20 flex items-center gap-2">
                {project.category && (
                  <span class="px-3 py-1 bg-terminal-cyan/10 border border-terminal-cyan text-terminal-cyan text-xs font-semibold rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span class="px-3 py-1 bg-terminal-green/10 border border-terminal-green text-terminal-green text-xs font-semibold rounded-full backdrop-blur-sm">
                    {project.year}
                  </span>
                )}
              </div>

              {/* Gradient Overlay on Hover */}
              <div 
                class={`
                  absolute inset-0 bg-gradient-to-br from-terminal-green/10 via-terminal-cyan/10 to-terminal-amber/10 
                  transition-opacity duration-300 pointer-events-none
                  ${hoveredId() === project.id ? "opacity-100" : "opacity-0"}
                `}
              />

              <div class="relative card-body p-8 pt-16 z-10">

                <h2 class="card-title text-terminal-green text-2xl font-bold flex items-start gap-2 group-hover:text-terminal-cyan transition-colors mb-4 leading-tight">
                  <span>{project.title}</span>
                </h2>
                
                <p class="text-terminal-green/80 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div class="flex flex-wrap gap-2 mb-6">
                  <For each={project.tags.slice(0, 4)}>
                    {(tag) => (
                      <span class="px-3 py-1 text-xs font-semibold bg-terminal-cyan/10 border border-terminal-cyan text-terminal-cyan rounded-full hover:bg-terminal-cyan hover:text-retro-darker transition-all cursor-default">
                        {tag}
                      </span>
                    )}
                  </For>
                  {project.tags.length > 4 && (
                    <span class="px-3 py-1 text-xs font-semibold bg-terminal-pink/10 border border-terminal-pink text-terminal-pink rounded-full">
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
                      class="flex-1 text-center px-4 py-3 text-sm font-bold border-2 border-terminal-green text-terminal-green rounded-lg hover:bg-terminal-green hover:text-retro-darker transition-all hover:scale-105 hover:shadow-neon-green"
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
                      class="flex-1 text-center px-4 py-3 text-sm font-bold bg-gradient-to-r from-terminal-amber to-terminal-cyan text-retro-darker rounded-lg hover:scale-105 transition-all hover:shadow-neon-amber"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span class="flex items-center justify-center gap-2">
                        <ExternalLink size={16} />
                        Live Demo
                      </span>
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <div class="flex-1 text-center px-4 py-3 text-sm font-semibold bg-retro-accent/50 text-terminal-green/50 rounded-lg cursor-not-allowed">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div 
                class={`
                  absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-terminal-green via-terminal-cyan to-terminal-amber
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
          <p class="text-terminal-amber text-2xl font-bold mb-4">No projects found in this category</p>
          <p class="text-terminal-green/70">Try selecting a different filter</p>
        </div>
      )}
    </div>
  );
}
