
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import { getProjectById } from "../lib/api";




function Workspace() {
  const milestones = [
    {
      id: 1,
      title: "Project Setup",
      status: "Completed",
      amount: "$200",
    },
    {
      id: 2,
      title: "Frontend Development",
      status: "In Progress",
      amount: "$500",
    },
    {
      id: 3,
      title: "Testing & Deployment",
      status: "Pending",
      amount: "$300",
    },
  ];
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);



  const statusVariants = {
    Completed: "success",
    "In Progress": "warning",
    Pending: "neutral",
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading workspace...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 text-center text-slate-400">
        Project not found.
      </div>
    );
  }


  return (


    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500">Workspace</p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {project?.name || "Project Workspace"}
            </h1>

            <p className="mt-2 text-slate-400">
              Project workspace and milestone management.
            </p>
          </div>

          <Badge variant="success">
            {project?.status || "Loading"}
          </Badge>
        </div>
      </div>

      {/* Project overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Project Budget</p>
          <p className="mt-2 text-2xl font-bold text-white">$1,000</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Escrow Funded</p>
          <p className="mt-2 text-2xl font-bold text-white">$700</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Milestones</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {milestones.length}
          </p>
        </div>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Milestones */}
        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Milestones
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Track project progress and payouts.
              </p>
            </div>

            <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-800">
              + Add Milestone
            </button>
          </div>

          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-medium text-white">
                    {milestone.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Milestone #{milestone.id}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={statusVariants[milestone.status]}>
                    {milestone.status}
                  </Badge>

                  <span className="font-semibold text-white">
                    {milestone.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project information */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-white">
            Project Information
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Owner
              </p>
              <p className="mt-1 text-sm text-white">
                0x71...8A42
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Contributor
              </p>
              <p className="mt-1 text-sm text-white">
                0x39...F21B
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Network
              </p>
              <p className="mt-1 text-sm text-white">
                Testnet
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Created
              </p>
              <p className="mt-1 text-sm text-white">
                October 4, 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-green-400" />

              <div>
                <p className="text-sm text-white">
                  Project Setup milestone was completed.
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-yellow-400" />

              <div>
                <p className="text-sm text-white">
                  Frontend Development is now in progress.
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  4 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;