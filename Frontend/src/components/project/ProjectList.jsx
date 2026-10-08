import ProjectCard from "./ProjectCard";

function ProjectList({ projects, onProjectClick }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}

export default ProjectList;