import { describe, it, expect } from "vitest";
import { calculateAllStats, getMonthlyApplications } from "@/worker/utils/stats";
import type { Application } from "@/applicationSchema";

describe("getMonthlyApplications", () => {
  it("should correctly separate current and previous month applications", () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const prevMonth = prevMonthDate.getMonth();
    const prevYear = prevMonthDate.getFullYear();

    const data: Application[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        company: "Current Month Corp",
        job: "Engineer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(currentYear, currentMonth, 15),
        date_response: null,
        application_url: null,
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174000",
        company: "Previous Month Corp",
        job: "Manager",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(prevYear, prevMonth, 20),
        date_response: null,
        application_url: null,
      },
      {
        id: "323e4567-e89b-12d3-a456-426614174000",
        company: "Old Corp",
        job: "Designer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(2020, 5, 10),
        date_response: null,
        application_url: null,
      },
    ];

    const { currentMonthApps, previousMonthApps } = getMonthlyApplications(data);

    expect(currentMonthApps).toHaveLength(1);
    expect(currentMonthApps[0].company).toBe("Current Month Corp");

    expect(previousMonthApps).toHaveLength(1);
    expect(previousMonthApps[0].company).toBe("Previous Month Corp");
  });

  it("should return empty arrays when no applications match", () => {
    const data: Application[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        company: "Old Corp",
        job: "Engineer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(2020, 0, 1),
        date_response: null,
        application_url: null,
      },
    ];

    const { currentMonthApps, previousMonthApps } = getMonthlyApplications(data);

    expect(currentMonthApps).toHaveLength(0);
    expect(previousMonthApps).toHaveLength(0);
  });
});

describe("calculateAllStats", () => {
  it("should calculate stats for empty data", () => {
    const data: Application[] = [];

    const stats = calculateAllStats(data);

    expect(stats.applications_in_month.numberOfApps).toBe(0);
    expect(stats.in_progress.inProgress).toBe(0);
    expect(stats.response_rate.currentResponses).toBe(0);
    expect(stats.pipeline).toHaveLength(8);
  });

  it("should count applications in each pipeline status", () => {
    const data: Application[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        company: "Applied Corp",
        job: "Engineer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(),
        date_response: null,
        application_url: null,
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174000",
        company: "Screen Corp",
        job: "Manager",
        status: "Recruiter Screen",
        work_style: "Remote",
        date_applied: new Date(),
        date_response: null,
        application_url: null,
      },
      {
        id: "323e4567-e89b-12d3-a456-426614174000",
        company: "Offer Corp",
        job: "Designer",
        status: "Offer",
        work_style: "Remote",
        date_applied: new Date(),
        date_response: new Date(),
        application_url: null,
      },
    ];

    const stats = calculateAllStats(data);

    const appliedPipeline = stats.pipeline.find((p) => p.name === "Applied");
    const screenPipeline = stats.pipeline.find(
      (p) => p.name === "Recruiter Screen"
    );
    const offerPipeline = stats.pipeline.find((p) => p.name === "Offer");

    expect(appliedPipeline?.value).toBe(1);
    expect(screenPipeline?.value).toBe(1);
    expect(offerPipeline?.value).toBe(1);
  });

  it("should calculate correct percentages for pipeline statuses", () => {
    const data: Application[] = Array(100)
      .fill(null)
      .map((_, i) => ({
        id: `123e4567-e89b-12d3-a456-426614174${String(i).padStart(3, "0")}`,
        company: `Company ${i}`,
        job: "Engineer",
        status: i < 50 ? "Applied" : "Rejected",
        work_style: "Remote" as const,
        date_applied: new Date(2020, 0, 1),
        date_response: null,
        application_url: null,
      }));

    const stats = calculateAllStats(data);

    const appliedPipeline = stats.pipeline.find((p) => p.name === "Applied");
    const rejectedPipeline = stats.pipeline.find((p) => p.name === "Rejected");

    expect(appliedPipeline?.percentage).toBe(50);
    expect(rejectedPipeline?.percentage).toBe(50);
  });

  it("should count in-progress applications correctly", () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const data: Application[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        company: "Applied",
        job: "Engineer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(currentYear, currentMonth, 15),
        date_response: null,
        application_url: null,
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174000",
        company: "Screen",
        job: "Engineer",
        status: "Recruiter Screen",
        work_style: "Remote",
        date_applied: new Date(currentYear, currentMonth, 15),
        date_response: null,
        application_url: null,
      },
      {
        id: "323e4567-e89b-12d3-a456-426614174000",
        company: "Interview",
        job: "Engineer",
        status: "Initial Interview",
        work_style: "Remote",
        date_applied: new Date(currentYear, currentMonth, 15),
        date_response: null,
        application_url: null,
      },
    ];

    const stats = calculateAllStats(data);

    expect(stats.in_progress.inProgress).toBe(2);
  });

  it("should calculate response rate correctly", () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const data: Application[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        company: "With Response",
        job: "Engineer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(currentYear, currentMonth, 15),
        date_response: new Date(currentYear, currentMonth, 20),
        application_url: null,
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174000",
        company: "No Response",
        job: "Engineer",
        status: "Applied",
        work_style: "Remote",
        date_applied: new Date(currentYear, currentMonth, 15),
        date_response: null,
        application_url: null,
      },
    ];

    const stats = calculateAllStats(data);

    expect(stats.response_rate.currentResponses).toBe(50);
  });
});
