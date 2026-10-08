import Badge from "../ui/Badge";


function ProjectCard({ project, onClick }) {
  const statusVariants = {
    Active: "success",
    "In Progress": "warning",
    Completed: "info",
  };

  return (
   <div
  onClick={onClick}
  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700"
>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {project.name}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {project.description}
          </p>
        </div>

        <Badge variant={statusVariants[project.status]}>
          {project.status}
        </Badge>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm text-slate-500">Budget</span>

        <span className="font-semibold text-white">
          {project.budget}
        </span>
      </div>
    </div>
  );
}

export default ProjectCard;