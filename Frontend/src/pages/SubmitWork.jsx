import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMilestonesByProject,
  createSubmission,
} from "../lib/api";

function SubmitWork() {
  const { projectId, milestoneId } = useParams();

  const [milestones, setMilestones] = useState([]);
  const [milestone, setMilestone] = useState("");
  const [description, setDescription] = useState("");
  const [proofUrl, setProofUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const loadMilestones = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMilestonesByProject(projectId);

        setMilestones(data);

        if (data.length === 0) {
          throw new Error("No milestones found.");
        }

        const selectedMilestone = data.find(
          (item) => item._id === milestoneId
        );

        if (!selectedMilestone) {
          throw new Error("Milestone not found.");
        }

        setMilestone(selectedMilestone._id);
      } catch (error) {
        console.error("Failed to load milestones:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMilestones();
  }, [projectId, milestoneId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!milestone) {
      setError("Please select a milestone.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe the work you completed.");
      return;
    }

    try {
      setSubmitting(true);

      // Temporary contributor ID for the MVP.
      // Later this will come from wallet authentication.
      const contributorId = "6ac7bbe19104c89ef7b5b875";

      await createSubmission({
        milestone,
        contributor: contributorId,
        description: description.trim(),
        proofUrl: proofUrl.trim(),
      });

      setDescription("");
      setProofUrl("");

      setSuccess("Work submitted successfully for review.");
    } catch (error) {
      console.error("Failed to submit work:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading milestones...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500">
          Contributor
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Submit Work
        </h1>

        <p className="mt-2 text-slate-400">
          Submit completed milestone work for client
          verification.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
      >
        {/* Milestone */}
        <div>
          <label className="text-sm font-medium text-slate-300">
            Milestone
          </label>

          <select
            value={milestone}
            disabled
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white opacity-80 outline-none"
          >
            {milestones
              .filter((item) => item._id === milestoneId)
              .map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title} — ${item.amount}
                </option>
              ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-slate-300">
            Work Description
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe what you completed..."
            rows={6}
            className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
          />
        </div>

        {/* Proof URL */}
        <div>
          <label className="text-sm font-medium text-slate-300">
            Proof URL
          </label>

          <input
            type="url"
            value={proofUrl}
            onChange={(event) =>
              setProofUrl(event.target.value)
            }
            placeholder="https://github.com/..."
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            GitHub PR, commit, deployment, or other proof
            of work.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="rounded-lg border border-green-900/50 bg-green-950/30 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || milestones.length === 0}
          className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Work"}
        </button>
      </form>
    </div>
  );
}

export default SubmitWork;