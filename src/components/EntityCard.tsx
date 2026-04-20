import "./EntityCard.css";
import type { Entity, Project, TeamMember } from "../domain/entities";

type ProjectEntity = Extract<Entity, { kind: "project" }>;
type TaskEntity = Extract<Entity, { kind: "task" }>;
type MemberEntity = Extract<Entity, { kind: "member" }>;

export function ProjectCard({ entity }: { entity: ProjectEntity }) {
  const budgetPercentage = Math.min((entity.budgetUsd / 50000) * 100, 100);
  const statusColors: Record<Project["status"], string> = {
    planned: "from-slate-400 to-slate-600",
    active: "from-emerald-400 to-emerald-600",
    done: "from-blue-400 to-blue-600",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${statusColors[entity.status]} p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1`}>
      <div className="text-5xl mb-3">📁</div>
      <h3 className="text-2xl font-bold text-white mb-2">{entity.name}</h3>
      <div className="text-white/90 text-sm mb-4 capitalize font-semibold">{entity.status}</div>
      
      <div className="mt-4 bg-white/20 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-white">Budget</span>
          <span className="text-lg font-bold text-white">${entity.budgetUsd.toLocaleString()}</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden progress-container" data-width={`${budgetPercentage}%`}>
          <div 
            className="progress-bar bg-white h-full rounded-full transition-all"
          />
        </div>
      </div>
    </div>
  );
}

export function TaskCard({ entity }: { entity: TaskEntity }) {
  const statusColor = entity.completed
    ? "from-green-400 to-green-600" 
    : "from-orange-400 to-orange-600";

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${statusColor} p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1`}>
      <div className="text-5xl mb-3">{entity.completed ? "✅" : "📋"}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{entity.name}</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
          entity.completed 
            ? "bg-white/30" 
            : "bg-red-500/50"
        }`}>
          {entity.completed ? "Done" : "Pending"}
        </span>
      </div>

      <div className="space-y-3 text-white/95 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold">Project ID</span>
          <span className="font-mono bg-white/20 px-2 py-1 rounded">{entity.projectId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Due</span>
          <span className="font-mono">{entity.dueDateIso}</span>
        </div>
      </div>
    </div>
  );
}

export function MemberCard({ entity }: { entity: MemberEntity }) {
  const roleEmojis: Record<TeamMember["role"], string> = {
    dev: "👨‍💻",
    pm: "📊",
    designer: "🎨",
  };

  // Use a simpler approach for color based on role
  const roleColor = entity.role === "pm" 
    ? "from-purple-400 to-purple-600"
    : entity.role === "dev"
    ? "from-indigo-400 to-indigo-600"
    : "from-pink-400 to-pink-600";

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${roleColor} p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1`}>
      <div className="text-6xl mb-3">{roleEmojis[entity.role]}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{entity.name}</h3>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <span className="px-4 py-2 rounded-full bg-white/30 font-bold text-white text-sm capitalize">
            {entity.role}
          </span>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-xs text-white/75 font-semibold mb-1">Availability</div>
          <div className="text-white font-bold capitalize">{entity.availability}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/30">
        <div className="text-xs text-white/75">ID: {entity.id}</div>
      </div>
    </div>
  );
}

