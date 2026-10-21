import { describe, it, expect } from "vitest";
import { projects, getProject } from "../src/data/projects";
import { imageSlots } from "../src/data/image-plan";

const REQUIRED_SPEC_LABELS = ["Land area", "Storeys", "Units", "Flat sizes", "Facing", "Parking", "Handover"];

describe("project data", () => {
  it("has six projects with unique slugs", () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(6);
  });

  it("covers every status twice", () => {
    for (const status of ["ongoing", "upcoming", "completed"] as const) {
      expect(projects.filter((p) => p.status === status)).toHaveLength(2);
    }
  });

  it("includes all three types", () => {
    const types = new Set(projects.map((p) => p.type));
    expect(types).toEqual(new Set(["residential", "commercial", "duplex-villa"]));
  });

  it("gives every project all required spec labels", () => {
    for (const p of projects) {
      expect(p.specs.map((s) => s.label)).toEqual(REQUIRED_SPEC_LABELS);
    }
  });

  it("gives every project a story, concept, three gallery images and a floor plan", () => {
    for (const p of projects) {
      expect(p.story.length).toBeGreaterThan(0);
      expect(p.concept.length).toBeGreaterThan(0);
      expect(p.gallery).toHaveLength(3);
      expect(p.floorPlans).toHaveLength(1);
    }
  });

  it("only references images that exist in the image plan", () => {
    const planned = new Set(imageSlots.map((s) => s.src));
    for (const p of projects) {
      for (const img of [p.hero, ...p.gallery, ...p.floorPlans]) {
        expect(planned.has(img.src), img.src).toBe(true);
      }
    }
  });

  it("looks projects up by slug", () => {
    expect(getProject("arboretum-residences")?.name).toBe("Arboretum Residences");
    expect(getProject("nope")).toBeUndefined();
  });
});
