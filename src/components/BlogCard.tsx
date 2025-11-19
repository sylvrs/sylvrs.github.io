import { createSignal, For } from "solid-js";
import type { BlogPost } from "../data/blog";

interface BlogCardProps {
  posts: BlogPost[];
}

export default function BlogCard(props: BlogCardProps) {
  const [hoveredId, setHoveredId] = createSignal<number | null>(null);
  const [selectedFilter, setSelectedFilter] = createSignal<string>("all");

  const categories = () => {
    const cats = new Set(props.posts.map(p => p.category).filter(Boolean));
    return ["all", ...Array.from(cats)] as string[];
  };

  const filteredPosts = () => {
    const filter = selectedFilter();
    if (filter === "all") return props.posts;
    return props.posts.filter(p => p.category === filter);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
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

      {/* Blog Posts Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={filteredPosts()}>
          {(post, index) => (
            <a 
              href={`/blog/${post.slug}`}
              class={`
                group relative bg-gradient-to-br from-base-200 to-base-300 border-2 
                transition-all duration-300 cursor-pointer rounded-xl overflow-hidden block card-hover-effect
                ${hoveredId() === post.id 
                  ? "border-accent shadow-lg shadow-accent/50 -translate-y-3" 
                  : "border-primary/30 shadow-md"
                }
              `}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                "animation": "slideUp 0.6s ease-out forwards",
                "animation-delay": `${index() * 0.1}s`,
                "opacity": "0"
              }}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div class="absolute top-4 right-4 z-20">
                  <span class="px-3 py-1 bg-gradient-to-r from-accent to-secondary text-base-300 text-xs font-bold rounded-full shadow-lg shadow-accent/50">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Category */}
              <div class="absolute top-4 left-4 z-20">
                <span class="px-3 py-1 bg-accent/10 border border-accent text-accent text-xs font-semibold rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Gradient Overlay on Hover */}
              <div 
                class={`
                  absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 
                  transition-opacity duration-300 pointer-events-none
                  ${hoveredId() === post.id ? "opacity-100" : "opacity-0"}
                `}
              />

              <div class="relative p-8 pt-16 z-10 flex flex-col h-full">
                {/* Date and Read Time */}
                <div class="flex items-center gap-3 mb-4 text-xs text-base-content/70">
                  <span class="flex items-center gap-1">
                    {formatDate(post.date)}
                  </span>
                  <span class="text-accent">•</span>
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                <h2 class="text-base-content text-2xl font-bold mb-4 flex items-start gap-2 group-hover:text-accent transition-colors leading-tight">
                  <span>{post.title}</span>
                </h2>
                
                <p class="text-base-content/80 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div class="flex flex-wrap gap-2 mb-6">
                  <For each={post.tags.slice(0, 4)}>
                    {(tag) => (
                      <span class="px-3 py-1 text-xs font-semibold bg-primary/10 border border-primary text-primary rounded-full hover:bg-primary hover:text-base-300 transition-all cursor-default">
                        {tag}
                      </span>
                    )}
                  </For>
                  {post.tags.length > 4 && (
                    <span class="px-3 py-1 text-xs font-semibold bg-secondary/10 border border-secondary text-secondary rounded-full">
                      +{post.tags.length - 4}
                    </span>
                  )}
                </div>                
              </div>

              {/* Bottom Accent Line */}
              <div 
                class={`
                  absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary
                  transition-all duration-300
                  ${hoveredId() === post.id ? "opacity-100" : "opacity-0"}
                `}
              />
            </a>
          )}
        </For>
      </div>

      {filteredPosts().length === 0 && (
        <div class="text-center py-20">
          <p class="text-accent text-2xl font-bold mb-4">No posts found in this category</p>
          <p class="text-base-content/70">Try selecting a different filter</p>
        </div>
      )}
    </div>
  );
}
