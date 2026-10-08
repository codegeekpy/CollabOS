

import { useEffect, useState } from "react";
import ProjectList from "../components/project/ProjectList";
import { getProjects } from "../lib/api";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

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
      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400" >
          Loading projects...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-8 text-center text-red-400">
          {error}
        </div>
      ) : projects.length > 0 ? (
        < ProjectList projects={projects}   onProjectClick={(project) =>
navigate(`/workspace/${project._id}`)
          } />
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
      )
      }
    </div >
  );
}

export default Projects;