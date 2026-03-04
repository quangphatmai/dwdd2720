import { ProjectDashboard } from "../components/ProjectDashboard";
import { projects } from "../data/projects";

export default function ProjectPage() {
  return <ProjectDashboard projects={projects} />;
}