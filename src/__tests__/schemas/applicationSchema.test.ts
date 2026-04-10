import { describe, it, expect } from "vitest";
import {
  applicationSchema,
  applicationFormSchema,
  applicationPayloadSchema,
  type Application,
} from "@/applicationSchema";

describe("applicationSchema", () => {
  it("should validate a correct application object", () => {
    const data = {
      company: "Tech Corp",
      job: "Senior Engineer",
      status: "Applied" as const,
      work_style: "Remote" as const,
      date_applied: new Date("2024-01-15"),
      application_url: "https://example.com/apply",
      date_response: null,
    };

    const result = applicationSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company).toBe("Tech Corp");
      expect(result.data.job).toBe("Senior Engineer");
      expect(result.data.status).toBe("Applied");
    }
  });

  it("should reject company name exceeding max length", () => {
    const data = {
      company: "A".repeat(101),
      job: "Engineer",
      status: "Applied" as const,
      work_style: "Remote" as const,
      date_applied: new Date("2024-01-15"),
    };

    const result = applicationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should set default status to Applied", () => {
    const data = {
      company: "Tech Corp",
      job: "Engineer",
      work_style: "Remote" as const,
      date_applied: new Date("2024-01-15"),
    };

    const result = applicationSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("Applied");
    }
  });

  it("should set default work_style to Remote", () => {
    const data = {
      company: "Tech Corp",
      job: "Engineer",
      status: "Applied" as const,
      date_applied: new Date("2024-01-15"),
    };

    const result = applicationSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.work_style).toBe("Remote");
    }
  });
});

describe("applicationFormSchema", () => {
  it("should validate a correct form submission", () => {
    const data = {
      company: "Tech Corp",
      job: "Senior Engineer",
      status: "Applied" as const,
      work_style: "Remote" as const,
      date_applied: new Date("2024-01-15"),
      date_response: null,
      application_url: null,
    };

    const result = applicationFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should require all enum values", () => {
    const data = {
      company: "Tech Corp",
      job: "Engineer",
      status: "InvalidStatus",
      work_style: "Remote" as const,
      date_applied: new Date("2024-01-15"),
    };

    const result = applicationFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe("applicationPayloadSchema", () => {
  it("should validate a correct payload with ISO date strings", () => {
    const data = {
      company: "Tech Corp",
      job: "Engineer",
      status: "Applied" as const,
      work_style: "Remote" as const,
      date_applied: "2024-01-15",
      date_response: null,
      application_url: "https://example.com",
    };

    const result = applicationPayloadSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should accept string dates instead of Date objects", () => {
    const data = {
      company: "Acme Inc",
      job: "Developer",
      status: "Offer" as const,
      work_style: "Hybrid" as const,
      date_applied: "2024-02-20",
      date_response: "2024-02-25",
      application_url: "https://acme.com/jobs",
    };

    const result = applicationPayloadSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
