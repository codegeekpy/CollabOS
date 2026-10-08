export const updateEscrow = async (escrowId, data) => {
  const response = await fetch(
    `http://localhost:5000/escrows/${escrowId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update escrow");
  }

  return response.json();
};

export const getProjects = async () => {
  const response = await fetch("http://localhost:5000/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};


export const getProjectById = async (projectId) => {
  const response = await fetch(
    `http://localhost:5000/projects/${projectId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
};


export const getEscrows = async () => {
    const response = await fetch("http://localhost:5000/escrows");

    if (!response.ok) {
        throw new Error("Failed to fetch escrows");
    }

    return response.json();
};


export const getMilestonesByProject = async (projectId) => {
  const response = await fetch(
    `http://localhost:5000/projects/${projectId}/milestones`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch milestones");
  }

  return response.json();
};