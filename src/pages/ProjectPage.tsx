import { useState } from 'react';
import { ProjectDashboard } from "../components/ProjectDashboard";
import { projects } from "../data/projects";
import type { ProjectStatus } from '../models/project';

type StatusFilter = ProjectStatus | 'all';


export default function ProjectPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  console.log('Current status filter:', statusFilter);


  const visibleProjects =
    statusFilter === 'all'
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (  
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 ml-2">Project Dashboard</h1>
        <p className="text-gray-600 m-2 text-sm ">
          Manage your projects and track their progress.
        </p>
        <div className="mt-2 ml-2 space-x-2">
          <button onClick={() => setStatusFilter('all')} className="px-3 py-1 bg-gray-200 rounded">All</button>
          <button onClick={() => setStatusFilter('active')} className="px-3 py-1 bg-gray-200 rounded">Active</button>
          <button onClick={() => setStatusFilter('completed')} className="px-3 py-1 bg-gray-200 rounded">Completed</button>
        </div>
      </div>
      <ProjectDashboard projects={visibleProjects}/>
      <p className="mt-4 text-sm text-slate-600">
        Current filter: <span className="font-medium">{statusFilter}</span>
      </p>
    </div>
  );
}