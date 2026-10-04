import ProjectList from "../components/project/ProjectList";

function Projects() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "Active",
      budget: "$500",
      description: "Redesign the company marketing website.",
    },
    {
      id: 2,
      name: "DeFi Dashboard",
      status: "In Progress",
      budget: "$1,200",
      description: "Build analytics and portfolio tracking for DeFi users.",
    },
    {
      id: 3,
      name: "Mobile App",
      status: "Completed",
      budget: "$800",
      description: "Cross-platform mobile application for the client.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="mt-2 text-slate-400">
            Manage your projects, milestones, and contributors.
          </p>
        </div>

        <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
          + Create Project
        </button>
      </div>

      {/* Project count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {projects.length} projects
        </p>

        <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none">
          <option>All Projects</option>
          <option>Active</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Projects */}
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center">
          <h2 className="text-lg font-semibold text-white">
            No projects yet
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Create your first project to get started.
          </p>

          <button className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200">
            Create Project
          </button>
        </div>
      )}
    </div>
  );
}

export default Projects;