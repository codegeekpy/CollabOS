import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import {
  getProjectById,
  getMilestonesByProject,
} from "../lib/api";

function Workspace() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        const [projectData, milestoneData] = await Promise.all([
          getProjectById(projectId),
          getMilestonesByProject(projectId),
        ]);

        setProject(projectData);
        setMilestones(milestoneData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspace();
  }, [projectId]);

  const statusVariants = {
    completed: "success",
    in_progress: "warning",
    pending: "neutral",
  };

  const formatStatus = (status) => {
    return status
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const shortenAddress = (address) => {
    if (!address) return "Not assigned";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
              {project.name}
            </h1>

            <p className="mt-2 text-slate-400">
              {project.description}
            </p>
          </div>

          <Badge variant={project.status === "active" ? "success" : "neutral"}>
            {formatStatus(project.status)}
          </Badge>
        </div>
      </div>

      {/* Project overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Project Budget
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            ${project.budget}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Escrow Funded
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            Coming soon
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Milestones
          </p>

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

          {milestones.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
              <p className="text-slate-400">
                No milestones found for this project.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone._id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-medium text-white">
                      {milestone.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {milestone.description}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Milestone #{milestone._id.slice(-6)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        statusVariants[milestone.status] || "neutral"
                      }
                    >
                      {formatStatus(milestone.status)}
                    </Badge>

                    <span className="font-semibold text-white">
                      ${milestone.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                {project.owner?.walletAddress
                  ? shortenAddress(project.owner.walletAddress)
                  : project.owner?.name || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Contributors
              </p>

              <p className="mt-1 text-sm text-white">
                {project.contributors?.length || 0}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Network
              </p>

              <p className="mt-1 text-sm text-white">
                Sepolia
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Created
              </p>

              <p className="mt-1 text-sm text-white">
                {new Date(project.createdAt).toLocaleDateString()}
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
          <p className="text-sm text-slate-400">
            Activity tracking will be connected to submissions and
            blockchain transactions next.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Workspace;