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

export const getSubmissionsByMilestone = async (milestoneId) => {
  const response = await fetch(
    `http://localhost:5000/milestones/${milestoneId}/submissions`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch submissions");
  }

  return response.json();
};

export const updateSubmissionStatus = async (
  milestoneId,
  submissionId,
  status
) => {
  const response = await fetch(
    `http://localhost:5000/milestones/${milestoneId}/submissions/${submissionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to update submission"
    );
  }

  return response.json();
};


export const createSubmission = async ({
  milestone,
  contributor,
  description,
  proofUrl,
}) => {
  const response = await fetch(
    `http://localhost:5000/milestones/${milestone}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        milestone,
        contributor,
        description,
        proofUrl,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to create submission"
    );
  }

  return response.json();
};



export const reserveEscrow = async ({
  project,
  milestone,
  client,
  contributor,
  amount,
}) => {
  const response = await fetch("http://localhost:5000/escrows/reserve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project,
      milestone,
      client,
      contributor,
      amount,
      token: "ETH",
      chain: "sepolia",
      contractAddress: "0x645aB33263798dd2a0B11d399ad6dc2228f2CfA8",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to reserve escrow");
  }

  return response.json();
};




export const createMilestone = async ({
  projectId,
  title,
  description,
  amount,
}) => {
  const response = await fetch(
    `http://localhost:5000/projects/${projectId}/milestones`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        amount,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to create milestone"
    );
  }

  return response.json();
};