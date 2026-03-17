import type { Application } from "../../types/Application";
import type { Pipeline } from "../../types/Pipeline";

function calculatePercentageChange(curr: number, prev: number) {
  let calculation = 0;

  if (prev === 0) {
    calculation = Math.ceil((curr - prev) * 100);
  } else {
    calculation = Math.ceil(((curr - prev) / prev) * 100);
  }

  return calculation;
}

export function getCurrentMonth(data: Application[]) {
  const foundMonths = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  for (const d of data) {
    const dateSnapshot = new Date(d.date_applied);
    const monthSnapshot = dateSnapshot.getMonth();
    const yearSnapshot = dateSnapshot.getFullYear();

    if (monthSnapshot === currentMonth && yearSnapshot === currentYear) {
      foundMonths.push(d);
    }
  }

  return foundMonths;
}

export function getPreviousMonth(data: Application[]) {
  const foundMonths = [];
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = prev.getMonth();
  const prevYear = prev.getFullYear();

  for (const d of data) {
    const dateSnapshot = new Date(d.date_applied);
    const monthSnapshot = dateSnapshot.getMonth();
    const yearSnapshot = dateSnapshot.getFullYear();

    if (monthSnapshot === prevMonth && yearSnapshot === prevYear) {
      foundMonths.push(d);
    }
  }

  return foundMonths;
}

export const findApplicationsInMonth = (
  currentApps: Application[],
  prevApps: Application[],
) => {
  const numberOfApps = currentApps.length;
  const percentChange = calculatePercentageChange(
    currentApps.length,
    prevApps.length,
  );

  return {
    numberOfApps,
    percentChange,
  };
};

export const findInProgress = (
  currentApps: Application[],
  prevApps: Application[],
) => {
  let currentInProgress = 0;
  let prevInProgress = 0;
  const currentStatus = currentApps.map((d) => d.status);
  const prevStatus = prevApps.map((p) => p.status);

  for (const curr of currentStatus) {
    if (
      curr === "Recruiter Screen" ||
      curr === "Initial Interview" ||
      curr === "Technical Interview" ||
      curr === "Final Interview"
    ) {
      currentInProgress += 1;
    }
  }

  for (const prev of prevStatus) {
    if (
      prev === "Recruiter Screen" ||
      prev === "Initial Interview" ||
      prev === "Technical Interview" ||
      prev === "Final Interview"
    ) {
      prevInProgress += 1;
    }
  }

  const percentChange = calculatePercentageChange(
    currentInProgress,
    prevInProgress,
  );

  return {
    inProgress: currentInProgress,
    percentChange,
  };
};

export const findResponseRate = (
  currentApps: Application[],
  prevApps: Application[],
) => {
  let currentResponses = 0;
  let previousRespones = 0;

  currentApps.map((d) => {
    if (d.date_response) currentResponses += 1;
  });

  prevApps.map((d) => {
    if (d.date_response) previousRespones += 1;
  });

  const percentChange = calculatePercentageChange(
    currentResponses,
    previousRespones,
  );

  return {
    currentResponses: (currentResponses / currentApps.length) * 100,
    percentChange,
  };
};

export const pipelineValues = (data: Application[]) => {
  let total = 0;
  const statusObject: Pipeline[] = [
    {
      name: "Applied",
      value: 0,
      percentage: 0,
    },
    {
      name: "Recruiter Screen",
      value: 0,
      percentage: 0,
    },
    {
      name: "Technical Interview",
      value: 0,
      percentage: 0,
    },
    {
      name: "Final Interview",
      value: 0,
      percentage: 0,
    },
    {
      name: "Offer",
      value: 0,
      percentage: 0,
    },
    {
      name: "Rejected",
      value: 0,
      percentage: 0,
    },
    {
      name: "Withdrawn",
      value: 0,
      percentage: 0,
    },
  ];

  data.map((d) => {
    statusObject.map((s) => {
      if (d.status === s.name) {
        s.value += 1;
        total += 1;
      }
    });
  });

  statusObject.map((s) => {
    s.percentage = Math.ceil((s.value / total) * 100);
  });

  return statusObject;
};
