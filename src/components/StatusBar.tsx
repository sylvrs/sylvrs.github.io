import { createSignal, onMount } from "solid-js";

interface StatusBarProps {
  name: string;
  role: string;
  location: string;
  status: string;
  experience: string;
  email?: string;
}

export default function StatusBar(props: StatusBarProps) {
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    setTimeout(() => setIsVisible(true), 100);
  });

  return (
    <div 
      class={`
        w-full bg-terminal-bg/80 backdrop-blur-xl border border-terminal-border 
        rounded-2xl shadow-terminal-glow-lg overflow-hidden
        transition-all duration-700 ease-out
        ${isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {/* Main Status Bar */}
      <div class="px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Side - Identity */}
        <div class="flex flex-wrap items-center gap-4 lg:gap-6">
          {/* Name */}
          <div class="flex items-center gap-2 group">
            <span class="text-terminal-blue text-lg">👤</span>
            <div class="flex flex-col">
              <span class="text-terminal-fg font-bold text-lg">{props.name}</span>
            </div>
          </div>

          {/* Separator */}
          <div class="hidden lg:block w-px h-8 bg-terminal-border"></div>

          {/* Role */}
          <div class="flex items-center gap-2">
            <span class="text-terminal-cyan text-base">💼</span>
            <span class="text-terminal-fg-dark text-sm font-medium">{props.role}</span>
          </div>

          {/* Separator */}
          <div class="hidden lg:block w-px h-8 bg-terminal-border"></div>

          {/* Location */}
          <div class="flex items-center gap-2">
            <span class="text-terminal-magenta text-base">📍</span>
            <span class="text-terminal-fg-dark text-sm">{props.location}</span>
          </div>
        </div>

        {/* Right Side - Status & Actions */}
        <div class="flex flex-wrap items-center gap-4 lg:gap-6">
          {/* Experience */}
          <div class="flex items-center gap-2">
            <span class="text-terminal-yellow text-base">⚡</span>
            <span class="text-terminal-fg-dark text-sm font-medium">{props.experience} years</span>
          </div>

          {/* Separator */}
          <div class="hidden lg:block w-px h-8 bg-terminal-border"></div>

          {/* Status Badge */}
          <div class="flex items-center gap-2 px-4 py-2 bg-terminal-green/10 border border-terminal-green/30 rounded-lg">
            <span class="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
            <span class="text-terminal-green text-sm font-semibold">{props.status}</span>
          </div>

          {/* Contact CTA */}
          {props.email && (
            <>
              {/* Separator */}
              <div class="hidden lg:block w-px h-8 bg-terminal-border"></div>
              
              <a 
                href={`mailto:${props.email}`}
                class="flex items-center gap-2 px-4 py-2 bg-terminal-blue/10 border border-terminal-blue/50 
                       text-terminal-blue rounded-lg hover:bg-terminal-blue hover:text-terminal-bg 
                       transition-all hover:scale-105 hover:shadow-terminal-glow text-sm font-semibold"
              >
                <span>✉️</span>
                <span class="hidden sm:inline">Contact</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div class="h-1 bg-gradient-to-r from-terminal-blue via-terminal-cyan to-terminal-magenta"></div>
    </div>
  );
}
