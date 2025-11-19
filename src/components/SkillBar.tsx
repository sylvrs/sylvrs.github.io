import { createSignal, onMount } from "solid-js";

interface SkillBarProps {
  skill: string;
  level: number;
}

export default function SkillBar(props: SkillBarProps) {
  const [width, setWidth] = createSignal(0);

  onMount(() => {
    setTimeout(() => setWidth(props.level), 200);
  });

  return (
    <div class="mb-4">
      <div class="flex justify-between mb-1">
        <span class="text-terminal-green">{props.skill}</span>
        <span class="text-terminal-amber">{props.level}%</span>
      </div>
      <div class="w-full bg-retro-dark border border-terminal-green h-4 relative overflow-hidden">
        <div 
          class="bg-terminal-green h-full transition-all duration-1000 ease-out"
          style={{ width: `${width()}%` }}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
