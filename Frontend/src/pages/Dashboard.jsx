import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Badge from "../components/ui/Badge";

import {
  getProjects,
  getEscrows,
  getMilestonesByProject,
} from "../lib/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [escrows, setEscrows] = useState([]);
  const [milestoneCount, setMilestoneCount] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [projectData, escrowData] = await Promise.all([
          getProjects(),
          getEscrows(),
        ]);

        setProjects(projectData);
        setEscrows(escrowData);

        const milestoneResults = await Promise.all(
          projectData.map((project) =>
            getMilestonesByProject(project._id)
          )
        );

        const allMilestones = milestoneResults.flat();

        setMilestoneCount(allMilestones.length);

        setPendingReviews(
          allMilestones.filter(
            (milestone) =>
              milestone.submissionStatus === "submitted"
          ).length
        );
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );

  const fundedEscrows = escrows.filter(
    (escrow) => escrow.status === "funded"
  );

  const releasedEscrows = escrows.filter(
    (escrow) => escrow.status === "released"
  );

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500">
          CollabOS Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor projects, milestones, escrow, and work
          verification from one place.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Projects
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {projects.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Total projects
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Active Projects
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {activeProjects.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Currently active
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Milestones
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {milestoneCount}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Across all projects
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Funded Escrows
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {fundedEscrows.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Currently locked
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Pending Review
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {pendingReviews}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Awaiting approval
          </p>
        </div>
      </div>

      {/* Action area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Workflow */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Project Workflow
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Move from project creation to on-chain payout.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
            <Link
              to="/projects"
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
            >
              <p className="text-sm font-medium text-white">
                01
              </p>

              <p className="mt-2 font-medium text-white">
                Projects
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Create and manage projects.
              </p>
            </Link>

            <Link
              to="/escrows"
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
            >
              <p className="text-sm font-medium text-white">
                02
              </p>

              <p className="mt-2 font-medium text-white">
                Escrow
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Fund milestone work.
              </p>
            </Link>

            <Link
              to="/verify-work"
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
            >
              <p className="text-sm font-medium text-white">
                03
              </p>

              <p className="mt-2 font-medium text-white">
                Verify
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Review submitted work.
              </p>
            </Link>

            <Link
              to="/blockchain"
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-600"
            >
              <p className="text-sm font-medium text-white">
                04
              </p>

              <p className="mt-2 font-medium text-white">
                Blockchain
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Inspect on-chain activity.
              </p>
            </Link>
          </div>
        </div>

        {/* Escrow summary */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-xl font-semibold text-white">
            Escrow Status
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Created
              </span>

              <span className="font-semibold text-white">
                {
                  escrows.filter(
                    (escrow) => escrow.status === "created"
                  ).length
                }
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Funded
              </span>

              <span className="font-semibold text-white">
                {fundedEscrows.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Released
              </span>

              <span className="font-semibold text-white">
                {releasedEscrows.length}
              </span>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <Link
                to="/escrows"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                View all escrows →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Recent Projects
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Your latest projects and their current state.
            </p>
          </div>

          <Link
            to="/projects"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            View all →
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <p className="text-slate-400">
              No projects created yet.
            </p>

            <Link
              to="/projects"
              className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Create Project
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project._id}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      {project.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  <Badge
                    variant={
                      project.status === "active"
                        ? "success"
                        : "neutral"
                    }
                  >
                    {formatStatus(project.status)}
                  </Badge>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">
                      Budget
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      ${project.budget}
                    </p>
                  </div>

                  <Link
                    to={`/projects/${project._id}/workspace`}
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-white transition hover:bg-slate-800"
                  >
                    Open Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Protocol status */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              CollabOS Protocol
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Sepolia testnet • Smart escrow enabled
            </p>
          </div>

          <Badge variant="success">
            Operational
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;