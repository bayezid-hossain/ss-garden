import { describe, it, expect } from "vitest";
import { projects } from "../src/data/projects";
import {
  filterProjects, paginate, parseStatus, parseType, countByStatus, PAGE_SIZE,
} from "../src/lib/projects-filter";

describe("filterProjects", () => {
  it("returns everything for all/all", () => {
    expect(filterProjects(projects, { status: "all", type: "all" })).toHaveLength(6);
  });
  it("filters by status", () => {
    const r = filterProjects(projects, { status: "ongoing", type: "all" });
    expect(r.map((p) => p.slug)).toEqual(["arboretum-residences", "kalpa-business-centre"]);
  });
  it("filters by type", () => {
    const r = filterProjects(projects, { status: "all", type: "duplex-villa" });
    expect(r).toHaveLength(2);
  });
  it("combines status and type", () => {
    const r = filterProjects(projects, { status: "completed", type: "commercial" });
    expect(r).toEqual([]);
  });
});

describe("paginate", () => {
  const nums = [1, 2, 3, 4, 5, 6, 7];
  it("returns the first page and reports more", () => {
    expect(paginate(nums, 1, 3)).toEqual({ items: [1, 2, 3], hasMore: true });
  });
  it("accumulates items across pages", () => {
    expect(paginate(nums, 2, 3)).toEqual({ items: [1, 2, 3, 4, 5, 6], hasMore: true });
  });
  it("reports no more on the last page", () => {
    expect(paginate(nums, 3, 3)).toEqual({ items: nums, hasMore: false });
  });
  it("uses a page size of 6", () => {
    expect(PAGE_SIZE).toBe(6);
  });
});

describe("parsers", () => {
  it("falls back to all for unknown values", () => {
    expect(parseStatus("bogus")).toBe("all");
    expect(parseStatus(null)).toBe("all");
    expect(parseType("bogus")).toBe("all");
  });
  it("accepts valid values", () => {
    expect(parseStatus("upcoming")).toBe("upcoming");
    expect(parseType("commercial")).toBe("commercial");
  });
});

describe("countByStatus", () => {
  it("counts projects per status", () => {
    expect(countByStatus(projects)).toEqual({ ongoing: 2, upcoming: 2, completed: 2 });
  });
});
